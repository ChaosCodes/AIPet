
import { useState, useMemo, useEffect } from 'react';
import { GameStats, TurnResult, LifeStage, GameCard, TurnPlan, StatType } from '../types';
import { INITIAL_STATS, MAX_TURNS, MAX_STRESS, MAX_STAT, INFANCY_CARD_POOL } from '../constants';
import { generateTurnNarrative, generateMockTurnNarrative } from '../services/geminiService';
import { getLifeStage } from '../utils/gameUtils';

export const useGameEngine = () => {
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [history, setHistory] = useState<TurnResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<TurnResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [useAI, setUseAI] = useState(true);

  // Card specific state
  const [hand, setHand] = useState<GameCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rerollsUsed, setRerollsUsed] = useState(0);

  const currentStage: LifeStage = getLifeStage(stats.TURN);
  const isGameOver = stats.STRS >= MAX_STRESS || stats.TURN > MAX_TURNS;

  // Draw initial hand on mount and after each turn
  const drawHand = () => {
    const pool = INFANCY_CARD_POOL; // MVP: Only use Infancy pool
    const newHand = Array.from({ length: 5 }, () => pool[Math.floor(Math.random() * pool.length)]);
    setHand(newHand);
    setSelectedIds([]);
    setRerollsUsed(0);
  };

  useEffect(() => {
    if (hand.length === 0) drawHand();
  }, []);

  const rerollHand = () => {
    if (stats.LUCK > 0) {
      setStats(prev => ({ ...prev, LUCK: prev.LUCK - 1 }));
      drawHand();
    }
  };

  const toggleCard = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  // Balatro Calculation Logic
  const calculation = useMemo(() => {
    const selectedCards = hand.filter((_, idx) => selectedIds.includes(idx.toString()));
    
    const results: Record<StatType, { base: number, mult: number }> = {
      STR: { base: 0, mult: 1 },
      INT: { base: 0, mult: 1 },
      CHR: { base: 0, mult: 1 },
      GOLD: { base: 0, mult: 1 },
      STRS: { base: 0, mult: 1 }
    };

    selectedCards.forEach(card => {
      const entry = results[card.type];
      entry.base += card.baseValue;
      entry.mult *= (card.multiplier || 1);
    });

    // Default turn costs
    results.GOLD.base -= 20;
    results.STRS.base += 5;

    const finalChanges: Partial<Record<StatType, number>> = {};
    Object.entries(results).forEach(([key, val]) => {
      finalChanges[key as StatType] = Math.floor(val.base * val.mult);
    });

    return finalChanges;
  }, [selectedIds, hand]);

  const executeTurn = async () => {
    if (isProcessing || isGameOver || selectedIds.length === 0) return;

    setIsProcessing(true);
    // Properly initialize TurnPlan with all required fields
    const plan: TurnPlan = { 
      riskAppetite: 'BALANCED', 
      selectedCardIds: selectedIds,
      infancySensations: [],
      schoolSubjects: []
    };

    try {
      let result: TurnResult;
      if (useAI) {
        result = await generateTurnNarrative(stats, plan, currentStage);
      } else {
        await new Promise(r => setTimeout(r, 600));
        result = generateMockTurnNarrative(stats, plan, currentStage);
      }
      
      // Override result changes with our Balatro calculation
      result.changes = calculation;
      
      setLastResult(result);
      applyChanges(calculation);
      setHistory(prev => [...prev, result]);
      setShowResult(true);
      drawHand(); // Refresh hand for next turn
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const applyChanges = (changes: Partial<GameStats>) => {
    setStats(prev => {
      const next = { ...prev };
      Object.entries(changes).forEach(([k, v]) => {
        const key = k as keyof Omit<GameStats, 'modifiers' | 'TURN' | 'activeTraits'>;
        if (typeof v === 'number') {
          const ceiling = key === 'STRS' ? MAX_STRESS : MAX_STAT;
          if (key === 'GOLD') next[key] = Math.max(0, next[key] + v);
          else if (key !== 'LUCK') next[key] = Math.max(0, Math.min(ceiling, next[key] + v));
        }
      });
      next.TURN += 1;
      return next;
    });
  };

  return {
    stats, history, isProcessing, isGameOver, showResult, lastResult,
    hand, selectedIds, calculation, useAI,
    setUseAI, toggleCard, rerollHand, executeTurn,
    closeResult: () => setShowResult(false),
    restart: () => { setStats(INITIAL_STATS); setHistory([]); setShowResult(false); drawHand(); }
  };
};

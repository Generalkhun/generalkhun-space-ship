// src/app/hooks/useGameStore.ts
import { create } from 'zustand'

type GAMES_STATE_TYPE = 'LOADING' | 'INTRO' | 'SHIPFRONT' | 'CORRIDOR' | 'SKILLS' | 'EXPERIENCE' | 'PORTFOLIO' | 'LOUNGE';
type GameState = {
  currentScene: GAMES_STATE_TYPE;
  setCurrentScene: (scene: GameState['currentScene']) => void
}

export const useGameStore = create<GameState>((set) => ({
  currentScene: 'LOADING',
  setCurrentScene: (scene) => set({ currentScene: scene }),
}))
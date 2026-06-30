// src/app/hooks/useGameStore.ts
import { create } from 'zustand'

type GameState = {
  currentScene: 'INTRO' | 'CORRIDOR' | 'SKILLS' | 'EXPERIENCE' | 'PORTFOLIO' | 'LOUNGE'
  setCurrentScene: (scene: GameState['currentScene']) => void
}

export const useGameStore = create<GameState>((set) => ({
  currentScene: 'INTRO', // เริ่มต้นที่ฉาก Intro หน้ายาน
  setCurrentScene: (scene) => set({ currentScene: scene }),
}))
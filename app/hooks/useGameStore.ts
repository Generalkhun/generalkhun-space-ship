// src/app/hooks/useGameStore.ts
import { create } from "zustand";

type GAMES_STATE_TYPE =
  | "LOADING"
  | "INTRO"
  | "SHIPFRONT"
  | "WALKING_TO_SHIP"
  | "INSHIP"; //'CORRIDOR' | 'SKILLS' | 'EXPERIENCE' | 'PORTFOLIO' | 'LOUNGE';
type GameState = {
  currentScene: GAMES_STATE_TYPE;
  isInfoOpen: boolean;
  setCurrentScene: (scene: GameState["currentScene"]) => void;
  setInfoOpen: (value: boolean) => void;
};

export const useGameStore = create<GameState>((set) => ({
  currentScene: "LOADING",
  isInfoOpen: false,
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setInfoOpen: (value) => set({ isInfoOpen: value }),
}));

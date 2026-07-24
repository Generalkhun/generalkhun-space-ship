// src/app/components/MainSceneClient.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "../core/Experience";
import { KeyboardControls } from "@react-three/drei";
import { useGameStore } from "@/app/hooks/useGameStore";
import LoadingPage from "@/app/dom/LoadingPage";
import TestGameState from "@/app/dom/TestStartUI";
import InfoModal from "@/app/dom/InfoModal";
const Controls = {
  forward: "forward",
  backward: "backward",
  leftward: "leftward",
  rightward: "rightward",
  jump: "jump",
};
export default function MainSceneClient() {
  const currentScene = useGameStore((state) => state.currentScene);
  const isInfoOpen = useGameStore((state) => state.isInfoOpen);
  const setInfoOpen = useGameStore((state) => state.setInfoOpen);

  return currentScene === "LOADING" ? (
    <LoadingPage />
  ) : (
    <>
      <KeyboardControls
        map={[
          { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
          { name: Controls.backward, keys: ["ArrowDown", "KeyS"] },
          { name: Controls.leftward, keys: ["ArrowLeft", "KeyA"] },
          { name: Controls.rightward, keys: ["ArrowRight", "KeyD"] },
          { name: Controls.jump, keys: ["Space"] },
        ]}
      >
        <TestGameState />
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [12, 12, 12],
          }}
        >
          <Experience />
        </Canvas>
      </KeyboardControls>

      {isInfoOpen && <InfoModal onClose={() => setInfoOpen(false)} />}
    </>
  );
}

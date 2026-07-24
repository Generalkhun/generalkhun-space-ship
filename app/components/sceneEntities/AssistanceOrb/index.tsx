import { useFrame } from "@react-three/fiber";
import { type RefObject, useRef } from "react";
import * as THREE from "three";

type AssistanceOrbProps = {
  playerRef?: RefObject<{
    translation: () => { x: number; y: number; z: number };
  } | null>;
  onInteract?: () => void;
};

export default function AssistanceOrb({
  playerRef,
  onInteract,
}: AssistanceOrbProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const idlePosition = useRef(new THREE.Vector3(-10.5, 1.7, -30));

  useFrame(() => {
    if (!groupRef.current || !playerRef?.current) return;

    const playerPosition = playerRef.current.translation();
    const hasEnteredShip = playerPosition.z <= -10;

    if (!hasEnteredShip) {
      groupRef.current.position.lerp(idlePosition.current, 0.08);
      groupRef.current.rotation.y += 0.02;
      return;
    }

    const targetPosition = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y + 1.2,
      playerPosition.z - 0.8,
    );

    groupRef.current.position.lerp(targetPosition, 0.08);
    groupRef.current.rotation.y += 0.04;
  });

  return (
    <group ref={groupRef} position={idlePosition.current}>
      <mesh
        castShadow
        onClick={(event) => {
          event.stopPropagation();
          onInteract?.();
        }}
      >
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial color="black" metalness={0.2} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.2} roughness={0.3} />
      </mesh>
    </group>
  );
}

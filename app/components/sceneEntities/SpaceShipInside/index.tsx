import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { RefObject, useRef } from "react";
import { type PlayerBodyHandle } from "../Player";

type SpaceShipInsideProps = {
  playerRef?: RefObject<PlayerBodyHandle | null>;
};

const elevatorStartPosition: [number, number, number] = [-14.8, 0.8, -39];
const elevatorTargetHeight = 5;

const SpaceShipInside = ({ playerRef }: SpaceShipInsideProps) => {
  const elevatorBodyRef = useRef<RapierRigidBody | null>(null);

  useFrame((_, delta) => {
    if (!playerRef?.current || !elevatorBodyRef.current) return;

    const elevatorPosition = elevatorBodyRef.current.translation();
    const playerPosition = playerRef.current.translation();
    const isPlayerOnElevator =
      playerPosition.x >= -16.8 &&
      playerPosition.x <= -12.8 &&
      playerPosition.z >= -41 &&
      playerPosition.z <= -37 &&
      Math.abs(playerPosition.y - (elevatorPosition.y + 0.45)) < 0.8;

    if (!isPlayerOnElevator) {
      // If Player y level is low, the elevator should start moving down.
      if (playerPosition.y < elevatorPosition.y) {
        // Start moving the elevator down
        const newY = Math.max(
          elevatorStartPosition[1],
          elevatorPosition.y - 2.2 * delta,
        );
        elevatorBodyRef.current.setNextKinematicTranslation({
          x: elevatorStartPosition[0],
          y: newY,
          z: elevatorStartPosition[2],
        });
      }
      return;
    }

    const movementDelta = Math.min(
      elevatorTargetHeight - elevatorPosition.y,
      2.2 * delta,
    );

    if (movementDelta <= 0) return;

    elevatorBodyRef.current.setNextKinematicTranslation({
      x: elevatorStartPosition[0],
      y: elevatorPosition.y + movementDelta,
      z: elevatorStartPosition[2],
    });

    playerRef.current.setNextKinematicTranslation({
      x: playerPosition.x,
      y: playerPosition.y + movementDelta,
      z: playerPosition.z,
    });
  });

  return (
    <group>
      {/* floor */}
      {/* Slope floor to create a ramp */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        position={[10, 0, -6]}
        rotation={[Math.PI / 12, 0, 0]}
      >
        <mesh>
          <boxGeometry args={[4, 0.4, 6]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      {/* Spaceship interior */}
      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, 0, -24]}>
        <mesh>
          <boxGeometry args={[30, 1.4, 30]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>

      {/* Ship Walls */}
      {/* room walls */}
      {/* Mechanical room - central path */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        position={[7, 3, -11]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <mesh>
          <boxGeometry args={[4, 5, 0.4]} />
          <meshStandardMaterial
            color="#242e5c"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        position={[7, 3, -21]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <mesh>
          <boxGeometry args={[6, 5, 0.4]} />
          <meshStandardMaterial
            color="#242e5c"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      {/* Mechanical room - Science room */}
      <RigidBody type="fixed" colliders="cuboid" position={[-4, 2.5, -24]}>
        <mesh>
          <boxGeometry args={[22, 5, 0.4]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      {/* front wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[-14.8, 2.5, -24]}>
        <mesh>
          <boxGeometry args={[0.4, 5, 30]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[14.8, 2.5, -24]}>
        <mesh>
          <boxGeometry args={[0.4, 5, 30]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>

      {/* bedroom wall */}
      <RigidBody type="fixed" colliders="cuboid" position={[-12.5, 2.5, -39]}>
        <mesh>
          <boxGeometry args={[5, 5, 0.4]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[5, 2.5, -39]}>
        <mesh>
          <boxGeometry args={[20, 5, 0.4]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>

      {/* Elevator on the corner on 1st floor (square area on the floor to let the player stand on) */}
      <RigidBody
        ref={elevatorBodyRef}
        type="kinematicPosition"
        colliders="cuboid"
        position={elevatorStartPosition}
      >
        <mesh>
          <boxGeometry args={[4, 0.01, 4]} />
          <meshStandardMaterial color="red" metalness={0.2} roughness={0.4} />
        </mesh>
      </RigidBody>
      {/* Second floor (cockpit area) */}
      <RigidBody type="fixed" colliders="cuboid" position={[-17.6, 4.4, -36]}>
        <mesh>
          <boxGeometry args={[5, 1.4, 5]} />
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[-25, 4.4, -30]}>
        <mesh>
          <boxGeometry args={[20, 1.4, 10]} />
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default SpaceShipInside;

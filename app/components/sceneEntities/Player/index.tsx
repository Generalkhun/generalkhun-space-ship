import { useRapier, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

export type PlayerBodyHandle = {
  setNextKinematicTranslation: (value: {
    x: number;
    y: number;
    z: number;
  }) => void;
  translation: () => { x: number; y: number; z: number };
};

type PlayerProps = {
  playerRef?: MutableRefObject<PlayerBodyHandle | null>;
};

const cameraOffsetValue = 10;

const ImpulseStrength = 0.2;
const TorqueStrength = 0.3;
export default function Player({ playerRef }: PlayerProps) {
  const body = useRef<RapierRigidBody | null>(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10),
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  // const jump = () =>
  // {
  //     const origin = body.current.translation()
  //     origin.y -= 0.31
  //     const direction = { x: 0, y: - 1, z: 0 }
  //     const ray = new rapier.Ray(origin, direction)
  //     const hit = world.castRay(ray, 10, true)

  //     if(hit.timeOfImpact < 0.15)
  //     {
  //         body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
  //     }
  // }

  // const reset = () =>
  // {
  //     body.current.setTranslation({ x: 0, y: 1, z: 0 })
  //     body.current.setLinvel({ x: 0, y: 0, z: 0 })
  //     body.current.setAngvel({ x: 0, y: 0, z: 0 })
  // }

  // useEffect(() =>
  // {
  //     const unsubscribeReset = useGame.subscribe(
  //         (state) => state.phase,
  //         (value) =>
  //         {
  //             if(value === 'ready')
  //                 reset()
  //         }
  //     )

  //     const unsubscribeJump = subscribeKeys(
  //         (state) => state.jump,
  //         (value) =>
  //         {
  //             if(value)
  //                 jump()
  //         }
  //     )

  //     const unsubscribeAny = subscribeKeys(
  //         () =>
  //         {
  //             start()
  //         }
  //     )

  //     return () =>
  //     {
  //         unsubscribeReset()
  //         unsubscribeJump()
  //         unsubscribeAny()
  //     }
  // }, [])

  useEffect(() => {
    if (!playerRef) return;

    const handle: PlayerBodyHandle = {
      setNextKinematicTranslation: (value) => {
        if (!body.current) return;

        body.current.setTranslation(
          { x: value.x, y: value.y, z: value.z },
          true,
        );
        body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      },
      translation: () => {
        if (!body.current) return { x: 0, y: 0, z: 0 };
        return body.current.translation();
      },
    };

    playerRef.current = handle;

    return () => {
      if (playerRef.current === handle) {
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  useFrame((state, delta) => {
    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (body.current) {
      body.current.applyImpulse(impulse, true);
      body.current.applyTorqueImpulse(torque, true);
      /**
       * Camera
       */
      const bodyPosition = body.current.translation();

      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(bodyPosition);
      const cameraOffset = new THREE.Vector3(
        cameraOffsetValue,
        cameraOffsetValue,
        cameraOffsetValue,
      );
      cameraPosition.add(cameraOffset);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(bodyPosition);
      cameraTarget.y += 0.25;

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);
    }

    /**
     * Phases
     */
    // if(bodyPosition.z < - (blocksCount * 4 + 2))
    //     end()

    // if(bodyPosition.y < - 4)
    //     restart()
  });

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}

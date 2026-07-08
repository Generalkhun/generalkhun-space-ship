// src/app/components/core/Experience.tsx
"use client"

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useGameStore } from '@/app/hooks/useGameStore'
import Lights from '../Lights'
import SpaceShipIntro from '../../sceneEntities/SpaceShipIntro'
import Rover from '../../sceneEntities/Rover'
import PlayerIntroScene from '../../sceneEntities/PlayerIntroScene'
import SpaceShipInside from '../../sceneEntities/SpaceShipInside'

type KinematicBodyHandle = {
  setNextKinematicTranslation: (value: { x: number; y: number; z: number }) => void
  translation: () => { x: number; y: number; z: number }
}

export default function Experience() {
  const currentScene = useGameStore((state) => state.currentScene)
  const { camera } = useThree()
  /**
   * Introduction scene sequences:
   * 1. the rover move from off screen to front of the spaceship
   * 2. player step out of the rover and stand aside the rover looking at the spaceship
   * 3. button appears to start the journey
   */
  const roverRef = useRef<KinematicBodyHandle | null>(null)
  const playerRef = useRef<KinematicBodyHandle | null>(null)
  const cameraTarget = useRef(new THREE.Vector3())
  const cameraOffset = useRef(new THREE.Vector3(2.2, 2.6, 5.2))

  useFrame((state) => {
    if (currentScene !== 'INTRO') return
    if (roverRef.current) {
      const time = state.clock.getElapsedTime()
      const newZ = 14 - time * 3
      if (newZ < 5) {
        useGameStore.getState().setCurrentScene('SHIPFRONT')
      }
      roverRef.current.setNextKinematicTranslation({ x: 0, y: 1, z: newZ })
    }
  })

  useFrame((state) => {
    if (currentScene !== 'WALKING_TO_SHIP') return
    if (playerRef.current) {
      const time = state.clock.getElapsedTime()
      const newZ = 6 - time * 1
      if (newZ < 1) {
        useGameStore.getState().setCurrentScene('INSHIP')
      }
      playerRef.current.setNextKinematicTranslation({ x: 0, y: 1, z: newZ })
    }
  })

  useFrame(() => {
    if (!playerRef.current || (currentScene !== 'WALKING_TO_SHIP' && currentScene !== 'INSHIP')) return

    const translation = playerRef.current.translation()
    const desiredPosition = new THREE.Vector3(
      translation.x + cameraOffset.current.x,
      translation.y + cameraOffset.current.y,
      translation.z + cameraOffset.current.z,
    )

    camera.position.lerp(desiredPosition, 0.08)
    cameraTarget.current.set(translation.x, translation.y + 1.2, translation.z + 1.4)
    camera.lookAt(cameraTarget.current)
  })

  useEffect(() => {
    if (currentScene !== 'INSHIP' || !playerRef.current) return
    playerRef.current.setNextKinematicTranslation({ x: 0, y: 1, z: 1 })
  }, [currentScene])

  const onClickStartJourney = () => {
    useGameStore.getState().setCurrentScene('WALKING_TO_SHIP')
  }

  return (
    <>
      <Physics debug>
        <Lights />

        {currentScene === 'INSHIP' ? <SpaceShipInside /> : <SpaceShipIntro />}

        <RigidBody type="fixed" colliders="cuboid" position={[0, -0.76, 5]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#222233" />
          </mesh>
        </RigidBody>
        <PlayerIntroScene playerRef={playerRef} />
        <Rover roverRef={roverRef} />
        <Html position={[0, 6, 0]} center>
          {currentScene === 'SHIPFRONT' && (
            <div className="bg-white p-4 rounded-lg text-black text-center">
              <h1 className="text-2xl font-bold mb-2">Welcome to the Spaceship</h1>
              <p className="mb-4">Press the button below to start your journey.</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClickStartJourney}
              >
                Start Journey
              </button>
            </div>
          )}
        </Html>
        <OrbitControls enableZoom={true} />
      </Physics>
    </>
  )
}
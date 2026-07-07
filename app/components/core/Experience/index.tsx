// src/app/components/core/Experience.tsx
"use client"

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useGameStore } from '@/app/hooks/useGameStore'
import Lights from '../Lights'
import SpaceShipIntro from '../../sceneEntities/SpaceShipIntro'
import Player from '../../sceneEntities/Player'
import { Physics, RigidBody } from '@react-three/rapier'
import Rover from '../../sceneEntities/Rover'
import { Html, OrbitControls } from '@react-three/drei'
import PlayerIntroScene from '../../sceneEntities/PlayerIntroScene'

export default function Experience() {
  const currentScene = useGameStore((state) => state.currentScene)
  const { camera } = useThree()
   /**
    * Introduction scene sequences:
    * 1. the rover move from off screen to front of the spaceship
    * 2. player step out of the rover and stand aside the  rover looking at the spaceship
    * 3. button appears to start the journey
    *  */ 
  const roverRef = useRef<any>(null)
  const playerRef = useRef<any>(null)
  useFrame((state, _) => {
    if(currentScene !== 'INTRO') return
    if(roverRef.current) {
      const time = state.clock.getElapsedTime()
      const newZ = 14 - time * 3
      if(newZ < 5) {
        useGameStore.getState().setCurrentScene('SHIPFRONT')
      }
      roverRef.current.setNextKinematicTranslation({ x: 0, y: 1, z: newZ })
    }
  })
  // 4. when the button is clicked, the player walks to the spaceship and enters it
  useFrame((state, delta) => {
    if(currentScene !== 'WALKING_TO_SHIP') return
    if(playerRef.current) {
      const time = state.clock.getElapsedTime()
      const newZ = 6 - time * 1
      if(newZ < 1) {
        useGameStore.getState().setCurrentScene('INSHIP')
      }

      console.log("🚀 ~ Experience ~ newZ:", newZ)
      playerRef.current.setNextKinematicTranslation({ x: 0, y: 1, z: newZ })
      // check if the player has reached the target position
      // if(newPosition < 0.1) {
      //   useGameStore.getState().setCurrentScene('INSHIP')
      // }
    }
  })

  const onClickStartJourney = () => {
    useGameStore.getState().setCurrentScene('WALKING_TO_SHIP')
  }
  return (
    <>
      <Physics debug>
        <Lights />

        {/* ตัวแทนของยานอวกาศ (เดี๋ยวค่อยเอาโมเดลจริงมาใส่แทน) */}
        <SpaceShipIntro />

        {/* แผ่นพื้นสมมติหน้ายาน (จุดที่จะจอด Rover) */}
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
        {currentScene === 'INSHIP' && <OrbitControls enableZoom={true} />}
      </Physics>
    </>
  )
}
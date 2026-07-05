// src/app/components/core/Experience.tsx
"use client"

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
// import { OrbitControls, Stars } from '@react-three/drei'
import gsap from 'gsap'
import { useGameStore } from '@/app/hooks/useGameStore'
import * as THREE from 'three'
import Lights from '../Lights'
import SpaceShipIntro from '../../sceneEntities/SpaceShipIntro'
import Player from '../../sceneEntities/Player'
import { Physics, RigidBody } from '@react-three/rapier'

export default function Experience() {
  const currentScene = useGameStore((state) => state.currentScene)
  const { camera } = useThree()

  useEffect(() => {
    if (currentScene === 'CORRIDOR') {
      // 🎬 จังหวะที่กด START JOURNEY: ใช้ GSAP สั่งให้กล้องพุ่งเข้าไปใกล้ตัวยาน
      gsap.to(camera.position, {
        x: 0,
        y: 2,
        z: 5,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => camera.lookAt(0, 0, 0) // ให้กล้องโฟกัสที่จุดศูนย์กลางยานตลอดเวลา
      })
    }
  }, [currentScene, camera])

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
        <Player />

        {/* ปล่อยให้หมุนดูเล่นๆ ได้ก่อนช่วง INTRO แต่พอเข้า CORRIDOR จะโดนคุมด้วย GSAP */}
        {/* {currentScene !== 'INTRO' && <OrbitControls enableZoom={false} />} */}
      </Physics>
    </>
  )
}
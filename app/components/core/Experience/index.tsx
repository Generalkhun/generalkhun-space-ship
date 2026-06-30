// src/app/components/core/Experience.tsx
"use client"

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import gsap from 'gsap'
import { useGameStore } from '@/app/hooks/useGameStore'
import * as THREE from 'three'

export default function Experience() {
  const currentScene = useGameStore((state) => state.currentScene)
  const { camera } = useThree()
  
  // สร้างกล่องสี่เหลี่ยมเทาๆ ไว้เป็นตัวแทนของยานอวกาศ (Greybox)
  const spaceshipRef = useRef<THREE.Mesh>(null)

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
      {/* แสงสว่างในฉาก */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />

      {/* บรรยากาศดวงดาวรอบๆ ในอวกาศ */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* ตัวแทนของยานอวกาศ (เดี๋ยวค่อยเอาโมเดลจริงมาใส่แทน) */}
      <mesh ref={spaceshipRef} position={[0, 0, 0]}>
        <boxGeometry args={[3, 1.5, 6]} />
        <meshStandardMaterial color="#9292a6" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* แผ่นพื้นสมมติหน้ายาน (จุดที่จะจอด Rover) */}
      <mesh position={[0, -0.76, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#222233" />
      </mesh>

      {/* ปล่อยให้หมุนดูเล่นๆ ได้ก่อนช่วง INTRO แต่พอเข้า CORRIDOR จะโดนคุมด้วย GSAP */}
      {currentScene === 'INTRO' && <OrbitControls enableZoom={false} />}
    </>
  )
}
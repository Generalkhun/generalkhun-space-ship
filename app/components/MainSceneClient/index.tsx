// src/app/components/MainSceneClient.tsx
"use client"

import { Canvas } from '@react-three/fiber'
import Experience from '../core/Experience'

export default function MainSceneClient() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#050510' }}>
      
      {/* 1. โลก 3D */}
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [12, 12, 12] // มุมกล้องมองเฉียงแบบ Trimetric ตอนเริ่ม
        }}
      >
        <Experience />
      </Canvas>
      {/* 2. เมนู 2D ลอยทับข้างบน */}
      {/* <MainMenu /> */}

    </div>
  )
}
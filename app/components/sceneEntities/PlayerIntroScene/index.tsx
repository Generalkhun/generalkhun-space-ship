import { type RefObject } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '@/app/hooks/useGameStore'

type KinematicBodyHandle = {
    setNextKinematicTranslation: (value: { x: number; y: number; z: number }) => void
    translation: () => { x: number; y: number; z: number }
}

const PlayerIntroScene = ({ playerRef }: { playerRef: RefObject<KinematicBodyHandle | null> }) => {
    const currentScene = useGameStore((state) => state.currentScene)
    const [, getKeys] = useKeyboardControls()

    useFrame((_, delta) => {
        if (!playerRef.current || currentScene !== 'INSHIP') return

        const keys = getKeys()
        const position = playerRef.current.translation()
        let moveX = 0
        let moveZ = 0

        if (keys.forward) moveZ -= 1
        if (keys.back) moveZ += 1
        if (keys.left) moveX -= 1
        if (keys.right) moveX += 1

        if (moveX !== 0 || moveZ !== 0) {
            const length = Math.hypot(moveX, moveZ) || 1
            moveX = (moveX / length) * delta * 2.4
            moveZ = (moveZ / length) * delta * 2.4

            const nextX = Math.max(-5.8, Math.min(5.8, position.x + moveX))
            const nextZ = Math.max(-7.2, Math.min(7.2, position.z + moveZ))

            playerRef.current.setNextKinematicTranslation({ x: nextX, y: 1, z: nextZ })
        }
    })

    return (
        <RigidBody
            type="kinematicPosition"
            linearDamping={0.5}
            angularDamping={0.5}
            ref={playerRef}
            canSleep={false}
            colliders="ball"
            restitution={0.2}
            friction={1}
            position={[0, 1, 5]}
        >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial flatShading color="mediumpurple" />
            </mesh>
        </RigidBody>
    )
}

export default PlayerIntroScene
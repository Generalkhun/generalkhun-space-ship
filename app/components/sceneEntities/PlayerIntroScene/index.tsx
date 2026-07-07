import { RigidBody, useRapier } from "@react-three/rapier"
import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from "react"
// import * as THREE from "three"
const ImpulseStrength = 0.2
const TorqueStrength = 0.3
const PlayerIntroScene = ({ playerRef }: { playerRef: React.RefObject<any> }) => {
    
    return <RigidBody type="kinematicPosition" linearDamping={ 0.5 } angularDamping={ 0.5 } ref={playerRef} canSleep={ false } colliders="ball" restitution={ 0.2 } friction={ 1 } position={ [ 0, 1, 5 ] }>
        <mesh castShadow>
            <icosahedronGeometry args={[0.3,1]}/>
            <meshStandardMaterial flatShading color={'mediumpurple'} />
        </mesh>
    </RigidBody>
}
export default PlayerIntroScene
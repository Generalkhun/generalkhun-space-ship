import { type RefObject } from 'react'
import { RigidBody } from "@react-three/rapier"

type KinematicBodyHandle = {
    setNextKinematicTranslation: (value: { x: number; y: number; z: number }) => void
    translation: () => { x: number; y: number; z: number }
}

const Rover = ({ roverRef }: { roverRef: RefObject<KinematicBodyHandle | null> }) => {
    return <RigidBody colliders="cuboid" ref={roverRef as any} canSleep={ false } restitution={ 0.2 } friction={ 1 } type="kinematicPosition" position={ [ 0, 2, 14 ] }>
        <mesh castShadow>
                <meshStandardMaterial flatShading color={'red'} />
                <boxGeometry args={[2,2,2]}/>
        </mesh>
    </RigidBody>
}
export default Rover
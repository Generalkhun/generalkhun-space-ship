import { RigidBody } from "@react-three/rapier"
const Rover = ({ roverRef }: { roverRef: React.RefObject<any> }) => {
    return <RigidBody colliders="cuboid" ref={roverRef} canSleep={ false } restitution={ 0.2 } friction={ 1 } type="kinematicPosition" position={ [ 0, 2, 14 ] }>
        <mesh castShadow>
                <meshStandardMaterial flatShading color={'red'} />
                <boxGeometry args={[2,2,2]}/>
        </mesh>
    </RigidBody>
}
export default Rover
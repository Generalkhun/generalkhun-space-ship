import { RigidBody } from "@react-three/rapier"
import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from '@react-three/fiber'
import { useRef, type RefObject } from "react"

type KinematicBodyHandle = {
    setNextKinematicTranslation: (value: { x: number; y: number; z: number }) => void
    translation: () => { x: number; y: number; z: number }
}

const ImpulseStrength = 0.2
const TorqueStrength = 0.3
const Player = ({ playerRef }: { playerRef: RefObject<KinematicBodyHandle | null> }) => {
    const body = useRef<KinematicBodyHandle | null>(null)
    const { forward, back, left, right } = useKeyboardControls((state) => ({
        forward: state.forward,
        back: state.back,
        left: state.left,
        right: state.right,
    }))
    // const { rapier, world } = useRapier()
    // const [ smoothedCameraPosition, setSmoothedCameraPosition ] = useState(new THREE.Vector3(140,10,2))
    // const [ smoothedCameraTarget, setSmoothedCameraTarget ] = useState(new THREE.Vector3())
    // const rapierWorld = world
    // const jump = useCallback(() => {
    //     if(!body.current) return;
    //     const origin = body.current.translation()
    //     origin.y -= 0.31
    //     const direction = {
    //         x: 0,
    //         y: -1,
    //         z: 0,
    //     }
    //     const ray = new rapier.Ray(origin, direction)
    //     const hit = rapierWorld.castRay(ray, 10, true)
    //     hit&& hit.timeOfImpact === 0 && body.current.applyImpulse({
    //         x: 0.0,
    //         y: 0.5,
    //         z: 0.0,
    //     })
    // },[])

    // useEffect(() => {
    //     const unSubKeys = subKeys((state) => state.jump, (value) => {
    //         if(value) {
    //             jump()
    //         }
    //     })
    //     return () => unSubKeys()
    // },[])
    useFrame((state, delta) => {

        /**Ball */
        const impulse = {
            x: 0.0,
            y: 0.0,
            z: 0.0,
        }
        const torque = {
            x: 0.0,
            y: 0.0,
            z: 0.0,
        }
        if(forward) {
            impulse.x -= delta * ImpulseStrength
            torque.z += delta * TorqueStrength
        }
        if(back) {
            impulse.x += delta * ImpulseStrength
            torque.z -= delta * TorqueStrength
        }
        if(left) {
            impulse.z += delta * ImpulseStrength
            torque.x += delta * TorqueStrength
        }
        if(right) {
            impulse.z -= delta * ImpulseStrength
            torque.x -= delta * TorqueStrength
        }
        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        /**Camera */

        //position
        // const bodyPosition = body.current.translation()
        // const cameraPosition = new THREE.Vector3()
        // cameraPosition.copy(bodyPosition)
        // cameraPosition.x -= 2.25
        // cameraPosition.y += 0.65

        // setSmoothedCameraPosition(p => p.lerp(cameraPosition, 3 * delta))

        //target
        // const cameraTarget = new THREE.Vector3()
        // cameraTarget.copy(bodyPosition)
        // cameraTarget.y += 0.
        // setSmoothedCameraTarget(p => p.lerp(cameraTarget, 3 * delta))

        //adjust camera
        // state.camera.position.copy(smoothedCameraPosition)
        // state.camera.lookAt(smoothedCameraTarget)
    })
    return <RigidBody type="kinematicPosition" linearDamping={ 0.5 } angularDamping={ 0.5 } ref={body} canSleep={ false } colliders="ball" restitution={ 0.2 } friction={ 1 } position={ [ 0, 1, 5 ] }>
        <mesh castShadow>
            <icosahedronGeometry args={[0.3,1]}/>
            <meshStandardMaterial flatShading color={'mediumpurple'} />
        </mesh>
    </RigidBody>
}
export default Player
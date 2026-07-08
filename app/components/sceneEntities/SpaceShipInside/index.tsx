import { RigidBody } from '@react-three/rapier'


const SpaceShipInside = () => {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid" position={[0, 0, -10]}>
        <mesh>
          <boxGeometry args={[14, 4.4, 20]} />
          <meshStandardMaterial color="#1f2c45" transparent opacity={0.35} />
        </mesh>
      </RigidBody>

      <mesh position={[0, 0, -10]}>
        <boxGeometry args={[14, 0.4, 20]} />
        <meshStandardMaterial color="#334b73" metalness={0.2} roughness={0.4} />
      </mesh>

      <mesh position={[-4.2, 1.4, -2.5-10]} castShadow>
        <boxGeometry args={[3.2, 2.8, 5.5]} />
        <meshStandardMaterial color="#5b8fdc" />
      </mesh>

      <mesh position={[-4.2, 1.4, 4.5-10]} castShadow>
        <boxGeometry args={[3.2, 2.8, 5.5]} />
        <meshStandardMaterial color="#4a7bc0" />
      </mesh>

      <mesh position={[2.8, 1.4, 1.2-10]} castShadow>
        <boxGeometry args={[5.5, 2.8, 9.5]} />
        <meshStandardMaterial color="#020b19" />
      </mesh>

      <mesh position={[0, 2.2, 9.2-10]} castShadow>
        <boxGeometry args={[3, 2.6, 1.4]} />
        <meshStandardMaterial color="#f2c94c" emissive="#665000" emissiveIntensity={0.2} />
      </mesh>

      <mesh position={[0, 0.1, -9.2-10]} castShadow>
        <boxGeometry args={[14, 0.8, 1.6]} />
        <meshStandardMaterial color="#101a2e" />
      </mesh>
    </group>
  )
}

export default SpaceShipInside
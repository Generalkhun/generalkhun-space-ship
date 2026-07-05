const SpaceShipIntro = () => {
  return (
    <group>
      <mesh position={[0, 0, -20]}>
        <boxGeometry args={[10, 1, 40]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  )
}

export default SpaceShipIntro
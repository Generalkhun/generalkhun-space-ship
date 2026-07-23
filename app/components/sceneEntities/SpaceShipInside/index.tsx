import { RigidBody } from "@react-three/rapier";

type RoomShellProps = {
  position: [number, number, number];
  size: [number, number, number];
  wallThickness?: number;
  color: string;
};

const RoomShell = ({
  position,
  size,
  wallThickness = 0.25,
  color,
}: RoomShellProps) => {
  const [width, height, depth] = size;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

  return (
    <group position={position}>
      <mesh position={[0, -halfHeight + wallThickness / 2, 0]} castShadow>
        <boxGeometry args={[width, wallThickness, depth]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, halfHeight - wallThickness / 2, 0]} castShadow>
        <boxGeometry args={[width, wallThickness, depth]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, -halfDepth + wallThickness / 2]} castShadow>
        <boxGeometry args={[width, height, wallThickness]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, halfDepth - wallThickness / 2]} castShadow>
        <boxGeometry args={[width, height, wallThickness]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[-halfWidth + wallThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[wallThickness, height, depth]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[halfWidth - wallThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[wallThickness, height, depth]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
};

const SpaceShipInside = () => {
  return (
    <group>
      {/* <RigidBody type="fixed" colliders="cuboid" position={[0, 0, -10]}>
        <mesh>
          <boxGeometry args={[14, 4.4, 20]} />
          <meshStandardMaterial color="#1f2c45" transparent opacity={0.35} />
        </mesh>
      </RigidBody> */}

      {/* floor */}
      {/* Slope floor to create a ramp */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        position={[10, 0, -6]}
        rotation={[Math.PI / 12, 0, 0]}
      >
        <mesh>
          <boxGeometry args={[4, 0.4, 6]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      {/* Spaceship interior */}
      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, 0, -24]}>
        <mesh>
          <boxGeometry args={[30, 1.4, 30]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>

      {/* Ship Walls */}
      {/* room walls */}
      {/* Mechanical room - central path */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        position={[7, 3, -11]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <mesh>
          <boxGeometry args={[4, 5, 0.4]} />
          <meshStandardMaterial
            color="#242e5c"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        position={[7, 3, -21]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <mesh>
          <boxGeometry args={[6, 5, 0.4]} />
          <meshStandardMaterial
            color="#242e5c"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      {/* Mechanical room - Science room */}
      <RigidBody type="fixed" colliders="cuboid" position={[-4, 2.5, -24]}>
        <mesh>
          <boxGeometry args={[22, 5, 0.4]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid" position={[-14.8, 2.5, -24]}>
        <mesh>
          <boxGeometry args={[0.4, 5, 30]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[14.8, 2.5, -24]}>
        <mesh>
          <boxGeometry args={[0.4, 5, 30]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[0, 2.5, -39]}>
        <mesh>
          <boxGeometry args={[30, 5, 0.4]} />
          <meshStandardMaterial
            color="#334b73"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      </RigidBody>

      {/* Elevator on the corner (square area on the floor to let the player stand on) */}
      <RigidBody type="fixed" colliders="cuboid" position={[-14.8, 0.8, -39]}>
        <mesh>
          <boxGeometry args={[4, 0.01, 4]} />
          <meshStandardMaterial color="red" metalness={0.2} roughness={0.4} />
        </mesh>
      </RigidBody>

      {/* <mesh position={[0, 0, -10]}>
        <boxGeometry args={[14, 0.4, 20]} />
        <meshStandardMaterial color="#334b73" metalness={0.2} roughness={0.4} />
      </mesh> */}

      {/* <RoomShell position={[-4.2, 1.4, -12.5]} size={[3.2, 2.8, 5.5]} color="#5b8fdc" />
      <RoomShell position={[-4.2, 1.4, -5.5]} size={[3.2, 2.8, 5.5]} color="#4a7bc0" />
      <RoomShell position={[2.8, 1.4, -8.8]} size={[5.5, 2.8, 9.5]} color="#020b19" /> */}

      {/* <mesh position={[0, 0.1, -19.2]} castShadow>
        <boxGeometry args={[14, 0.8, 1.6]} />
        <meshStandardMaterial color="#101a2e" />
      </mesh> */}
    </group>
  );
};

export default SpaceShipInside;

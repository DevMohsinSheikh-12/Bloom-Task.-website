import { RoundedBox } from "@react-three/drei";
import { PHONE_LAYOUT } from "./phoneLayout";

// Suspense fallback shown inside the Canvas while the GLB streams in — same
// two-phone silhouette as the real composition so there's no layout jump
// once it resolves.
export default function PhoneLoader() {
  return (
    <>
      {PHONE_LAYOUT.map((layout, i) => (
        <group key={i} position={layout.position} rotation={layout.rotation} scale={layout.scale}>
          <RoundedBox args={[1.62, 3.3, 0.16]} radius={0.16} smoothness={4}>
            <meshStandardMaterial color="#000000" roughness={0.6} transparent opacity={0.5} />
          </RoundedBox>
        </group>
      ))}
    </>
  );
}

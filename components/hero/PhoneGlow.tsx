"use client";

import { useMemo } from "react";
import * as THREE from "three";

function useGlowTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    const glow = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    glow.addColorStop(0, "rgba(135, 230, 75, 0.38)");
    glow.addColorStop(0.25, "rgba(135, 230, 75, 0.16)");
    glow.addColorStop(0.55, "rgba(135, 230, 75, 0.04)");
    glow.addColorStop(1, "rgba(135, 230, 75, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return new THREE.CanvasTexture(canvas);
  }, []);
}

// Soft green glow beneath the phones, like they're catching light from
// below — a single unlit, additively-blended billboard (2 triangles, one
// small generated texture, no per-frame cost) rather than a real reflection
// pass, which would mean rendering the scene twice.
export default function PhoneGlow() {
  const texture = useGlowTexture();

  return (
    <mesh position={[-0.05, -2.1, 0.2]}>
      <planeGeometry args={[3, 1.7]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

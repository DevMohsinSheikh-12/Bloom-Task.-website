"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { usePhoneTilt } from "@/hooks/usePhoneTilt";

// Procedural stand-in shown until the real GLB (public/models/iphone_14_pro_max_3d_model.glb)
// is in place, and permanently on any browser/device that can't load it — a
// simple screen-shaped panel with the brand's green glow, never a broken canvas.
function useScreenTexture(label: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
    base.addColorStop(0, "#050505");
    base.addColorStop(0.55, "#000000");
    base.addColorStop(1, "#000000");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height * 0.32,
      8,
      canvas.width / 2,
      canvas.height * 0.32,
      canvas.width * 0.95
    );
    glow.addColorStop(0, "rgba(135, 230, 75, 0.4)");
    glow.addColorStop(1, "rgba(135, 230, 75, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e9e7ec";
    ctx.font = "600 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, canvas.width / 2, canvas.height * 0.34);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [label]);
}

type PlaceholderPhoneProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  tiltStrength?: number;
  floatSeed?: number;
  label?: string;
};

export default function PlaceholderPhone({
  position,
  rotation,
  scale = 1,
  tiltStrength = 1,
  floatSeed = 0,
  label = "Bloom Task",
}: PlaceholderPhoneProps) {
  const tiltRef = usePhoneTilt(tiltStrength, floatSeed);
  const screenTexture = useScreenTexture(label);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={tiltRef}>
        <RoundedBox args={[1.62, 3.3, 0.16]} radius={0.16} smoothness={6}>
          <meshStandardMaterial color="#0d0c10" roughness={0.35} metalness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.083]}>
          <planeGeometry args={[1.46, 3.12]} />
          <meshStandardMaterial
            map={screenTexture}
            emissiveMap={screenTexture}
            emissive="#ffffff"
            emissiveIntensity={0.35}
            roughness={0.3}
          />
        </mesh>
        {/* Dynamic Island — unlit black so it reads as a true cutout rather
            than picking up the scene's colored point lights. */}
        <RoundedBox args={[0.45, 0.13, 0.02]} radius={0.06} smoothness={4} position={[0, 1.42, 0.094]}>
          <meshBasicMaterial color="#000000" />
        </RoundedBox>
      </group>
    </group>
  );
}

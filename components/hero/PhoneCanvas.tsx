"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import Phone from "./Phone";
import PhoneErrorBoundary from "./PhoneErrorBoundary";
import PhoneGlow from "./PhoneGlow";
import PhoneLoader from "./PhoneLoader";
import PlaceholderPhone from "./PlaceholderPhone";
import { PHONE_LAYOUT } from "./phoneLayout";

export default function PhoneCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      // fov is vertical, so the visible world-space height at a given depth
      // depends only on this angle and distance — not on the CSS box's
      // pixel size. At 32° the front phone's bottom edge (positioned low by
      // design, see phoneLayout.ts) fell just outside the frustum and got
      // clipped; 38° buys enough headroom to contain it with margin to
      // spare for the idle bob/tilt in usePhoneTilt.
      camera={{ position: [0, 0, 7.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 3, 4]} intensity={0.9} />
      {/* Soft green/blue ambient glow lighting behind/around the phones */}
      <pointLight position={[-2.4, 0.6, 2]} intensity={7} color="#87E64B" distance={9} decay={2} />
      <pointLight position={[2.4, -0.8, 1.6]} intensity={5} color="#4FB4F0" distance={9} decay={2} />
      {/* Procedural environment (Lightformer planes, no external HDRI fetch)
          so the phone's metal body catches reflections instead of rendering
          flat black — PBR metalness reads from image-based lighting, not
          point lights, which only produce tiny specular dots on their own. */}
      <Environment resolution={128}>
        <Lightformer intensity={2.5} color="#87E64B" position={[-3, 1, 2]} scale={[4, 4, 1]} />
        <Lightformer intensity={1.8} color="#4FB4F0" position={[3, -1, 1.4]} scale={[3, 3, 1]} />
        <Lightformer intensity={1} color="#ffffff" position={[0, 3, 4]} scale={[6, 2, 1]} />
      </Environment>
      <PhoneGlow />
      <PhoneErrorBoundary
        fallback={
          <>
            {PHONE_LAYOUT.map((layout, i) => (
              <PlaceholderPhone key={i} {...layout} />
            ))}
          </>
        }
      >
        <Suspense fallback={<PhoneLoader />}>
          {PHONE_LAYOUT.map((layout, i) => (
            <Phone key={i} {...layout} />
          ))}
        </Suspense>
      </PhoneErrorBoundary>
    </Canvas>
  );
}

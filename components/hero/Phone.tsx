"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { usePhoneTilt } from "@/hooks/usePhoneTilt";

const MODEL_PATH = "/models/iphone_14_pro_max_3d_model.glb";

// World-unit height every phone is normalized to, regardless of the source
// GLB's own scale/pivot — keeps the real model and the procedural
// PlaceholderPhone the same size on screen.
const TARGET_HEIGHT = 3.3;

// Screen meshes aren't reliably identifiable by name across GLB exports.
// This model has a "Display_13" (the real screen glass) AND a "Display
// Frame_14" (the bezel ring wrapping the screen's edge) — matching by name
// pattern caught both, and stretching the screenshot across the frame's
// edge-wrapping UVs produced streaky artifacts around the phone's border.
// Match by content instead: of this GLB's 9 materials, only the real screen
// (mesh "Object_8", material "iPhone_14_Pro_Wallpaper_Purple_YTECHB.com")
// ships with its own baked map/emissiveMap — every other mesh, including the
// frame, uses a flat color with no texture. That's a unique, robust signal
// regardless of how a given export names things.
function isScreenMesh(mesh: THREE.Mesh): boolean {
  const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  if (!material) return false;
  const { map, emissiveMap } = material as THREE.MeshStandardMaterial;
  return !!(map || emissiveMap);
}

type PhoneProps = {
  screenshot: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  tiltStrength?: number;
  floatSeed?: number;
};

export default function Phone({
  screenshot,
  position,
  rotation,
  scale = 1,
  tiltStrength = 1,
  floatSeed = 0,
}: PhoneProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const texture = useTexture(screenshot);
  const tiltRef = usePhoneTilt(tiltStrength, floatSeed);

  // A phone display is self-lit, not a reflective surface — MeshStandardMaterial
  // let the colored point lights specular-reflect directly off the screen,
  // washing the screenshot out into a flat glow. MeshBasicMaterial is unlit,
  // so the screenshot renders as-authored regardless of scene lighting.
  //
  // DoubleSide matters here: this mesh's local geometry is a flat plane with
  // its normal along local Y (not Z), and that axis's accumulated world
  // transform points the front face toward world -Z — away from the camera
  // at z=7.6 looking at the origin. With the default FrontSide, that back
  // face gets culled entirely; only a sliver was ever visible, at a grazing
  // angle from the phone's tilt. Render both sides so it's visible head-on —
  // but since what's actually facing us is the mesh's back, the UVs read
  // mirrored left-right from our viewpoint; flip U to compensate.
  //
  // The Dynamic Island is painted directly onto the screenshot here rather
  // than matched as separate GLB geometry — this specific model (see the
  // node dump in the project notes) has no island/notch/sensor mesh at all;
  // its only front-facing parts are Display_13 (the screen) and Display
  // Frame_14 (the bezel ring). Painting it into the unlit screen texture
  // guarantees pure black regardless of scene lighting, and it rotates/tilts
  // with the phone for free since it's baked into the same mesh.
  const screenMaterial = useMemo(() => {
    const sourceImage = texture.image as HTMLImageElement;
    const width = sourceImage.naturalWidth || sourceImage.width;
    const height = sourceImage.naturalHeight || sourceImage.height;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(sourceImage, 0, 0, width, height);

    const islandWidth = width * 0.3;
    const islandHeight = islandWidth / 3.3;
    const islandX = (width - islandWidth) / 2;
    const islandY = height * 0.012;
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect(islandX, islandY, islandWidth, islandHeight, islandHeight / 2);
    ctx.fill();

    const composited = new THREE.CanvasTexture(canvas);
    composited.colorSpace = THREE.SRGBColorSpace;
    composited.wrapS = THREE.RepeatWrapping;
    composited.repeat.x = -1;
    composited.needsUpdate = true;

    return new THREE.MeshBasicMaterial({ map: composited, toneMapped: false, side: THREE.DoubleSide });
  }, [texture]);

  // Clone, recenter/rescale, and apply the screen material all in one memo
  // (not a separate effect) so every recompute starts from a *fresh* clone
  // of the cached GLTF scene. useGLTF's `scene` is a shared, module-cached
  // object — clone(true) copies the node hierarchy but each mesh's material
  // is copied by reference, not deep-cloned. Doing the screen-mesh match in
  // a useEffect against the already-built clonedScene meant a second effect
  // pass (React Strict Mode double-invokes effects in dev) was checking a
  // mesh whose material the first pass had already overwritten — so it
  // silently stopped finding the real screen. Fresh clone each time avoids that.
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.updateMatrixWorld(true);

    let foundScreen = false;
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !isScreenMesh(child)) return;
      foundScreen = true;
      child.material = screenMaterial;
    });
    if (!foundScreen && process.env.NODE_ENV !== "production") {
      console.warn(
        "[Phone] No mesh with a baked map/emissiveMap was found in the GLB — the screenshot texture wasn't applied. Inspect the model's materials and update isScreenMesh() in components/hero/Phone.tsx."
      );
    }

    // This particular export's pivot sits at the model's base, with the mesh
    // running from world y=0.01 to y=4.0 instead of being centered — left
    // untransformed, the camera (framed on the origin) only sees the bottom
    // half of the phone. Recompute the bounding box and recenter/rescale so
    // any GLB, regardless of its own pivot, ends up centered and sized consistently.
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const normalize = TARGET_HEIGHT / (size.y || 1);
    cloned.scale.setScalar(normalize);
    cloned.position.set(-center.x * normalize, -center.y * normalize, -center.z * normalize);

    return cloned;
  }, [scene, screenMaterial]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={tiltRef} dispose={null}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

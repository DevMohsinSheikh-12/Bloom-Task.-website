Place the GLB model here as:

    iphone_14_pro_max_3d_model.glb

Loaded from `components/hero/Phone.tsx` via `useGLTF('/models/iphone_14_pro_max_3d_model.glb')`,
rendered twice (see `components/hero/phoneLayout.ts`) for the overlapping two-phone hero.
Until this file exists, the hero automatically shows two procedural placeholder phones instead.

Node/mesh names aren't assumed — `Phone.tsx`'s `isScreenMesh()` matches on mesh name, parent
name, or material name against `/screen|display|wallpaper/i`. If you swap in a different GLB and
the screenshot texture stops applying, check the console warning it logs and extend that regex.

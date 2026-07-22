Drop your real app screenshots in here, replacing the 7 placeholder PNGs (right now they're
literally 4 images copy-pasted across 7 filenames — same file size on all of them).

There are 7 phone placements across the site, each with its own dedicated file — no filename is
shared between two different phones anymore, so you can drop in 7 genuinely different screens
(or 7 different moments of the same screen) without one edit affecting two spots at once.

Exact filenames the site expects (must match, lowercase, `.png`):

    png1.png — Hero section, front/larger 3D phone
    png2.png — Hero section, back/smaller 3D phone
    png3.png — AI Companion section's phone
    png4.png — Saves section's phone
    png5.png — App Showcase, left phone   ("talk when you need to")
    png6.png — App Showcase, center/big phone ("save it, and it becomes real")
    png7.png — App Showcase, right phone  ("watch it add up, quietly")

Recommended: real phone screenshot aspect ratio, e.g. 1170x2532 (iPhone) or similar ~9:19.5.
They get rendered inside a phone-frame component at fairly small sizes (as little as ~120px
wide), so crop tight to the screen content — don't include the phone's own status bar/notch if
your screenshot tool captures the full device chrome, since the site's own phone frame already
draws that.

## Where each one is used

- **png1.png** / **png2.png**
  - Hero section's two overlapping 3D phones (`components/hero/phoneLayout.ts`)
  - Also used by the static (no-WebGL / mobile) fallback's front and back cards, respectively
    (`components/hero/StaticPhoneFallback.tsx`) — same two screens, alternate rendering path

- **png3.png**
  - AI Companion section's phone only (`components/ai-companion/AICompanionSection.tsx` via
    `TiltPhone`)

- **png4.png**
  - Saves section's phone only (`components/saves/SavesPhone.tsx`)

- **png5.png** / **png6.png** / **png7.png**
  - App Showcase's three phones, both the desktop scroll-driven sequence
    (`components/showcase/ScrollPhoneSequence.tsx`) and the mobile static row
    (`components/showcase/StaticPhoneRow.tsx`) — same three screens, alternate rendering path
    per breakpoint

## Why this matters for the hero specifically

- The hero renders two overlapping 3D phones (`components/hero/phoneLayout.ts`); each shows one
  fixed screenshot on its screen mesh once the GLB model is in place (`components/hero/Phone.tsx`).
- If a phone's screenshot fails to load, that GLB fails to texture and the whole hero falls back
  to two procedural placeholder phones (with a plain wordmark, not a broken texture) rather than
  showing something half-broken.
- Everywhere else (AI Companion, Saves, App Showcase) just renders a plain `<Image>` inside a CSS
  phone frame (`components/ui/iphone-15-pro.tsx`) — no GLB/3D dependency, so a missing file there
  only breaks that one image, not a whole section.

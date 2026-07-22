import IPhone15Pro from "@/components/ui/iphone-15-pro";
import TagChip from "./TagChip";

// Tilt and the idle bob both animate/set `transform` — kept on separate
// nested elements (same reasoning as components/ai-companion/TiltPhone.tsx)
// so the animate-float keyframe doesn't silently overwrite the static
// rotation each cycle. The bob riding inside the tilted wrapper's own
// coordinate space is intentional: it reads as the phone bobbing in its own
// tilted plane rather than an oddly-decoupled perfectly-vertical float.
//
// The tilt itself is a real perspective transform, not a flat 2D rotate —
// a positive rotateX tips the top of the phone away from the viewer (into
// the page), which is what actually reads as "leaning back" rather than
// just spinning in-plane; a smaller rotateZ keeps a bit of the original
// diagonal angle.
export default function SavesPhone() {
  return (
    <div className="relative mx-auto w-[240px] sm:w-[270px] [perspective:1200px]">
      <div className="[transform:rotateX(12deg)_rotateZ(-9deg)] [transform-style:preserve-3d]">
        <div className="animate-float">
          <IPhone15Pro
            src="/images/screenshots/png4.png"
            alt="The Bloom Task Saves screen"
            className="drop-shadow-[0_35px_70px_rgba(0,0,0,0.55)]"
          />
        </div>
      </div>

      <TagChip label="recipe" color="green" className="-left-8 top-[16%]" floatDuration={5} floatDelay={0} />
      <TagChip label="workout" color="blue" className="-right-6 top-[6%]" floatDuration={4.4} floatDelay={0.6} />
      <TagChip
        label="read later"
        color="green"
        className="-left-4 bottom-[12%]"
        floatDuration={5.6}
        floatDelay={1.2}
      />
    </div>
  );
}

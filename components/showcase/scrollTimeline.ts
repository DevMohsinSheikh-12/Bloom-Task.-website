// Piecewise-linear remap, same semantics as Framer Motion's own
// useTransform([in], [out]) but usable as a plain function — so the same
// curve can drive a phone's live position AND a delayed ("lagged") copy of
// it for the trailing glow, by evaluating it at progress - lag.
export function remap(value: number, input: readonly number[], output: readonly number[]): number {
  const clamped = Math.min(input[input.length - 1], Math.max(input[0], value));
  for (let i = 0; i < input.length - 1; i++) {
    if (clamped <= input[i + 1]) {
      const span = input[i + 1] - input[i] || 1;
      const t = (clamped - input[i]) / span;
      return output[i] + t * (output[i + 1] - output[i]);
    }
  }
  return output[output.length - 1];
}

export interface PhoneTimeline {
  src: string;
  alt: string;
  label: string;
  /** progress at which this phone starts spreading out from the stack */
  start: number;
  /** progress at which it settles into its final position */
  end: number;
  finalX: number;
  finalY: number;
  finalRotate: number;
  finalScale: number;
  trailClass: string;
  big?: boolean;
}

const SETTLE = 0.1;
const TRAIL_LAG = 0.06;

export function makePhoneCurves(phone: PhoneTimeline) {
  const xAt = (p: number) => remap(p, [0, phone.start, phone.end, 1], [0, 0, phone.finalX, phone.finalX]);
  const yAt = (p: number) => remap(p, [0, phone.start, phone.end, 1], [0, 0, phone.finalY, phone.finalY]);
  const rotateAt = (p: number) =>
    remap(p, [0, phone.start, phone.end, 1], [0, phone.finalRotate * 0.25, phone.finalRotate, phone.finalRotate]);
  const scaleAt = (p: number) => remap(p, [0, phone.start, phone.end, 1], [0.85, 0.85, phone.finalScale, phone.finalScale]);

  const glowAt = (p: number) =>
    remap(p, [phone.end, phone.end + 0.02, phone.end + SETTLE], [0, 0.85, 0]);

  const labelOpacityAt = (p: number) => remap(p, [phone.end + 0.02, phone.end + SETTLE], [0, 1]);
  const labelYAt = (p: number) => remap(p, [phone.end + 0.02, phone.end + SETTLE], [12, 0]);

  const trailXAt = (p: number) => xAt(Math.max(0, p - TRAIL_LAG));
  const trailYAt = (p: number) => yAt(Math.max(0, p - TRAIL_LAG));
  const trailOpacityAt = (p: number) =>
    remap(p, [phone.start, (phone.start + phone.end) / 2, phone.end], [0, 0.55, 0]);

  return { xAt, yAt, rotateAt, scaleAt, glowAt, labelOpacityAt, labelYAt, trailXAt, trailYAt, trailOpacityAt };
}

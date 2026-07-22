type IconProps = { className?: string };

// A simplified bugdroid silhouette built from basic shapes — not a trace of
// the official artwork, just enough to read as "Android" at button size next
// to the label text.
export default function AndroidIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6 10.5v6a1 1 0 0 0 1 1h1v2.25a1.25 1.25 0 0 0 2.5 0V17.5h3v2.25a1.25 1.25 0 0 0 2.5 0V17.5h1a1 1 0 0 0 1-1v-6H6Z" />
      <path d="M6.3 9.5a5.7 5.7 0 0 1 11.4 0H6.3Z" />
      <rect x="3.2" y="10.5" width="1.8" height="5.5" rx="0.9" />
      <rect x="19" y="10.5" width="1.8" height="5.5" rx="0.9" />
      <rect
        x="8.3"
        y="4.4"
        width="1.4"
        height="2.6"
        rx="0.7"
        transform="rotate(-28 9 5.7)"
      />
      <rect
        x="14.3"
        y="4.4"
        width="1.4"
        height="2.6"
        rx="0.7"
        transform="rotate(28 15 5.7)"
      />
    </svg>
  );
}

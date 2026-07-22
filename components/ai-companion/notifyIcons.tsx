type IconProps = { className?: string };

// Placeholder glyphs for the companion notification cards — swap the <path>/
// shape data inside each once the real icons are in. Keep the component
// names (NotifyIcon1-4) and the `className` passthrough so nothing else
// needs to change in CompanionNotifications.tsx when the real artwork lands.
// Mapped in NOTES's own order: 1 = gentle, 2 = coach, 3 = companion,
// 4 = check-in.

export function NotifyIcon1({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth={1.75} />
    </svg>
  );
}

export function NotifyIcon2({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 5.5v13M12 5.5l-4.5 4.5M12 5.5l4.5 4.5"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NotifyIcon3({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4.5 6A1.5 1.5 0 0 1 6 4.5h12A1.5 1.5 0 0 1 19.5 6v9a1.5 1.5 0 0 1-1.5 1.5H9.5L5.5 20v-3.5H6A1.5 1.5 0 0 1 4.5 15V6Z"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NotifyIcon4({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 4.5a4.5 4.5 0 0 0-4.5 4.5v2.5c0 .8-.3 1.56-.85 2.15L5.5 15h13l-1.15-1.35A3.25 3.25 0 0 1 16.5 11.5V9A4.5 4.5 0 0 0 12 4.5Z"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
    </svg>
  );
}

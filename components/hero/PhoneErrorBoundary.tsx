"use client";

import { Component, type ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };
type State = { hasError: boolean };

// Catches GLB/texture load failures (missing model file, missing screenshot,
// unexpected node names) so a bad asset degrades to the procedural
// placeholder phone instead of crashing the hero.
export default class PhoneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[PhoneErrorBoundary] falling back to placeholder phone:", error);
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

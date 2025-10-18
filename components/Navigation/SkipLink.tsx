'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute top-0 left-0 z-[60] bg-cyan-500 text-white px-4 py-2 font-semibold rounded-br-lg transition-transform -translate-y-full focus:translate-y-0"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}

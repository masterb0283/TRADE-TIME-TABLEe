import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--text)]">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-sm text-[15px] text-[var(--text-muted)]">
        The page you&apos;re looking for may have moved. Head back to the homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-2xl bg-accent px-6 text-sm font-medium text-white"
      >
        Back to home
      </Link>
    </div>
  );
}

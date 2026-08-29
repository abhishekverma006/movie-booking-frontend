import type { ReactNode } from "react";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export const AuthLayout = ({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
          {/* Brand Panel */}
          <section className="relative hidden min-h-[700px] flex-col justify-between overflow-hidden bg-slate-900 p-10 text-white lg:flex xl:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-slate-900">
                  M
                </div>

                <span className="text-xl font-bold tracking-tight">
                  MovieBook
                </span>
              </div>

              <div className="max-w-md">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  Movie Booking
                </p>

                <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                  Your next movie
                  <span className="block text-indigo-300">starts here.</span>
                </h2>

                <p className="mt-6 max-w-sm text-base leading-7 text-slate-300">
                  Discover movies, choose your favourite seats, and enjoy a
                  seamless cinema booking experience.
                </p>
              </div>
            </div>

            <div className="relative grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-semibold">Discover Movies</p>

                <p className="mt-1 text-sm text-slate-400">
                  Find the latest movies and releases.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-semibold">Choose Your Seats</p>

                <p className="mt-1 text-sm text-slate-400">
                  Select the perfect seats for your show.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-semibold">Book Securely</p>

                <p className="mt-1 text-sm text-slate-400">
                  Complete your booking with confidence.
                </p>
              </div>
            </div>
          </section>

          {/* Form Panel */}
          <section className="flex min-h-[700px] items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
            <div className="w-full max-w-md">
              {/* Mobile Brand */}
              <div className="mb-8 lg:hidden">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
                    M
                  </div>

                  <span className="text-xl font-bold text-slate-900">
                    MovieBook
                  </span>
                </div>
              </div>

              {/* Page Heading */}
              <div className="mb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                  {eyebrow}
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>

              {children}

              {footer}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

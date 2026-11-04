export function PagePlaceholder({ title, intro }: { title: string; intro: string }) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-24 pt-40">
      <p className="hero-rise text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8] dark:text-sky-400">
        Techisar
      </p>
      <h1
        className="hero-rise mt-4 text-5xl font-bold tracking-[-0.025em] text-[#0b1a44] sm:text-6xl dark:text-white"
        style={{ animationDelay: "100ms" }}
      >
        {title}
      </h1>
      <p
        className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
        style={{ animationDelay: "200ms" }}
      >
        {intro}
      </p>
    </main>
  );
}

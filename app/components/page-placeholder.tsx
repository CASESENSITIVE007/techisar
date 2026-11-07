export function PagePlaceholder({ title, intro }: { title: string; intro: string }) {
  return (
    <main className="page">
      <div className="container">
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
      </div>
    </main>
  );
}

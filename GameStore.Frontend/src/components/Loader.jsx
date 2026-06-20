const Loader = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-lg border border-slate-800 bg-slate-900/60"
        />
      ))}
    </div>
  );
};

export default Loader;

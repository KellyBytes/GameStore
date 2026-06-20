const ErrorBanner = ({ error, loadAll }) => {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
      <span>{error}</span>
      <button
        type="button"
        onClick={loadAll}
        className="shrink-0 rounded-md border border-rose-500/40 px-3 py-1 text-xs font-medium hover:bg-rose-500/10"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorBanner;

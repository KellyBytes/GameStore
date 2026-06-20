import { API_BASE } from '../utils';

const Header = ({ openAddModal }) => {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-5">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
          {API_BASE.replace('http://', '')}/games
        </p>
        <h1 className="font-display text-3xl font-bold text-slate-100">
          Game Library
        </h1>
      </div>
      <button
        type="button"
        onClick={openAddModal}
        className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
      >
        + Add Game
      </button>
    </header>
  );
};

export default Header;

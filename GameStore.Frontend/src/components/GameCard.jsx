import { useState } from 'react';
import { API_BASE } from '../utils';

const GameCard = ({
  style,
  genreNameToId,
  isConfirming,
  genreName,
  setEditingId,
  setForm,
  setFormError,
  setModalOpen,
  setDeleteError,
  setGames,
  setConfirmDeleteId,
  game,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  function formatPrice(price) {
    const n = Number(price);
    return Number.isNaN(n) ? '—' : `$${n.toFixed(2)}`;
  }

  function formatDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso);
    return d.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function toDateInputValue(iso) {
    if (!iso) return '';
    return String(iso).slice(0, 10);
  }

  function openEditModal(game) {
    setEditingId(game.id);
    setForm({
      name: game.name ?? '',
      genreId: genreNameToId.get(game.genre) ?? '',
      price: game.price != null ? String(game.price) : '',
      releaseDate: toDateInputValue(game.releaseDate),
    });
    setFormError(null);
    setModalOpen(true);
  }

  async function handleDelete(id) {
    setDeletingId(id);
    setDeleteError(null);
    try {
      const res = await fetch(`${API_BASE}/games/${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204)
        throw new Error(`Server responded ${res.status}`);
      setGames(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      setDeleteError(err.message || 'Could not delete the game.');
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  return (
    <div
      key={game.id}
      className="group relative flex gap-3 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-700"
    >
      <div className={`w-1 shrink-0 rounded-full ${style.bar}`} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-display text-base font-semibold text-slate-100">
            {game.name}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs ring-1 ${style.bg} ${style.text} ${style.ring}`}
          >
            {genreName(game)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="font-mono text-amber-300">
            {formatPrice(game.price)}
          </span>
          <span className="font-mono text-xs text-slate-500">
            {formatDate(game.releaseDate)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-start gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={() => openEditModal(game)}
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          title="Edit"
        >
          ✎
        </button>
        <button
          type="button"
          onClick={() => setConfirmDeleteId(game.id)}
          className="rounded-md p-1.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400"
          title="Delete"
        >
          ✕
        </button>
      </div>

      {isConfirming && (
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-slate-950/95 px-4 text-sm">
          <span className="text-slate-300">Delete "{game.name}"?</span>
          <button
            type="button"
            disabled={deletingId === game.id}
            onClick={() => handleDelete(game.id)}
            className="rounded-md bg-rose-500 px-3 py-1 font-medium text-white hover:bg-rose-400 disabled:opacity-60"
          >
            {deletingId === game.id ? 'Deleting…' : 'Delete'}
          </button>
          <button
            type="button"
            onClick={() => setConfirmDeleteId(null)}
            className="rounded-md border border-slate-700 px-3 py-1 text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default GameCard;

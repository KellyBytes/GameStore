import { useState, useEffect, useMemo, useCallback } from 'react';
import { API_BASE, GENRE_PALETTE, EMPTY_FORM } from './utils';
import Loader from './components/Loader';
import Modal from './components/Modal';
import GameCard from './components/GameCard';
import Empty from './components/Empty';
import Filter from './components/Filter';
import Header from './components/Header';
import ErrorBanner from './components/ErrorBanner';

const App = () => {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [gamesRes, genresRes] = await Promise.all([
        fetch(`${API_BASE}/games`),
        fetch(`${API_BASE}/genres`),
      ]);
      if (!gamesRes.ok) throw new Error(`/games returned ${gamesRes.status}`);
      if (!genresRes.ok)
        throw new Error(`/genres returned ${genresRes.status}`);
      const [gamesData, genresData] = await Promise.all([
        gamesRes.json(),
        genresRes.json(),
      ]);
      setGames(Array.isArray(gamesData) ? gamesData : []);
      setGenres(Array.isArray(genresData) ? genresData : []);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'Could not reach the API. Is it running, and does it allow CORS from this origin?'
          : err.message || 'Something went wrong while loading data.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const genreMap = useMemo(() => {
    const m = new Map();
    genres.forEach(genre => m.set(String(genre.id), genre.name));
    return m;
  }, [genres]);

  const genreName = useCallback(
    game => game.genre || genreMap.get(String(game.name)) || 'Unknown genre',
    [genreMap],
  );

  const genreNameToId = useMemo(() => {
    const m = new Map();
    genres.forEach(genre => m.set(genre.name, String(genre.id)));
    return m;
  }, [genres]);

  const filteredGames = useMemo(() => {
    return games
      .filter(g =>
        genreFilter === 'all' ? true : String(g.genre) === genreFilter,
      )
      .filter(g =>
        (g.name || '').toLowerCase().includes(query.trim().toLowerCase()),
      )
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }, [games, genreFilter, query]);

  const genreStyle = id => {
    const n = Math.abs(Number(id) || 0);
    return GENRE_PALETTE[n % GENRE_PALETTE.length];
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim()) return setFormError('Name is required.');
    if (!form.genreId) return setFormError('Choose a genre.');
    const priceNum = Number(form.price);
    if (form.price === '' || Number.isNaN(priceNum) || priceNum < 0) {
      return setFormError('Price must be a valid, non-negative number.');
    }
    if (!form.releaseDate) return setFormError('Release date is required.');

    const payload = {
      name: form.name.trim(),
      genreId: Number(form.genreId),
      price: priceNum,
      releaseDate: form.releaseDate,
    };

    setSaving(true);
    setFormError(null);
    try {
      const url = editingId
        ? `${API_BASE}/games/${editingId}`
        : `${API_BASE}/games`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          editingId ? { id: editingId, ...payload } : payload,
        ),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setModalOpen(false);
      await loadAll();
    } catch (err) {
      setFormError(err.message || 'Could not save the game.');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <>
      <div className="min-h-screen bg-slate-800 px-6 py-8 text-slate-200 sm:px-10">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap');
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
      `}</style>

        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <Header openAddModal={openAddModal} />

          {/* Error banner */}
          {error && <ErrorBanner error={error} loadAll={loadAll} />}

          {deleteError && (
            <div className="mb-6 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {deleteError}
            </div>
          )}

          {/* Filters */}
          {!loading && !error && (
            <Filter
              query={query}
              setQuery={setQuery}
              genreFilter={genreFilter}
              setGenreFilter={setGenreFilter}
              genres={genres}
              genreStyle={genreStyle}
            />
          )}

          {/* Loading */}
          {loading && <Loader />}

          {/* Empty state */}
          {!loading && !error && filteredGames.length === 0 && (
            <Empty games={games} openAddModal={openAddModal} />
          )}

          {/* Game grid */}
          {!loading && !error && filteredGames.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredGames.map(game => {
                const style = genreStyle(genreNameToId.get(game.genre));
                const isConfirming = confirmDeleteId === game.id;
                return (
                  <GameCard
                    style={style}
                    genreNameToId={genreNameToId}
                    isConfirming={isConfirming}
                    genreName={genreName}
                    setEditingId={setEditingId}
                    setForm={setForm}
                    setFormError={setFormError}
                    setModalOpen={setModalOpen}
                    setDeleteError={setDeleteError}
                    setGames={setGames}
                    setConfirmDeleteId={setConfirmDeleteId}
                    game={game}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Add / Edit modal */}
        {modalOpen && (
          <Modal
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            editingId={editingId}
            form={form}
            setForm={setForm}
            genres={genres}
            formError={formError}
            saving={saving}
          />
        )}
      </div>
    </>
  );
};

export default App;

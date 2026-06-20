function FilterChip({ active, onClick, children, dotClass }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ' +
        (active
          ? 'border-slate-500 bg-slate-700 text-slate-100'
          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200')
      }
    >
      {dotClass && <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />}
      {children}
    </button>
  );
}

const Filter = ({
  query,
  setQuery,
  genreFilter,
  setGenreFilter,
  genres,
  genreStyle,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search by name…"
        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-slate-600 sm:w-64"
      />
      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={genreFilter === 'all'}
          onClick={() => setGenreFilter('all')}
        >
          All genres
        </FilterChip>
        {genres.map(genre => (
          <FilterChip
            key={genre.id}
            active={genreFilter === String(genre.name)}
            onClick={() => setGenreFilter(String(genre.name))}
            dotClass={genreStyle(genre.id).bar}
          >
            {genre.name}
          </FilterChip>
        ))}
      </div>
    </div>
  );
};

export default Filter;

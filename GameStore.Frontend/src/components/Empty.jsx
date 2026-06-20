const Empty = ({ games, openAddModal }) => {
  return (
    <div className="rounded-lg border border-dashed border-slate-800 px-6 py-12 text-center">
      <p className="text-slate-400">
        {games.length === 0 ? 'No games yet.' : 'No games match your search.'}
      </p>
      {games.length === 0 && (
        <button
          type="button"
          onClick={openAddModal}
          className="mt-4 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
        >
          Add your first game
        </button>
      )}
    </div>
  );
};

export default Empty;

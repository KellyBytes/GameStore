const Modal = ({
  closeModal,
  handleSubmit,
  editingId,
  form,
  setForm,
  genres,
  formError,
  saving,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={closeModal}
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
      >
        <h2 className="font-display text-xl font-semibold text-slate-100">
          {editingId ? 'Edit Game' : 'Add Game'}
        </h2>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
              placeholder="e.g. Hollow Knight"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
              Genre
            </label>
            <select
              value={form.genreId}
              onChange={e => setForm(f => ({ ...f, genreId: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
            >
              <option value="">Select a genre…</option>
              {genres.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
                placeholder="29.99"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
                Release date
              </label>
              <input
                type="date"
                value={form.releaseDate}
                onChange={e =>
                  setForm(f => ({ ...f, releaseDate: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
              />
            </div>
          </div>
        </div>

        {formError && <p className="mt-3 text-sm text-rose-400">{formError}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300 disabled:opacity-60"
          >
            {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add game'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;

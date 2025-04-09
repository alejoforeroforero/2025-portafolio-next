import { Experience } from "@prisma/client";

interface ExperienceFormProps {
  form: Partial<Experience>;
  setForm: (form: Partial<Experience>) => void;
  errors: Record<string, string>;
  isCurrentPosition: boolean;
  setIsCurrentPosition: (value: boolean) => void;
  experienceId?: string;
}

export const ExperienceForm = ({
  form,
  setForm,
  errors,
  isCurrentPosition,
  setIsCurrentPosition,
  experienceId,
}: ExperienceFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          value={form.title || ''}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          rows={3}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Link</label>
        <input
          type="url"
          value={form.link || ''}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
        />
        {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Start Date</label>
          <input
            type="date"
            value={form.startDate ? new Date(form.startDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setForm({ ...form, startDate: new Date(e.target.value) })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">End Date</label>
          <div className="space-y-2">
            <input
              type="date"
              value={form.endDate && !isCurrentPosition ? new Date(form.endDate).toISOString().split('T')[0] : ''}
              onChange={(e) => setForm({ ...form, endDate: new Date(e.target.value) })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
              disabled={isCurrentPosition}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`currentPosition-${experienceId || 'new'}`}
                checked={isCurrentPosition}
                onChange={(e) => {
                  setIsCurrentPosition(e.target.checked);
                  if (e.target.checked) {
                    setForm({ ...form, endDate: null });
                  }
                }}
                className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor={`currentPosition-${experienceId || 'new'}`} className="ml-2 text-sm text-gray-300">
                Current Position
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Position</label>
        <input
          type="number"
          value={form.position || ''}
          onChange={(e) => setForm({ ...form, position: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          min="0"
        />
        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Technologies (comma-separated)</label>
        <input
          type="text"
          value={form.stack?.join(', ') || ''}
          onChange={(e) => setForm({ ...form, stack: e.target.value.split(',').map(t => t.trim()) })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          placeholder="React, TypeScript, Node.js"
        />
        {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Image URL (optional)</label>
        <input
          type="url"
          value={form.img || ''}
          onChange={(e) => setForm({ ...form, img: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
        />
      </div>
    </div>
  );
};
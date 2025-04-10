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
}: ExperienceFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title || ''}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          placeholder="Enter experience title"
        />
        {errors.title && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.title}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          rows={3}
          placeholder="Enter experience description"
        />
        {errors.description && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.description}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Link</label>
        <input
          type="url"
          value={form.link || ''}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          placeholder="https://example.com"
        />
        {errors.link && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.link}</span>}
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
          {errors.startDate && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.startDate}</span>}
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
            {errors.endDate && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.endDate}</span>}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Position <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={form.position || ''}
          onChange={(e) => setForm({ ...form, position: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          min="0"
          placeholder="Enter display position (0 or higher)"
        />
        {errors.position && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.position}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Technologies <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.stack?.join(', ') || ''}
          onChange={(e) => setForm({ ...form, stack: e.target.value.split(',').map(t => t.trim()) })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          placeholder="React, TypeScript, Node.js"
        />
        {errors.stack && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.stack}</span>}
        <span className="text-gray-400 text-xs mt-1">Separate technologies with commas</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Image URL (optional)</label>
        <input
          type="url"
          value={form.img || ''}
          onChange={(e) => setForm({ ...form, img: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
          placeholder="https://example.com/image.jpg"
        />
        {errors.img && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.img}</span>}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>Fields marked with <span className="text-red-500">*</span> are required</p>
      </div>
    </div>
  );
};

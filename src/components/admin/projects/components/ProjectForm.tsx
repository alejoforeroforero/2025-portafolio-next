import { Project } from "@prisma/client";
import { PROJECT_TYPES } from '../schemas/project-schema';

interface ProjectFormProps {
  form: Partial<Project>;
  setForm: (form: Partial<Project>) => void;
  errors: Record<string, string>;
  isCurrentProject: boolean;
  setIsCurrentProject: (value: boolean) => void;
  projectId?: string;
}

export const ProjectForm = ({
  form,
  setForm,
  errors,
  isCurrentProject,
  setIsCurrentProject,
}: ProjectFormProps) => {
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
          placeholder="Enter project title"
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
          placeholder="Enter project description"
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
        />
        {errors.link && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.link}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Project Type</label>
        <select
          value={form.type || ''}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
        >
          <option value="">Select a type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.type && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.type}</span>}
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
          <input
            type="date"
            value={form.endDate && !isCurrentProject ? new Date(form.endDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setForm({ ...form, endDate: new Date(e.target.value) })}
            disabled={isCurrentProject}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 disabled:opacity-50"
          />
          {errors.endDate && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.endDate}</span>}
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
          onChange={(e) => setForm({ ...form, stack: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
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
        />
        {errors.img && <span className="block text-red-800 text-sm mt-1 bg-red-100 p-1 rounded">{errors.img}</span>}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isCurrentProject}
          onChange={(e) => setIsCurrentProject(e.target.checked)}
          className="rounded bg-gray-700 border-gray-600 text-blue-500"
        />
        <label className="text-sm text-gray-300">Current Project</label>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>Fields marked with <span className="text-red-500">*</span> are required</p>
      </div>
    </div>
  );
};

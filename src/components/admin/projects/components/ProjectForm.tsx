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
          rows={4}
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

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300">End Date</label>
          <input
            type="date"
            value={form.endDate ? new Date(form.endDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setForm({ ...form, endDate: new Date(e.target.value) })}
            disabled={isCurrentProject}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 disabled:opacity-50"
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
        </div>
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            checked={isCurrentProject}
            onChange={(e) => setIsCurrentProject(e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-500"
          />
          <label className="ml-2 text-sm text-gray-300">Current Project</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Position</label>
        <input
          type="number"
          value={form.position || 0}
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

      <div>
        <label className="block text-sm font-medium text-gray-300">Project Type</label>
        <select
          value={form.type || ''}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
        >
          <option value="">Select a type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
      </div>
    </div>
  );
};

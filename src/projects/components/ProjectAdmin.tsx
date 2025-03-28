"use client";

import { Project } from "@prisma/client";
import { useEffect, useState } from "react";
import { projectSchema } from "../schemas/project-schema";
import { DeleteProject, GetProjects, UpdateProject, CreateProject } from "../actions/project-actions";
import * as yup from "yup";

export const ProjectAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [createForm, setCreateForm] = useState<Partial<Project>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await GetProjects();
    setProjects(data);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm(project);
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUpdate(id);
    }
    if (e.key === "Escape") {
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleStackChange = (value: string, isEdit: boolean = false) => {
    const technologies = value.split(',').map(tech => tech.trim());
    if (isEdit) {
      setEditForm({ ...editForm, stack: technologies });
    } else {
      setCreateForm({ ...createForm, stack: technologies });
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editForm.title || !editForm.description || !editForm.link) return;

    try {
      const validatedData = await projectSchema.validate(editForm, { abortEarly: false });
      
      await UpdateProject({
        ...validatedData,
        id,
        createdAt: editForm.createdAt || new Date(),
        updatedAt: new Date(),
        stack: validatedData.stack.filter((item): item is string => item !== undefined),
      });

      setEditingId(null);
      setEditForm({});
      setErrors({});
      await loadProjects();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleDelete = async (id: string) => {
    await DeleteProject(id);
    await loadProjects();
  };

  const handleCreate = async () => {
    if (!createForm.title || !createForm.description || !createForm.link) return;

    try {
      const validatedData = await projectSchema.validate(createForm, { abortEarly: false });
      
      await CreateProject({
        title: validatedData.title,
        description: validatedData.description,
        link: validatedData.link,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        position: validatedData.position,
        stack: validatedData.stack.filter((item): item is string => item !== undefined),
        img: validatedData.img || null,
        type: validatedData.type,
      });

      setIsFormVisible(false);
      setCreateForm({});
      setErrors({});
      await loadProjects();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          {isFormVisible ? 'Cancel' : 'Add New Project'}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={createForm.title || ''}
                onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                placeholder="Title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <textarea
                value={createForm.description || ''}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                placeholder="Description"
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <input
                type="text"
                value={createForm.link || ''}
                onChange={(e) => setCreateForm({ ...createForm, link: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                placeholder="Link"
              />
              {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
            </div>

            <div>
              <input
                type="text"
                value={createForm.img || ''}
                onChange={(e) => setCreateForm({ ...createForm, img: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                placeholder="Image URL"
              />
              {errors.img && <p className="text-red-500 text-sm mt-1">{errors.img}</p>}
            </div>

            <div>
              <input
                type="text"
                value={createForm.type || ''}
                onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                placeholder="Project Type"
              />
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={createForm.startDate ? new Date(createForm.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCreateForm({ ...createForm, startDate: new Date(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <input
                  type="date"
                  value={createForm.endDate ? new Date(createForm.endDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCreateForm({ ...createForm, endDate: new Date(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            <div>
              <input
                type="number"
                value={createForm.position || ''}
                onChange={(e) => setCreateForm({ ...createForm, position: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                placeholder="Position"
              />
              {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
            </div>

            <div>
              <input
                type="text"
                value={createForm.stack?.join(', ') || ''}
                onChange={(e) => handleStackChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                placeholder="Technologies (comma-separated)"
              />
              {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack}</p>}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            {editingId === project.id ? (
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    onKeyDown={(e) => handleKeyPress(e, project.id)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    placeholder="Title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    placeholder="Description"
                    rows={3}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    value={editForm.link || ''}
                    onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    placeholder="Link"
                  />
                  {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    value={editForm.img || ''}
                    onChange={(e) => setEditForm({ ...editForm, img: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    placeholder="Image URL"
                  />
                  {errors.img && <p className="text-red-500 text-sm mt-1">{errors.img}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    value={editForm.type || ''}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    placeholder="Project Type"
                  />
                  {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      value={editForm.startDate ? new Date(editForm.startDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => setEditForm({ ...editForm, startDate: new Date(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                  </div>

                  <div>
                    <input
                      type="date"
                      value={editForm.endDate ? new Date(editForm.endDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => setEditForm({ ...editForm, endDate: new Date(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    />
                    {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                  </div>
                </div>

                <div>
                  <input
                    type="number"
                    value={editForm.position || ''}
                    onChange={(e) => setEditForm({ ...editForm, position: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    placeholder="Position"
                  />
                  {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    value={editForm.stack?.join(', ') || ''}
                    onChange={(e) => handleStackChange(e.target.value, true)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                    placeholder="Technologies (comma-separated)"
                  />
                  {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack}</p>}
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditForm({});
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdate(project.id)}
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {project.description}
                    </p>
                    <div className="mt-2">
                      <strong>Type:</strong> {project.type}
                    </div>
                    <div className="mt-2">
                      <strong>Link:</strong>{" "}
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600">
                        {project.link}
                      </a>
                    </div>
                    <div className="mt-2">
                      <strong>Period:</strong>{" "}
                      {new Date(project.startDate).toLocaleDateString()} -{" "}
                      {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Present"}
                    </div>
                    <div className="mt-2">
                      <strong>Stack:</strong> {project.stack.join(", ")}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-3 py-1 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

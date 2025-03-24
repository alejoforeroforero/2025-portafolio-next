
"use client";

import { Experience } from "@prisma/client";
import { useEffect, useState } from "react";
import { experienceSchema } from "../schemas/experience-schema";
import { DeleteExperience, GetExperiences, UpdateExperience, CreateExperience } from "../actions/experience-actions";
import * as yup from "yup";

export const ExperienceAdmin = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Experience>>({});
  const [createForm, setCreateForm] = useState<Partial<Experience>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCurrentCreate, setIsCurrentCreate] = useState(false);
  const [isCurrentEdit, setIsCurrentEdit] = useState(false);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    const data = await GetExperiences();
    setExperiences(data);
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setEditForm(experience);
    // Si endDate es null, significa que está en curso
    setIsCurrentEdit(experience.endDate === null);
  };

  const handleUpdate = async (id: string) => {
    if (!editForm.title || !editForm.description || !editForm.link) return;

    try {
      const formToValidate = {
        ...editForm,
        endDate: isCurrentEdit ? null : editForm.endDate,
        // Asegurarse de que otros campos requeridos estén presentes
        position: editForm.position || 0,
        stack: editForm.stack || []
      };

      const validatedData = await experienceSchema.validate(formToValidate, { abortEarly: false });
      
      await UpdateExperience({
        ...validatedData,
        id,
        createdAt: editForm.createdAt || new Date(),
        updatedAt: new Date(),
        stack: validatedData.stack.filter((item): item is string => item !== undefined),
        // Asegurarse de que endDate sea null cuando isCurrentEdit es true
        endDate: isCurrentEdit ? null : validatedData.endDate
      });

      setEditingId(null);
      setEditForm({});
      setErrors({});
      await loadExperiences();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
        console.error('Validation error:', error); // Para depuración
      } else {
        console.error('Other error:', error); // Para depuración
      }
    }
  };

  const handleDelete = async (id: string) => {
    await DeleteExperience(id);
    await loadExperiences();
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpdate(id);
    }
    if (e.key === 'Escape') {
      setEditingId(null);
      setEditForm({});
      setErrors({});
    }
  };

  const handleStackChange = (value: string) => {
    const technologies = value.split(',').map(tech => tech.trim());
    setEditForm({ ...editForm, stack: technologies });
  };

  const handleCreate = async () => {
    if (!createForm.title || !createForm.description || !createForm.link) return;

    try {
      const validatedData = await experienceSchema.validate(createForm, { abortEarly: false });
      
      await CreateExperience({
        title: validatedData.title,
        description: validatedData.description,
        link: validatedData.link,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        position: validatedData.position,
        stack: validatedData.stack.filter((item): item is string => item !== undefined),
        img: validatedData.img || null  // Add the img property with null as fallback
      });

      setIsFormVisible(false);
      setCreateForm({});
      setErrors({});
      await loadExperiences();
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
          {isFormVisible ? 'Cancel' : 'Add New Experience'}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
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
                rows={3}
                placeholder="Description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <input
                type="url"
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

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isCurrentCreate}
                    onChange={(e) => {
                      setIsCurrentCreate(e.target.checked);
                      if (e.target.checked) {
                        setCreateForm({ ...createForm, endDate: null });
                      }
                    }}
                    className="mr-2"
                    id="currentCreate"
                  />
                  <label htmlFor="currentCreate">En curso</label>
                </div>
                {!isCurrentCreate && (
                  <input
                    type="date"
                    value={createForm.endDate ? new Date(createForm.endDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCreateForm({ ...createForm, endDate: new Date(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                  />
                )}
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            <div>
              <input
                type="number"
                value={createForm.position || 0}
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
                onChange={(e) => {
                  const technologies = e.target.value.split(',').map(tech => tech.trim());
                  setCreateForm({ ...createForm, stack: technologies });
                }}
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
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editingId === experience.id ? (
                  // Edit mode
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        onKeyDown={(e) => handleKeyPress(e, experience.id)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                        placeholder="Title"
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        onKeyDown={(e) => handleKeyPress(e, experience.id)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                        rows={3}
                        placeholder="Description"
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                      <input
                        type="url"
                        value={editForm.link || ''}
                        onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                        onKeyDown={(e) => handleKeyPress(e, experience.id)}
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

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isCurrentEdit}
                            onChange={(e) => {
                              setIsCurrentEdit(e.target.checked);
                              if (e.target.checked) {
                                setEditForm({ ...editForm, endDate: null });
                              }
                            }}
                            className="mr-2"
                            id="currentEdit"
                          />
                          <label htmlFor="currentEdit">En curso</label>
                        </div>
                        {!isCurrentEdit && (
                          <input
                            type="date"
                            value={editForm.endDate ? new Date(editForm.endDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => setEditForm({ ...editForm, endDate: new Date(e.target.value) })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                          />
                        )}
                        {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                      </div>
                    </div>

                    <div>
                      <input
                        type="number"
                        value={editForm.position || 0}
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
                        onChange={(e) => handleStackChange(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                        placeholder="Technologies (comma-separated)"
                      />
                      {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack}</p>}
                    </div>
                  </div>
                ) : (
                  // View mode
                  <>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {experience.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
                      <div>
                        <strong>Period:</strong>{" "}
                        {new Date(experience.startDate).toLocaleDateString()} -{" "}
                        {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : "Present"}
                      </div>
                      <div>
                        <strong>Position:</strong> {experience.position}
                      </div>
                      <div>
                        <strong>Link:</strong>{" "}
                        <a
                          href={experience.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:text-sky-700"
                        >
                          {experience.link}
                        </a>
                      </div>
                      <div>
                        <strong>Stack:</strong> {experience.stack.join(", ")}
                      </div>
                      {experience.img && (
                        <div>
                          <strong>Image:</strong>{" "}
                          <a
                            href={experience.img}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500 hover:text-sky-700"
                          >
                            View Image
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {editingId === experience.id ? (
                  <button
                    onClick={() => handleUpdate(experience.id)}
                    className="text-sky-500 hover:text-sky-700 transition-colors"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(experience)}
                    className="text-sky-500 hover:text-sky-700 transition-colors"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

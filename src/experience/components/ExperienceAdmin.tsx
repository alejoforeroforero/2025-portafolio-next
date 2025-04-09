
"use client";

import { Experience } from "@prisma/client";
import { useEffect, useState } from "react";
import { experienceSchema } from "../schemas/experience-schema";
import { DeleteExperience, GetExperiences, UpdateExperience, CreateExperience } from "../actions/experience-actions";
import * as yup from "yup";
import toast from 'react-hot-toast';

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
    const loadingToast = toast.loading('Loading experiences...');
    try {
      const data = await GetExperiences();
      setExperiences(data);
      toast.success('Experiences loaded successfully', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to load experiences', { id: loadingToast });
      console.error(error);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setEditForm(experience);
    setIsCurrentEdit(experience.endDate === null);
  };

  const handleUpdate = async (id: string) => {
    if (!editForm.title || !editForm.description || !editForm.link) return;

    const updateToast = toast.loading('Updating experience...');
    try {
      const formToValidate = {
        ...editForm,
        endDate: isCurrentEdit ? null : editForm.endDate,
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
        endDate: isCurrentEdit ? null : validatedData.endDate
      });

      setEditingId(null);
      setEditForm({});
      setErrors({});
      await loadExperiences();
      toast.success('Experience updated successfully', { id: updateToast });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Validation error', { id: updateToast });
      } else {
        toast.error('Failed to update experience', { id: updateToast });
      }
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const deleteToast = toast.loading('Deleting experience...');
    try {
      await DeleteExperience(id);
      await loadExperiences();
      toast.success('Experience deleted successfully', { id: deleteToast });
    } catch (error) {
      toast.error('Failed to delete experience', { id: deleteToast });
      console.error(error);
    }
  };


  const handleCreate = async () => {
    if (!createForm.title || !createForm.description || !createForm.link) return;

    const createToast = toast.loading('Creating experience...');
    try {
      const formToValidate = {
        ...createForm,
        position: createForm.position || 0,  // Set default position to 0 if not provided
        stack: createForm.stack || [],       // Ensure stack is initialized
      };

      const validatedData = await experienceSchema.validate(formToValidate, { abortEarly: false });
      
      await CreateExperience({
        title: validatedData.title,
        description: validatedData.description,
        link: validatedData.link,
        startDate: validatedData.startDate,
        endDate: isCurrentCreate ? null : validatedData.endDate,
        position: validatedData.position,
        stack: validatedData.stack.filter((item): item is string => item !== undefined),
        img: validatedData.img || null
      });

      setIsFormVisible(false);
      setCreateForm({});
      setErrors({});
      await loadExperiences();
      toast.success('Experience created successfully', { id: createToast });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Validation error', { id: createToast });
      } else {
        toast.error('Failed to create experience', { id: createToast });
      }
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-8 max-w-[1100px] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Experiences</h2>
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Experience
        </button>
      </div>

      {/* Create Experience Form */}
      {isFormVisible && (
        <div className="mb-8 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Create New Experience</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Title</label>
              <input
                type="text"
                value={createForm.title || ''}
                onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300">Description</label>
              <textarea
                value={createForm.description || ''}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Link</label>
              <input
                type="url"
                value={createForm.link || ''}
                onChange={(e) => setCreateForm({ ...createForm, link: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
              />
              {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Start Date</label>
                <input
                  type="date"
                  value={createForm.startDate ? new Date(createForm.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCreateForm({ ...createForm, startDate: new Date(e.target.value) })}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">End Date</label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={createForm.endDate && !isCurrentCreate ? new Date(createForm.endDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCreateForm({ ...createForm, endDate: new Date(e.target.value) })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                    disabled={isCurrentCreate}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="currentPosition"
                      checked={isCurrentCreate}
                      onChange={(e) => {
                        setIsCurrentCreate(e.target.checked);
                        if (e.target.checked) {
                          setCreateForm({ ...createForm, endDate: null });
                        }
                      }}
                      className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor="currentPosition" className="ml-2 text-sm text-gray-300">
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
                value={createForm.position || ''}
                onChange={(e) => setCreateForm({ ...createForm, position: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                min="0"
                placeholder="0"
              />
              {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Technologies (comma-separated)</label>
              <input
                type="text"
                value={createForm.stack?.join(', ') || ''}
                onChange={(e) => setCreateForm({ ...createForm, stack: e.target.value.split(',').map(t => t.trim()) })}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                placeholder="React, TypeScript, Node.js"
              />
              {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack}</p>}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Create Experience
              </button>
              <button
                onClick={() => {
                  setIsFormVisible(false);
                  setCreateForm({});
                  setErrors({});
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="p-6 bg-gray-800 rounded-lg">
            {editingId === experience.id ? (
              // Edit Form
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-100">Edit Experience</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(experience.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditForm({});
                        setErrors({});
                      }}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                      rows={3}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">Link</label>
                    <input
                      type="url"
                      value={editForm.link || ''}
                      onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                    />
                    {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">Start Date</label>
                      <input
                        type="date"
                        value={editForm.startDate ? new Date(editForm.startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setEditForm({ ...editForm, startDate: new Date(e.target.value) })}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                      />
                      {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300">End Date</label>
                      <div className="space-y-2">
                        <input
                          type="date"
                          value={editForm.endDate && !isCurrentEdit ? new Date(editForm.endDate).toISOString().split('T')[0] : ''}
                          onChange={(e) => setEditForm({ ...editForm, endDate: new Date(e.target.value) })}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                          disabled={isCurrentEdit}
                        />
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`currentPosition-${experience.id}`}
                            checked={isCurrentEdit}
                            onChange={(e) => {
                              setIsCurrentEdit(e.target.checked);
                              if (e.target.checked) {
                                setEditForm({ ...editForm, endDate: null });
                              }
                            }}
                            className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                          />
                          <label htmlFor={`currentPosition-${experience.id}`} className="ml-2 text-sm text-gray-300">
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
                      value={editForm.position || ''}
                      onChange={(e) => setEditForm({ ...editForm, position: parseInt(e.target.value) })}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                      min="0"
                    />
                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={editForm.stack?.join(', ') || ''}
                      onChange={(e) => setEditForm({ ...editForm, stack: e.target.value.split(',').map(t => t.trim()) })}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                      placeholder="React, TypeScript, Node.js"
                    />
                    {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">Image URL (optional)</label>
                    <input
                      type="url"
                      value={editForm.img || ''}
                      onChange={(e) => setEditForm({ ...editForm, img: e.target.value })}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Display Mode
              <div className="flex justify-between items-start">
                <div className="space-y-4 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">{experience.title}</h3>
                      <p className="text-gray-400 mt-1">
                        {new Date(experience.startDate).toLocaleDateString()} - {' '}
                        {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(experience)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(experience.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400">{experience.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-300">Position:</span>
                      <span className="text-gray-400">{experience.position}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-300">Link:</span>
                      <a 
                        href={experience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {experience.link}
                      </a>
                    </div>

                    {experience.img && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-300">Image URL:</span>
                        <span className="text-gray-400">{experience.img}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                      {experience.stack.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

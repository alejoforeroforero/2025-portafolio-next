
"use client";

import { Experience } from "@prisma/client";
import { useEffect, useState } from "react";
import { experienceSchema } from "../schemas/experience-schema";
import { DeleteExperience, GetExperiences, UpdateExperience, CreateExperience } from "../../../actions/experience-actions";
import * as yup from "yup";
import toast from 'react-hot-toast';
import { ExperienceForm } from "./ExperienceForm";
import { ExperienceCard } from "./ExperienceCard";

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
    try {
      const data = await GetExperiences();
      setExperiences(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setEditForm(experience);
    setIsCurrentEdit(experience.endDate === null);
  };

  const handleUpdate = async (id: string) => {
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
      handleValidationError(error, updateToast);
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
    const createToast = toast.loading('Creating experience...');
    try {
      const formToValidate = {
        ...createForm,
        position: createForm.position || 0,
        stack: createForm.stack || [],
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
      handleValidationError(error, createToast);
    }
  };

  const handleValidationError = (error: unknown, toastId: string) => {
    if (error instanceof yup.ValidationError) {
      const newErrors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors);
      toast.error('Validation error', { id: toastId });
    } else {
      toast.error('Failed to process request', { id: toastId });
    }
    console.error(error);
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
          <ExperienceForm
            form={createForm}
            setForm={setCreateForm}
            errors={errors}
            isCurrentPosition={isCurrentCreate}
            setIsCurrentPosition={setIsCurrentCreate}
          />
          <div className="flex items-center gap-4 mt-4">
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
      )}

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="p-6 bg-gray-800 rounded-lg">
            {editingId === experience.id ? (
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
                <ExperienceForm
                  form={editForm}
                  setForm={setEditForm}
                  errors={errors}
                  isCurrentPosition={isCurrentEdit}
                  setIsCurrentPosition={setIsCurrentEdit}
                  experienceId={experience.id}
                />
              </div>
            ) : (
              <ExperienceCard
                experience={experience}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

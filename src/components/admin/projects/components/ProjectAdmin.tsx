import type { Project } from "@prisma/client";
import { useEffect, useState } from "react";
import { projectSchema } from "../schemas/project-schema";
import { DeleteProject, GetProjects, UpdateProject, CreateProject } from "../../../actions/project-actions";
import * as yup from "yup";
import toast from 'react-hot-toast';
import { ProjectForm } from "./ProjectForm";
import { ProjectCard } from "./ProjectCard";

export const ProjectAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [createForm, setCreateForm] = useState<Partial<Project>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCurrentProject, setIsCurrentProject] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await GetProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm(project);
    setIsCurrentProject(project.endDate === null);
  };

  const handleUpdate = async (id: string) => {
    const updateToast = toast.loading('Updating project...');
    try {
      const formToValidate = {
        ...editForm,
        endDate: isCurrentProject ? null : editForm.endDate,
        position: editForm.position || 0,
        stack: editForm.stack || []
      };

      const validatedData = await projectSchema.validate(formToValidate, { abortEarly: false });
      
      await UpdateProject({
        ...validatedData,
        id,
        createdAt: editForm.createdAt || new Date(),
        updatedAt: new Date(),
        stack: validatedData.stack.filter((item): item is string => item !== undefined),
        endDate: isCurrentProject ? null : validatedData.endDate || null,
        description: validatedData.description || null,
        link: validatedData.link || null,
        startDate: validatedData.startDate || null,
        img: validatedData.img || null,
        type: validatedData.type || null
      });

      setEditingId(null);
      setEditForm({});
      setErrors({});
      await loadProjects();
      toast.success('Project updated successfully', { id: updateToast });
    } catch (error) {
      handleValidationError(error, updateToast);
    }
  };

  const handleDelete = async (id: string) => {
    const deleteToast = toast.loading('Deleting project...');
    try {
      await DeleteProject(id);
      await loadProjects();
      toast.success('Project deleted successfully', { id: deleteToast });
    } catch (error) {
      toast.error('Failed to delete project', { id: deleteToast });
      console.error(error);
    }
  };

  const handleCreate = async () => {
    const createToast = toast.loading('Creating project...');
    try {
      const formToValidate = {
        ...createForm,
        position: createForm.position || 0,
        stack: createForm.stack || [],
      };

      const validatedData = await projectSchema.validate(formToValidate, { abortEarly: false });
      
      await CreateProject({
        title: validatedData.title,
        description: validatedData.description || null,
        link: validatedData.link || null,
        startDate: validatedData.startDate || null,
        endDate: isCurrentProject ? null : validatedData.endDate || null,
        position: validatedData.position,
        stack: validatedData.stack.filter((item): item is string => item !== undefined),
        img: validatedData.img || null,
        type: validatedData.type || null,
      });

      setIsFormVisible(false);
      setCreateForm({});
      setErrors({});
      await loadProjects();
      toast.success('Project created successfully', { id: createToast });
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
        <h2 className="text-2xl font-bold text-gray-100">Projects</h2>
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Project
        </button>
      </div>

      {/* Create Project Form */}
      {isFormVisible && (
        <div className="mb-8 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Create New Project</h3>
          <ProjectForm
            form={createForm}
            setForm={setCreateForm}
            errors={errors}
            isCurrentProject={isCurrentProject}
            setIsCurrentProject={setIsCurrentProject}
          />
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Create Project
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

      {/* Project List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="p-6 bg-gray-800 rounded-lg">
            {editingId === project.id ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-100">Edit Project</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(project.id)}
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
                <ProjectForm
                  form={editForm}
                  setForm={setEditForm}
                  errors={errors}
                  isCurrentProject={isCurrentProject}
                  setIsCurrentProject={setIsCurrentProject}
                  projectId={project.id}
                />
              </div>
            ) : (
              <ProjectCard
                project={project}
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

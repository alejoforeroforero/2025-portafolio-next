"use client";

import { User } from "@prisma/client";
import { UpdateUser } from "../actions/user-actions";
import { useState } from "react";
import { TextEditor } from "@/text-editor/TextEditor";

interface Props {
  initialUser: User;
}

export const ProfileAdmin = ({ initialUser }: Props) => {
  const [editForm, setEditForm] = useState<Partial<User>>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState(initialUser.text || "");

  const handleUpdate = async () => {
    if (!editForm.name || !editForm.profile) return;

    await UpdateUser({
      ...initialUser,
      name: editForm.name,
      profile: editForm.profile,
      text: editorContent, // Use the editorContent state instead
    });

    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUpdate();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditForm(initialUser);
    }
  };

  return (
    <div className="w-full mt-8 max-w-[1100px] mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Profile Details
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sky-500 hover:text-sky-700 transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={editForm.name || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Perfil
              </label>
              <textarea
                value={editForm.profile || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, profile: e.target.value })
                }
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Texto
              </label>
              <TextEditor 
                initialContent={editForm.text}
                onChange={(content) => setEditorContent(content)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(initialUser);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {editForm.name}
              </h3>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {editForm.profile}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {editForm.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

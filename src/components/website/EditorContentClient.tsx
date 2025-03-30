"use client";

import { showEditorContent } from "@/text-editor/react-components/showEditorContent";

interface EditorContentClientProps {
  content: string;
}

export function EditorContentClient({ content }: EditorContentClientProps) {
  return <>{content ? showEditorContent(content) : null}</>;
}
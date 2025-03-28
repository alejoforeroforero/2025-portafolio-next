
"use client";

import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {  createCommand, LexicalCommand } from "lexical";

// Creamos un comando personalizado
export const PRUEBA_COMMAND: LexicalCommand<void> = createCommand('PRUEBA_COMMAND');

interface PruebaBotonProps {
  isEditable: boolean;
}

export const PruebaBoton = ({ isEditable }: PruebaBotonProps) => {
  const [editor] = useLexicalComposerContext();

  const handleClick = useCallback(() => {
    editor.dispatchCommand(PRUEBA_COMMAND, undefined);
  }, [editor]);

  return (
    <button
      disabled={!isEditable}
      onClick={handleClick}
      className="toolbar-item spaced"
      aria-label="Botón de prueba"
      title="Botón de prueba"
      type="button"
    >
      <i className="format link" />
    </button>
  );
};


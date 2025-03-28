"use client";

import type { JSX } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { PRUEBA_COMMAND } from "../ToolbarPlugin/components/PruebaBoton";
import {
  COMMAND_PRIORITY_NORMAL,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { getCurrentUser } from "./actions";

import { $createPruebaNode } from "@/text-editor/nodes/PruebaNode";

export default function PruebaPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserName(user.name);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const removeCommand = editor.registerCommand(
      PRUEBA_COMMAND,
      () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const pruebaNode = $createPruebaNode(`Bienvenido, ${userName} jaja`);
            selection.insertNodes([pruebaNode]);
          }
        });
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );

    return () => {
      removeCommand();
    };
  }, [editor, userName]);

  return null;
}

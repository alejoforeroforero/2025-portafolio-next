/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
            const pruebaNode = $createPruebaNode(`Bienvenido, ${userName}`);
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

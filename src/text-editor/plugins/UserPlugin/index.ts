/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../actions/user-plugin-actions";
import { $createUserNode, UserNode } from "../../nodes/UserNode";

export const INSERT_USER_COMMAND: LexicalCommand<string> = createCommand(
  "INSERT_USER_COMMAND"
);

export default function UserPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [userData, setUserData] = useState<{
    id: string;
    email: string;
    name: string;
    profile: string;
    occupation?: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserData({
          ...user,
          occupation: user.occupation || undefined
        });
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!editor.hasNodes([UserNode])) {
      throw new Error("UserPlugin: UserNode not registered on editor");
    }

    return editor.registerCommand<string>(
      INSERT_USER_COMMAND,
      () => {
        if (userData) {
          const userNode = $createUserNode(JSON.stringify(userData));
          $insertNodeToNearestRoot(userNode);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, userData]);

  return null;
}

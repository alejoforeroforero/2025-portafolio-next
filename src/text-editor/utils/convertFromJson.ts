import { LexicalEditor, SerializedEditorState } from "lexical";
import { getUserById } from '../actions/user-plugin-actions';

interface SerializedUserNode {
  type: 'user';
  userId: string;
}

function isUserNode(node: { type?: string; userId?: string }): node is SerializedUserNode {
  return node.type === 'user' && 'userId' in node;
}

export const DEFAULT_CONTENT: SerializedEditorState = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Tu contenido aquí",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

export async function loadContent(
  editor: LexicalEditor,
  serializedContent: SerializedEditorState
) {
  const updatedContent = await rebuildJson(serializedContent);
  
  editor.update(() => {
    const state = editor.parseEditorState(JSON.stringify(updatedContent));
    editor.setEditorState(state);
  });
}

async function rebuildJson(serializedContent: SerializedEditorState) {
  // Traverse through all children recursively
  if (serializedContent.root?.children) {
    for (let i = 0; i < serializedContent.root.children.length; i++) {
      const node = serializedContent.root.children[i];

      //Here we must add all dynamic nodes
      
      if (isUserNode(node)) {
        try {
          // Parse the existing userId JSON string
          const userData = JSON.parse(node.userId);
          // Fetch fresh user data from database
          const updatedUser = await getUserById(userData.id);
          
          if (updatedUser) {
            // Update the userId with fresh data
            node.userId = JSON.stringify({
              id: updatedUser.id,
              name: updatedUser.name,
              email: updatedUser.email,
              occupation: updatedUser.occupation,
              profile: updatedUser.profile
            });
          }
        } catch (error) {
          console.error('Error updating user node:', error);
        }
      }
    }
  }
  return serializedContent;
}

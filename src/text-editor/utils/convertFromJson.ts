import { LexicalEditor, SerializedEditorState } from 'lexical';


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
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
};

export function loadContent(editor: LexicalEditor, serializedContent: SerializedEditorState) {
  editor.update(() => {
    const state = editor.parseEditorState(JSON.stringify(serializedContent));
    editor.setEditorState(state);
  });
}

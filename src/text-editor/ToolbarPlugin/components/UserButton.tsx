import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_USER_COMMAND } from "../../plugins/UserPlugin";

export function UserButton() {

    const [editor] = useLexicalComposerContext();

    const handleOnClick = () => {
        editor.dispatchCommand(INSERT_USER_COMMAND, "default-user");
    };

  return (
    <button
      className="toolbar-item spaced"
      aria-label="Insert user"
      title="Insert user"
      type="button"
      onClick={handleOnClick}
    >
      <span>UG</span>
    </button>
  );
}

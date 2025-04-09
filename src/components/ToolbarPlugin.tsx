import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, INSERT_LINE_BREAK_COMMAND } from 'lexical';
import Image from 'next/image';

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const insertLineBreak = () => {
    editor.dispatchCommand(INSERT_LINE_BREAK_COMMAND, false);
  };

  return (
    <div className="flex gap-2 p-2 border-b border-gray-300 dark:border-gray-700">
      <button
        onClick={formatBold}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        title="Bold"
      >
        <Image
          src="/icons/type-bold.svg"
          alt="Bold"
          width={16}
          height={16}
        />
      </button>
      <button
        onClick={insertLineBreak}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        title="Line Break"
      >
        <Image
          src="/icons/text-paragraph.svg"
          alt="Line Break"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}

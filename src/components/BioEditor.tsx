import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
// import { ToolbarPlugin } from './ToolbarPlugin';
import { ToolbarPlugin } from './ToolbarPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

const theme = {
  paragraph: 'mb-2',
  text: {
    bold: 'font-bold',
  }
};

const initialConfig = {
  namespace: 'BioEditor',
  theme,
  onError: (error: Error) => console.error(error),
};

interface BioEditorProps {
  onChange: (html: string) => void;
  initialContent?: string;
}

export function BioEditor({ onChange, initialContent }: BioEditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-gray-300 rounded-md dark:border-gray-700">
        <ToolbarPlugin />
        <div className="relative p-4">
          <RichTextPlugin
            contentEditable={
              <ContentEditable 
                className="min-h-[150px] outline-none"
              />
            }
            placeholder={
              <div className="absolute top-[15px] left-[15px] text-gray-400">
                Enter your bio...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}

interface BioEditorProps {
  onChange: (html: string) => void;
  initialContent?: string;
}

export function BioEditor({ onChange, initialContent }: BioEditorProps) {
  return (
    <textarea
      className="w-full min-h-[150px] p-4 border border-gray-300 rounded-md dark:border-gray-700 outline-none"
      placeholder="Enter your bio..."
      value={initialContent}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

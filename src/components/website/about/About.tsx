import { convertToHTMLDynamic } from "@/components/admin/profile/components/text-editor/utils/convertToHTMLDynamic";

interface AboutProps {
  bio: string | undefined | null;
}

export default function About({ bio }: AboutProps) {
  if (!bio) {
    return (
      <div className="max-w-4xl pt-4 lg:pt-20 p-8">
        <div className="prose prose-invert">
          <p className="text-gray-400">No bio available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl pt-4 lg:pt-20 p-8">
      <div className="prose prose-invert">
        {convertToHTMLDynamic(bio)}
      </div>
    </div>
  );
}

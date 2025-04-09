import { getWebsiteUser } from "@/components/website/actions/website-actions";
import { convertToHTMLDynamic } from "@/components/admin/profile/components/text-editor/utils/convertToHTMLDynamic";

export default async function About() {
  const profile = await getWebsiteUser();
 
  return (
    <div className="max-w-4xl p-[60px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        About
      </h1>

      <div className="prose dark:prose-invert">
        {profile?.bio && convertToHTMLDynamic(profile.bio)}
      </div>
    </div>
  );
}

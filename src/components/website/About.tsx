import { getWebsiteUser } from "./actions/website-actions";
import { EditorContentClient } from "./EditorContentClient";

export default async function About() {
  const user = await getWebsiteUser();

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl p-[60px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        About
      </h1>

      <div className="prose dark:prose-invert">
        <EditorContentClient content={user.text} />
      </div>
    </div>
  );
}


import { getWebsiteUser } from "./actions/website-actions";


export default async function Header() {
  const user = await getWebsiteUser();

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl">
      <h3 className="text-5xl font-semibold mb-2">{user.name}</h3>
      {user.occupation && (
        <p className="text-gray-100 text-2xl dark:text-gray-300 mb-4">{user.occupation}</p>
      )}
      <div className="prose dark:prose-invert">
        <div className="mb- text-gray-10">{user.profile}</div>
      </div>
    </div>
  );
}

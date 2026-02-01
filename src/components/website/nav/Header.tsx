import type { Profile } from "@prisma/client";

interface HeaderProps {
  profile: Profile | null;
}

export default function Header({ profile }: HeaderProps) {
  return (
    <div className="max-w-4xl">
      <h1 className="text-5xl font-bold mb-4 text-gray-100 text-center lg:text-left">
        {profile?.name}
      </h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-300 text-center lg:text-left">
        {profile?.title}
      </h2>
      <p className="text-lg text-gray-400 text-center lg:text-left">
        {profile?.tagline}
      </p>
    </div>
  );
}

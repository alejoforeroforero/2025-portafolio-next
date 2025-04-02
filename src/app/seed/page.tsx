
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export default async function SeedPage() {
  try {
    // Check if any user exists
    const existingUser = await prisma.user.findFirst();
    
    if (existingUser) {
      return (
        <div className="p-8 text-yellow-600">
          <h1 className="text-xl font-bold mb-4">Database already seeded</h1>
          <p>A user already exists in the database. Cannot create initial admin user.</p>
        </div>
      );
    }

    const email = process.env.USER_EMAIL;
    const name = process.env.USER_NAME;
    const password = process.env.USER_PASSWORD;

    if (!email || !name || !password) {
      return (
        <div className="p-8 text-red-600">
          <h1 className="text-xl font-bold mb-4">Error seeding database</h1>
          <p>Missing environment variables. Please check .env file.</p>
        </div>
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profile: 'Full Stack Developer',
        text: 'Initial admin user'
      }
    });

    return (
      <div className="p-8">
        <h1 className="text-xl font-bold mb-4">Database seeded successfully!</h1>
        <p>Created admin user with:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Email: {email}</li>
          <li>Name: {name}</li>
          <li>Password: [Hidden for security]</li>
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Seeding error:', error);
    return (
      <div className="p-8 text-red-600">
        <h1 className="text-xl font-bold mb-4">Error seeding database</h1>
        <p>{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
      </div>
    );
  }
}

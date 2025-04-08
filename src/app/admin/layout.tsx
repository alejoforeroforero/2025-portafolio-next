import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing content",
};


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Toaster 
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#059669',
              secondary: '#FFFAEE',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#DC2626',
              secondary: '#FFFAEE',
            },
          },
        }}
      />
      {children}
    </div>
  );
}

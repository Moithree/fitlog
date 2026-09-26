import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlanProvider } from '@/context/PlanContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'FitLog — Dark, No-Nonsense Gym Companion',
  description: 'Pick a lift, lock it into today\'s plan, and watch the week\'s work add up.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-neutral-100 min-h-screen flex flex-col antialiased">
        <PlanProvider>
          <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
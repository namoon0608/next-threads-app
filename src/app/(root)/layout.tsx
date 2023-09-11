import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/shared/Navbar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import Footer from '@/components/shared/Footer';
import { dark } from '@clerk/themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Threads',
    description: 'Next 13 Meta Threads Application',
    icons: '/assets/logo-white.svg',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en">
                <body className={inter.className}>
                    <Navbar />
                    <main className="flex flex-row">
                        <LeftSideBar />
                        <section className="main-container">
                            <div className="w-full max-w-4xl">{children}</div>
                        </section>
                        <RightSideBar />
                    </main>

                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}

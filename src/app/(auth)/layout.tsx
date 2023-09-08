import { ClerkProvider } from '@clerk/nextjs';
import { Noto_Sans_TC } from 'next/font/google';
import '@/app/globals.css';

export const metadata = {
    title: 'Threads',
    description: 'Next 13 Meta Threads Application',
};

const NotoSansTC = Noto_Sans_TC({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${NotoSansTC.className} bg-dark-1`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}

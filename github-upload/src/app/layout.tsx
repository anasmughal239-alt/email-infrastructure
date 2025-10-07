import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import AuthProvider from '@/components/providers/session-provider';
import { PageTransitionWrapper } from '@/components/navigation/page-transition-wrapper';
import { CSSOptimizer } from '@/components/css-optimizer';
import { CSSPreloader } from '@/components/css-preloader';
import { generateMetadata, pageMetadata } from '@/lib/metadata';

const inter = Inter({ subsets: ['latin'] });

export const metadata = generateMetadata(pageMetadata.home);

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CSSOptimizer />
        <CSSPreloader />
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="pt-16">
              <PageTransitionWrapper>
                {children}
              </PageTransitionWrapper>
            </div>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
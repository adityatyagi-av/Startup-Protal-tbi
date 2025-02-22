'use client';
import { usePathname } from 'next/navigation';
import localFont from 'next/font/local';
import './globals.css';
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Check from '@/utils/validateToken';

// Load local fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster/>
        <Provider
          store={store}
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Check></Check>
          {' '}
          
          
          {children}
        </Provider>
      </body>
    </html>
  );
}

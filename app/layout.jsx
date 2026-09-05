import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Aditya Potdar | Developer OS Portfolio',
  description:
    'Twitter/X-inspired living portfolio of Aditya Potdar — Full Stack Developer, competitive programmer, AI builder.',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Aditya Potdar | Developer OS',
    description:
      'A living developer timeline — projects, skills, and achievements presented as a developer operating system.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

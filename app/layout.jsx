import './globals.css';

export const metadata = {
  title: 'Aditya Potdar | Developer OS Portfolio',
  description:
    'Twitter/X-inspired living portfolio of Aditya Potdar — Full Stack Developer, competitive programmer, AI builder.',
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

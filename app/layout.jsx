import './globals.css';

export const metadata = {
  title: 'Aditya Potdar | Developer OS Portfolio',
  description: 'Twitter/X-inspired living portfolio of Aditya Potdar with AI, live stats, and immersive animations.',
  openGraph: {
    title: 'Aditya Potdar Portfolio',
    description: 'Developer × Tech × Futuristic portfolio experience',
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

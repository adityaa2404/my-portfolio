import './globals.css';

export const metadata = {
  title: "Aditya Potdar | Portfolio",
  description: "Building, solving, and exploring technology.",

  openGraph: {
    title: "Aditya Potdar | Portfolio",
    description: "Building, solving, and exploring technology.",
    url: "https://adityaa2404.vercel.app",
    siteName: "Aditya Potdar",
    images: [
      {
        url: "https://adityaa2404.vercel.app/og.png",
        width: 1200,
        height: 627,
        alt: "Aditya Potdar Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aditya Potdar | Portfolio",
    description: "Building, solving, and exploring technology.",
    images: ["https://adityaa2404.vercel.app/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import PortfolioShell from '../components/PortfolioShell';

export const metadata = {
  title: 'Aditya Potdar | Full-Stack Developer & AI Builder',
  description:
    'Explore Aditya Potdar’s developer profile, projects, GitHub contributions, LeetCode activity, and AI systems work.',
  openGraph: {
    title: 'Aditya Potdar | Full-Stack Developer & AI Builder',
    description:
      'Projects, technical skills, GitHub contributions, LeetCode activity, and AI systems work.',
    url: '/profile',
    type: 'profile',
    images: [
      {
        url: '/image.png',
        width: 420,
        height: 420,
        alt: 'Aditya Potdar',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Aditya Potdar | Full-Stack Developer & AI Builder',
    description: 'Developer profile, projects, GitHub contributions, and LeetCode activity.',
    images: ['/image.png'],
  },
};

export default function ProfilePage() {
  return <PortfolioShell />;
}

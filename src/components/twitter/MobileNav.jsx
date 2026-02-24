import { FiHome, FiHash, FiCpu, FiUser } from 'react-icons/fi';

export default function MobileNav({ navigate, onOpenGrok }) {
  return (
    <>
      <div className="mobile-bottom">
        <button onClick={() => navigate('/')}><FiHome /></button>
        <button onClick={() => navigate('/projects')}><FiHash /></button>
        <button onClick={onOpenGrok}><FiCpu /></button>
        <button onClick={() => navigate('/profile')}><FiUser /></button>
      </div>
      <button className="floating-btn">+</button>
    </>
  );
}

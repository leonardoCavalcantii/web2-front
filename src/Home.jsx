import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Home() {
  const [userName, setUserName] = useState('Usuário');

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h1 className="page-title" style={{ fontSize: '32px', fontWeight: '700', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center', marginBottom: 40 }}>🎮 Game Reviews</h1>
        <div className="auth-card" style={{ background: 'white', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#2d3748', fontSize: '24px', fontWeight: '700', marginBottom: 10 }}>Bem-vindo! 👋</h2>
          <p style={{ color: '#718096', fontSize: '16px', marginBottom: 40 }}>O que você gostaria de fazer?</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Link to="/create-post" style={{ textDecoration: 'none' }}>
              <button className="btn" style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize: '16px', fontWeight: '700', padding: '14px', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer', color: 'white' }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}>
                ➕ Criar Review
              </button>
            </Link>

            <Link to="/search-posts" style={{ textDecoration: 'none' }}>
              <button className="btn" style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize: '16px', fontWeight: '700', padding: '14px', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer', color: 'white' }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}>
                🔍 Explorar Jogos
              </button>
            </Link>

            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="btn" style={{ width: '100%', background: 'linear-gradient(135deg, #a8a8a8 0%, #6b6b6b 100%)', fontSize: '16px', fontWeight: '700', padding: '14px', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer', color: 'white' }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}>
                🚪 Sair
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

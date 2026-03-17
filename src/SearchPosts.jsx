import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function SearchPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Carregar todos os posts ao montar o componente
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtrar posts quando o termo de busca muda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          (post.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://web2-back-production.up.railway.app/api/posts'
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPosts(data);
        setFilteredPosts(data);
        setMessage('');
      } else {
        setMessage('Erro ao carregar posts');
        setPosts([]);
        setFilteredPosts([]);
      }
    } catch (err) {
      setMessage('Erro ao conectar com API');
      setPosts([]);
      setFilteredPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <h1 className="page-title" style={{ fontSize: '32px', fontWeight: '700', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 10 }}>🎮 Pesquisar Jogos</h1>
        
        <div className="auth-card" style={{ width: '100%', background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
          <div style={{ marginBottom: 25 }}>
            <div className="field-label" style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Pesquisar por jogo ou review</div>
            <input
              className="input"
              placeholder="Digite o nome do jogo ou palavras-chave..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '8px', border: '2px solid transparent', transition: 'all 0.3s ease' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn" onClick={fetchPosts} disabled={loading} style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize: '15px', fontWeight: '600', letterSpacing: '0.5px', transition: 'transform 0.2s, boxShadow 0.2s', cursor: 'pointer' }}>
              {loading ? '⏳ Carregando...' : '🔄 Atualizar'}
            </button>
            <Link to="/home" style={{ flex: 1 }}>
              <button className="btn" type="button" style={{ background: 'linear-gradient(135deg, #a8a8a8 0%, #6b6b6b 100%)', width: '100%', fontSize: '15px', fontWeight: '600', letterSpacing: '0.5px' }}>
                ← Voltar
              </button>
            </Link>
          </div>

          {message && (
            <div className="msg error" style={{ marginTop: 15, background: '#fee', border: '1px solid #fcc', borderRadius: '8px', padding: '10px 15px', color: '#c33' }}>
              {message}
            </div>
          )}
        </div>

        {loading && !posts.length ? (
          <div className="auth-card" style={{ width: '100%', textAlign: 'center', padding: 60, background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
            <p style={{ color: '#667eea', fontSize: '18px', fontWeight: '600' }}>⏳ Carregando posts...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div style={{ width: '100%' }}>
            <p style={{ color: '#667eea', marginBottom: 20, fontSize: '16px', fontWeight: '600', textAlign: 'center', background: 'rgba(102, 126, 234, 0.1)', padding: '12px', borderRadius: '8px' }}>
              📊 {filteredPosts.length} resultado{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
              {filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="auth-card"
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: 25,
                    alignItems: 'flex-start',
                    width: '100%',
                    background: 'white',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Imagem do lado esquerdo */}
                  {post.image && (
                    <div style={{ minWidth: 160, flexShrink: 0 }}>
                      <img
                        src={post.image}
                        alt={post.name}
                        style={{
                          width: '160px',
                          height: '160px',
                          borderRadius: '10px',
                          objectFit: 'cover',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                        }}
                      />
                    </div>
                  )}

                  {/* Conteúdo do lado direito */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginTop: 0, marginBottom: 12, color: '#2d3748', fontSize: '20px', fontWeight: '700' }}>
                      {post.name ?? "The super jilherme adventures"}
                    </h3>
                    
                    {/* Rating com estrelas */}
                    <div style={{ marginBottom: 15, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ fontSize: '18px', letterSpacing: '2px' }}>
                        {'★'.repeat(post.rating)}
                        {'☆'.repeat(5 - post.rating)}
                      </div>
                      <span style={{ color: '#FFD700', fontWeight: '700', fontSize: '15px', background: 'rgba(255, 215, 0, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                        {post.rating}/5
                      </span>
                    </div>

                    {/* Review */}
                    <p style={{ color: '#4a5568', margin: '12px 0', lineHeight: 1.7, fontSize: '14px' }}>
                      {post.content?.substring(0, 220)}
                      {post.content.length > 220 ? '...' : ''}
                    </p>

                    {/* Data */}
                    <p style={{ color: '#a0aec0', margin: '12px 0 0 0', fontSize: '12px', fontWeight: '500' }}>
                      📅 {new Date(post.createdAt || post.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="auth-card" style={{ width: '100%', textAlign: 'center', padding: 50, background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderRadius: '12px', color: '#cbd5e0' }}>
            <p style={{ fontSize: '48px', marginBottom: 15 }}>
              {searchTerm ? '🔍' : '📭'}
            </p>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#667eea' }}>
              {searchTerm ? 'Nenhum jogo encontrado' : 'Nenhum post disponível'}
            </p>
            {searchTerm && (
              <p style={{ fontSize: '14px', color: '#a0aec0', marginTop: 10 }}>Tente outra busca ou palavras diferentes.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

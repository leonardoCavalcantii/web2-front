import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

export default function CreatePost() {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setOk(false);
      setMessage('Por favor, selecione uma classificação em estrelas');
      return;
    }

    if (!imageFile) {
      setOk(false);
      setMessage('Por favor, selecione uma imagem do jogo');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', imageFile);
      formData.append('review', review);
      formData.append('rating', rating);
      
      console.log(formData);

      const token = `Bearer ${localStorage.getItem("token")}`;
      console.log(token);
      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);
      const newBody = {
          gameId: 1,
          userId: user.id,
          rating,
          content: review
        };
      console.log(JSON.stringify(newBody));
      const response = await fetch('https://web2-back-production.up.railway.app/api/posts', {
      //const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': token,
          //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbnpvQGVtYWlsLmNvbSIsImlhdCI6MTc3MzcwOTQ2NCwiZXhwIjoxNzczNzQ1NDY0fQ.eaPGRMJH3VtlgMaa9Md1X-SzkabU9JxB5p3OL5eT79g',
          'Content-Type': 'application/json'
        },
        //body: formData,
          body: JSON.stringify(newBody)
      });

      const data = await response.json();

      if (response.ok) {
        setOk(true);
        setMessage('Post criado com sucesso!');
        setName('');
        setImageFile(null);
        setImagePreview('');
        setReview('');
        setRating(0);
        setTimeout(() => navigate('/home'), 1500);
      } else {
        setOk(false);
        setMessage(data.message || 'Erro ao criar post');
      }
    } catch (err) {
      setOk(false);
      setMessage('Erro ao conectar com API');
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="page-title" style={{ fontSize: '32px', fontWeight: '700', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 40 }}>✍️ Criar Review</h1>
        <div className="auth-card" style={{ background: 'white', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '40px', width: '100%' }}>
          <form onSubmit={handleSubmit} className="auth-form">
            <div style={{ marginBottom: 25 }}>
              <div className="field-label" style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Nome do Jogo</div>
              <input
                className="input"
                placeholder="Ex: The Legend of Zelda..."
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ borderRadius: '8px', border: '2px solid rgba(102, 126, 234, 0.2)', padding: '12px' }}
              />
            </div>

            <div style={{ marginBottom: 25 }}>
              <div className="field-label" style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Imagem do Jogo</div>
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ borderRadius: '8px', border: '2px solid rgba(102, 126, 234, 0.2)', padding: '10px', cursor: 'pointer' }}
              />
              {imagePreview && (
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '250px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ marginBottom: 25 }}>
              <div className="field-label" style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Sua Review</div>
              <textarea
                className="input"
                placeholder="Compartilhe sua opinião sobre o jogo..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                rows="6"
                style={{ fontFamily: 'inherit', borderRadius: '8px', border: '2px solid rgba(102, 126, 234, 0.2)', padding: '12px' }}
              />
            </div>

            <div style={{ marginBottom: 30 }}>
              <div className="field-label" style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Sua Classificação</div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '36px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{
                      cursor: 'pointer',
                      color: star <= (hoverRating || rating) ? '#FFD700' : '#ddd',
                      transition: 'all 0.2s ease',
                      transform: star <= (hoverRating || rating) ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              {rating > 0 && (
                <p style={{ marginTop: '12px', color: '#667eea', fontSize: '14px', fontWeight: '600', background: 'rgba(102, 126, 234, 0.1)', padding: '8px 12px', borderRadius: '6px' }}>
                  Sua nota: {rating} estrela{rating > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {message && (
              <div className={`msg ${ok ? 'success' : 'error'}`} style={{ marginBottom: 20, background: ok ? '#f0fdf4' : '#fee', border: `1px solid ${ok ? '#86efac' : '#fcc'}`, borderRadius: '8px', padding: '12px', color: ok ? '#16a34a' : '#c33', fontSize: '14px' }}>{message}</div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn" type="submit" style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize: '16px', fontWeight: '700', padding: '14px', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer', color: 'white' }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}>
                Publicar Review
              </button>

              <Link to="/home" style={{ flex: 1 }}>
                <button className="btn" type="button" style={{ width: '100%', background: 'linear-gradient(135deg, #a8a8a8 0%, #6b6b6b 100%)', fontSize: '16px', fontWeight: '700', padding: '14px', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer', color: 'white' }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}>
                  Voltar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

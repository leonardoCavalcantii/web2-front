import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './index.css'

function Register({ onSwitch }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setOk(true);
        setMessage("Usuário criado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setOk(false);
        setMessage(data.message || "Erro ao cadastrar");
      }
    } catch (error) {
      setOk(false);
      setMessage("Erro ao conectar com API");
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <h1 className="page-title" style={{ fontSize: '32px', fontWeight: '700', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center', marginBottom: 40 }}>🎮 Game Reviews</h1>
        <div className="auth-card" style={{ background: 'white', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '40px' }}>
          <h2 style={{ textAlign: 'center', color: '#2d3748', fontSize: '24px', fontWeight: '700', marginBottom: 30 }}>Criar Conta</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div style={{ marginBottom: 20 }}>
              <div className="field-label" style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Nome</div>
              <input className="input" placeholder="Seu nome completo" type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ borderRadius: '8px', border: '2px solid rgba(102, 126, 234, 0.2)', padding: '12px' }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <div className="field-label" style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Email</div>
              <input className="input" placeholder="seu@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ borderRadius: '8px', border: '2px solid rgba(102, 126, 234, 0.2)', padding: '12px' }} />
            </div>

            <div style={{ marginBottom: 30 }}>
              <div className="field-label" style={{ fontSize: '14px', fontWeight: '600', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Senha</div>
              <input className="input" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ borderRadius: '8px', border: '2px solid rgba(102, 126, 234, 0.2)', padding: '12px' }} />
            </div>

            <button className="btn" type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize: '16px', fontWeight: '700', letterSpacing: '0.5px', padding: '12px', borderRadius: '8px', transition: 'transform 0.2s, boxShadow 0.2s', cursor: 'pointer' }}>Registrar</button>

            {message && <div className={`msg ${ok ? 'success' : 'error'}`} style={{ marginTop: 20, background: ok ? '#f0fdf4' : '#fee', border: `1px solid ${ok ? '#86efac' : '#fcc'}`, borderRadius: '8px', padding: '12px', color: ok ? '#16a34a' : '#c33', fontSize: '14px' }}>{message}</div>}

            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <p style={{ color: '#718096', fontSize: '14px' }}>Já tem conta? 
                <Link to="/login" style={{ marginLeft: 5, color: '#667eea', fontWeight: '700', textDecoration: 'none' }}>Fazer login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

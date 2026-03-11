import { useState } from "react";
import './index.css'

function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("nosses loguues!!!!!!!!!!!!!!!!");
        console.log({email, password});
      const response = await fetch("https://web2-back-production.up.railway.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setOk(true);
        setMessage("Login efetuado com sucesso!");
        setEmail("");
        setPassword("");
      } else {
        setOk(false);
        setMessage(data.message || "Erro ao fazer login");
      }
    } catch (err) {
      setOk(false);
      setMessage("Erro ao conectar com API");
    }
  };

  return (
    <div className="center-wrap">
      <div>
        <h1 className="page-title">Login</h1>
        <div className="auth-card">
          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <div className="field-label">Email</div>
              <input className="input" placeholder="Value" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <div className="field-label">Password</div>
              <input className="input" placeholder="Value" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type= "link" onClick ={() => setView('register')}>Register-se</button>
            <button className="btn" type="submit">Login</button>

            {message && <div className={`msg ${ok ? 'success' : 'error'}`}>{message}</div>}

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

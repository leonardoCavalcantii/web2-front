import { useState } from "react";
import './index.css'

function Register({ onSwitch }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, admin })
      });

      const data = await response.json();

      if (response.ok) {
        setOk(true);
        setMessage("Usuário criado com sucesso!");
        setEmail("");
        setPassword("");
        setAdmin(false);
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
    <div className="center-wrap">
      <div>
        <h1 className="page-title">Register</h1>
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

            <div className="row">
              <input className="checkbox" type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
              <div className="field-label">Admin</div>
            </div>

            {/* <button className="btn" type="submit">Register</button> */}

            {message && <div className={`msg ${ok ? 'success' : 'error'}`}>{message}</div>}

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

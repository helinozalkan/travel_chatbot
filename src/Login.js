import React, { useState } from 'react';
import './Login.css';
import digiturkLogo from './assets/digiturk-logo.png';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // E-posta ve şifre doğrulama
    if (email && password) {
      // Basit e-posta formatı kontrolü
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError('Lütfen geçerli bir e-posta adresi girin.');
        return;
      }
      // Kullanıcı kimliğini oluşturun ve saklayın.
      const userId = email; // Örneğin e-posta adresini kullanıcı kimliği olarak kullanabilirsiniz.
      localStorage.setItem('userId', userId);
      onLogin(); // Giriş başarılıysa yönlendirme yap
    } else {
      setError("Lütfen tüm alanları doldurun.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={digiturkLogo} alt="Logo" className="logo" />

        <h2>Giriş Yap</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta (example@gmail.com)"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            required
          />
          <button type="submit">Giriş Yap</button>
        </form>
        <div className="additional-links">
          <a href="#">Şifremi Unuttum?</a>
          <a href="#">Yeni Hesap Oluştur</a>
        </div>
      </div>
    </div>
  );
}

export default Login;

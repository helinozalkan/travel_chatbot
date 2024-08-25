import React, { useState } from 'react';
import './Login.css';
import digiturkLogo from './assets/digiturk-logo.png';

const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 15;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);

  return (
    password.length >= minLength &&
    password.length <= maxLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasDigit
  );
};

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError('Lütfen geçerli bir e-posta adresi girin.');
        return;
      }

      if (isRegistering) {
        if (!validatePassword(password)) {
          setError('Şifre (8-15) karakter uzunluğunda, büyük harf, küçük harf ve rakam içermelidir.');
          return;
        }
        if (password !== newPassword) {
          setError('Şifreler uyuşmuyor.');
          return;
        }
        localStorage.setItem(`password_${email}`, password);
        localStorage.setItem(`chatHistory_${email}`, JSON.stringify([])); // Yeni kullanıcı için boş sohbet geçmişi oluştur
        setError('');
        alert('Kullanıcı başarıyla kaydedildi. Giriş yapabilirsiniz.');
        setIsRegistering(false);
      } else {
        const storedPassword = localStorage.getItem(`password_${email}`);

        if (storedPassword === null) {
          setError('Kullanıcı bulunamadı. Şifrenizi belirlemelisiniz.');
          return;
        }

        if (password !== storedPassword) {
          setError('Hatalı şifre.');
          return;
        }

        setError('');
        const userId = email;
        localStorage.setItem('userId', userId);
        // Giriş başarılıysa sohbet geçmişini yükle
        const chatHistory = localStorage.getItem(`chatHistory_${email}`) || '[]';
        localStorage.setItem('chatHistory', chatHistory);
        onLogin();
      }
    } else {
      setError("Lütfen tüm alanları doldurun.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={digiturkLogo} alt="Logo" className="logo" />
        <h2>{isRegistering ? 'Sign Up' : 'Login'}</h2>
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
            placeholder={isRegistering ? 'Yeni Şifre' : 'Şifre'}
            required
          />
          {isRegistering && (
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Şifreyi Tekrar Girin"
              required
            />
          )}
          <button className="button-login" type="submit">{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}</button>
        </form>
        <div className="additional-links">
          {isRegistering ? (
            <p>Hesabınız var mı? <a href="#" onClick={() => setIsRegistering(false)}>Giriş Yap</a></p>
          ) : (
            <p>Don't have an account? <a href="#" onClick={() => setIsRegistering(true)}>Sign up</a></p>
          )}
          <a href="#">Forgot Password?</a>
        </div>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>
        <div className="social-icons">
          {/* Sosyal medya ikonları */}
        </div>
      </div>
    </div>
  );
}

export default Login;

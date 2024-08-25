import React, { useState } from 'react';
import './ForgotPassword.css'; // Şifre sıfırlama ekranı için stil

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email) {
      // Burada e-posta doğrulama ve şifre sıfırlama işlemini başlatmalısınız
      // Örnek: await sendPasswordResetEmail(email);
      setMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
    } else {
      setMessage('Lütfen e-posta adresinizi girin.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Şifrenizi Mi Unuttunuz?</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail (example@gmail.com)"
          required
        />
        <button type="submit">Şifre Sıfırlama Bağlantısı Gönder</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;

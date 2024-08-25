import React, { useState } from 'react';
import './Login.css';
import digiturkLogo from './assets/digiturk-logo.png';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

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
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail (example@gmail.com)"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="button-login" type="submit">Giriş Yap</button>
        </form>
        <div className="additional-links">
          <a href="#">Forgot Password?</a>
        </div>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>
        <div className="social-icons">
          <button aria-label="Log in with Google" className="icon">
            {/* Google SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          <button aria-label="Log in with Twitter" className="icon">
            {/* Twitter SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.152-1.115 0.235-1.699 0.235-0.416 0-0.819-0.039-1.213-0.114 0.82 2.556 3.197 4.419 6.015 4.465-2.205 1.726-4.968 2.759-7.936 2.759-0.514 0-1.023-0.031-1.525-0.089 2.832 1.818 6.201 2.875 9.748 2.875 11.715 0 18.113-9.686 18.113-18.113 0-0.281-0.006-0.56-0.016-0.839 1.242-0.897 2.31-2.014 3.165-3.291z"></path>
            </svg>
          </button>
          <button aria-label="Log in with Facebook" className="icon">
            {/* Facebook SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M24.482 0h-16.964c-4.432 0-8.018 3.586-8.018 8.018v16.964c0 4.432 3.586 8.018 8.018 8.018h16.964c4.432 0 8.018-3.586 8.018-8.018v-16.964c0-4.432-3.586-8.018-8.018-8.018zM22.313 8.577h-2.844c-1.825 0-2.594 0.866-2.594 2.568v2.394h5.188l-0.675 4.573h-4.513v11.745h-4.891v-11.745h-3.557v-4.573h3.557v-2.708c0-3.528 2.145-5.634 5.327-5.634z"></path>
            </svg>
          </button>
        </div>
        <div className="signup-link">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Chat.css';
import Login from './Login';
import menuPhoto from './assets/menu-photo.png';
import userProfilePic from './assets/user-profile.png';
import botProfilePic from './assets/robot-profile.png';
import avatar1 from './assets/user-profile.png'; // Yeni avatarlar eklendi
import avatar2 from './assets/user-girl-profile.png';
import avatar3 from './assets/man-profile.jpg';
import avatar4 from './assets/user-boy-profile.png';
import avatar5 from './assets/profile-dog2.jpg';
import avatar6 from './assets/profile-wolf.png';
import avatar7 from './assets/profile-cat.png';
import avatar8 from './assets/profile-panda.jpg';

import { fetchChatbotResponse } from './api';
import CitySelector from './CitySelector';
import AddCity from './AddCity';

function App() {
  const [messages, setMessages] = useState(() => {
    const userId = localStorage.getItem('userId');
    const savedMessages = localStorage.getItem(`chatMessages_${userId}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [cityListKey, setCityListKey] = useState(0);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(userProfilePic); // Varsayılan profil resmi
  

  const messageEndRef = useRef(null);
  const navigate = useNavigate();



  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
      setShowLogin(false);
      const savedMessages = localStorage.getItem(`chatMessages_${userId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]);
      }
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      localStorage.setItem(`chatMessages_${userId}`, JSON.stringify(messages));
    }
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    } else {
      // Varsayılan avatarı ayarlama
      setSelectedAvatar(userProfilePic);
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { text: input, isUser: true }];
      setMessages(newMessages);
      setInput('');
      setIsLoading(true);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Yükleniyor...', isUser: false, isLoadingMessage: true }
      ]);

      try {
        const response = await fetchChatbotResponse(input, 'en');

        if (
          response &&
          response.name &&
          response.description &&
          Array.isArray(response.attractions) &&
          Array.isArray(response.localDishes) &&
          response.minimumCost
        ) {
          const { name, description, attractions, localDishes, minimumCost } = response;

          const travelInfo = `
  Name: ${name}
  Description: ${description}
  Attractions: ${attractions.join(', ')}
  Local Dishes: ${localDishes.join(', ')}
  Minimum Cost: ${minimumCost}
          `;

          setMessages((prevMessages) => [
            ...prevMessages.filter(msg => !msg.isLoadingMessage),
            { text: travelInfo, isUser: false }
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages.filter(msg => !msg.isLoadingMessage),
            { text: 'Yanıt formatı beklenen formatta değil.', isUser: false }
          ]);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages.filter(msg => !msg.isLoadingMessage),
          { text: 'API yanıt veremiyor. Lütfen daha sonra tekrar deneyin.', isUser: false }
        ]);
      }

      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleCitySelect = (city) => {
    setInput(city);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogin = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const savedMessages = localStorage.getItem(`chatMessages_${userId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]);
      }
    }
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      localStorage.setItem(`chatMessages_${userId}`, JSON.stringify(messages));
    }
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setShowLogin(true);
    setMessages([]);
  };

  const handleCityAdded = () => {
    setCityListKey(prevKey => prevKey + 1);
  };

  const handleCloseAddCity = () => {
    navigate('/'); // Navigate to the main screen when closing the AddCity form
  };

  const openAvatarModal = () => {
    setShowAvatarModal(true);
  };

  const closeAvatarModal = () => {
    setShowAvatarModal(false);
  };
  
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem('userAvatar', avatar); // Profil resmini localStorage'a kaydetme
    alert('Profil fotoğrafınız başarıyla değiştirildi!'); // Avatar değiştirildiğinde alert göster
  
    closeAvatarModal();
  };
  

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [passwordError, setPasswordError] = useState('');

const togglePasswordModal = () => {
  setIsPasswordModalOpen(!isPasswordModalOpen);
};

const handlePasswordChange = () => {
  if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
    setPasswordError("Şifre en az 8 karakter uzunluğunda, bir büyük harf, bir küçük harf ve bir rakam içermelidir.");
  } else {
    const userId = localStorage.getItem('userId');
    localStorage.setItem(`userPassword_${userId}`, newPassword);
    alert("Şifreniz başarıyla güncellendi!");
    setNewPassword('');
    setPasswordError('');
    togglePasswordModal();
  }
};

  

  if (showLogin) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <div className="menu">
          <button className="add-city-button" onClick={() => navigate('/add-city')}>Şehir Ekle</button>
          <button className="new-chat-button" onClick={handleNewChat}>Yeni Sohbet</button>
          <Link to="/">Anasayfa</Link>
          <Link to="#">Yayın Akışı</Link>
          <Link to="#">Paketler</Link>
          <Link to="#">Kampanyalar</Link>
          <Link to="#">Sıkça Sorulan Sorular</Link>
        </div>
        <div className="menu-photo-container">
          <img src={menuPhoto} alt="Menu" className="menu-photo" />
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-box">
          <div className="chat-header">
            <h1>DIGI-BOT</h1>
          </div>
          <div className="message-area">
            {messages.map((msg, index) => (
              <div key={index} className={`message-container ${msg.isUser ? 'user' : 'bot'}`}>
                <img src={msg.isUser ? selectedAvatar : botProfilePic} alt="Profile" className="profile-pic" />
                <div className={`message ${msg.isUser ? 'user-message' : 'bot-message'} ${msg.isLoadingMessage ? 'loading-message' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} /> 
          </div>
          <form onSubmit={handleSubmit} className="input-form">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Mesajınızı yazın..."
  />
  <button type="submit" className="button" style={{ '--clr': '#00ad54' }}>
    <span className="button-decor"></span>
    <div className="button-content">
      <div className="button__icon">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="24">
          <circle opacity="0.5" cx="25" cy="25" r="23" fill="url(#icon-payments-cat_svg__paint0_linear_1141_21101)"></circle>
          <mask id="icon-payments-cat_svg__a" fill="#fff">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z">
            </path>
          </mask>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z" fill="#fff"></path>
          <path d="M25.958 20.962l-1.47-1.632 1.47 1.632zm2.067.109l-1.632 1.469 1.632-1.469zm-.109 2.068l-1.469-1.633 1.47 1.633zm-5.154 4.638l-1.469-1.632 1.469 1.632zm-.276 1.841l-1.883 1.13 1.883-1.13zM34.42 15.93l-2.084-.695 2.084.695zm-19.725 6.42l18.568-6.189-1.39-4.167-18.567 6.19 1.389 4.166zm5.265 1.75l-5.12-3.072-2.26 3.766 5.12 3.072 2.26-3.766zm2.072 3.348l5.394-4.854-2.938-3.264-5.394 4.854 2.938 3.264zm5.394-4.854a.732.732 0 01-1.034-.054l3.265-2.938a3.66 3.66 0 00-5.17-.272l2.939 3.265zm-1.034-.054a.732.732 0 01.054-1.034l2.938 3.265a3.66 3.66 0 00.273-5.169l-3.265 2.938zm.054-1.034l-5.154 4.639 2.938 3.264 5.154-4.638-2.938-3.265zm1.023 12.152l-3.101-5.17-3.766 2.26 3.101 5.17 3.766-2.26zm4.867-18.423l-6.189 18.568 4.167 1.389 6.19-18.568-4.168-1.389zm-8.633 20.682c1.61 2.682 5.622 2.241 6.611-.725l-4.167-1.39a.732.732 0 011.322-.144l-3.766 2.26zm-6.003-8.05a3.66 3.66 0 004.332-.419l-2.938-3.264a.732.732 0 01.866-.084l-2.26 3.766zm3.592-1.722a3.66 3.66 0 00-.69 4.603l3.766-2.26c.18.301.122.687-.138.921l-2.938-3.264zm11.97-9.984a.732.732 0 01-.925-.926l4.166 1.389c.954-2.861-1.768-5.583-4.63-4.63l1.39 4.167zm-19.956 2.022c-2.967.99-3.407 5.003-.726 6.611l2.26-3.766a.732.732 0 01-.145 1.322l-1.39-4.167z" fill="#fff" mask="url(#icon-payments-cat_svg__a)"></path>
          <defs>
            <linearGradient id="icon-payments-cat_svg__paint0_linear_1141_21101" x1="25" y1="2" x2="25" y2="48" gradientUnits="userSpaceOnUse">
              <stop stop-color="#fff" stop-opacity="0.71"></stop>
              <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="button__text">Gönder</span>
    </div>
  </button>
</form>

</div>
</div>



      <div className="profile-container">
  <img
    src={selectedAvatar}
    alt="Profile"
    className="profile-pic"
    onClick={toggleProfileMenu}
  />
  <div className={`profile-dropdown ${isProfileMenuOpen ? 'active' : ''}`}>
  <button class= "customize-button" onClick={openAvatarModal}>Özelleştir!</button>
  <button className="update-password-button" onClick={togglePasswordModal}>Şifreyi Güncelle</button>


    <Link to="#" onClick={() => setIsProfileMenuOpen(false)}>Hesap Bilgileri</Link> {}
    <Link to="#">Sohbet Geçmişim</Link>
    <Link to="#">Ayarlar</Link>
    <a href="#" onClick={handleLogout}>Çıkış Yap</a>
  </div>

      {/* Şifre Güncelleme Modal Penceresi */}
      {isPasswordModalOpen && (
      <div className="password-modal">
        <div className="password-modal-content">
          <h2>Şifreyi Güncelle</h2>
          <input
            type="password"
            placeholder="Yeni Şifre"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {passwordError && <div className="password-error">{passwordError}</div>}
          <button onClick={handlePasswordChange}>Güncelle</button>
          <button onClick={togglePasswordModal}>Kapat</button>
        </div>
      </div>
    )}
</div>


      <div className="city-selector-container">
        <CitySelector onCitySelect={handleCitySelect} key={cityListKey} />
      </div>

      <Routes>
        <Route path="/add-city" element={<AddCity onClose={handleCloseAddCity} />} />
        {/* Diğer rotalar */}
      </Routes>

      {showAvatarModal && (
        <div className="avatar-modal">
          <div className="avatar-modal-content">
            <h3>Avatarını seç ve hesabını özelleştir!</h3>
            <div className="avatar-options">
              <img src={avatar1} alt="Avatar 1" onClick={() => handleAvatarSelect(avatar1)} />
              <img src={avatar2} alt="Avatar 2" onClick={() => handleAvatarSelect(avatar2)} />
              <img src={avatar3} alt="Avatar 3" onClick={() => handleAvatarSelect(avatar3)} />
              <img src={avatar4} alt="Avatar 4" onClick={() => handleAvatarSelect(avatar4)} />
              <img src={avatar5} alt="Avatar 5" onClick={() => handleAvatarSelect(avatar5)} />
              <img src={avatar6} alt="Avatar 6" onClick={() => handleAvatarSelect(avatar6)} />
              <img src={avatar7} alt="Avatar 7" onClick={() => handleAvatarSelect(avatar7)} />
              <img src={avatar8} alt="Avatar 8" onClick={() => handleAvatarSelect(avatar8)} />

            </div>
            <button class= "close-button" onClick={closeAvatarModal}>Kapat</button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;

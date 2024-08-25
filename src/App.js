import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Chat.css';
import Login from './Login';
import menuPhoto from './assets/menu-photo.png';
import userProfilePic from './assets/user-profile.png';
import botProfilePic from './assets/bot-profile.jpg';
import avatar1 from './assets/user-profile.png'; // Yeni avatarlar eklenmiş
import avatar2 from './assets/user-girl-profile.png';
import avatar3 from './assets/man-profile.png';
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
      // Varsayılan avatarı ayarla
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
    localStorage.setItem('userAvatar', avatar); // Profil resmini localStorage'a kaydedin
    alert('Profil fotoğrafınız başarıyla değiştirildi!'); // Avatar değiştirildiğinde alert göster
  
    closeAvatarModal();
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
            <button type="submit" className="button">
              Gönder
              <div className="hoverEffect">
                <div></div>
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

    <Link to="#">Hesap Bilgileri</Link>
    <Link to="#">Sohbet Geçmişim</Link>
    <Link to="#">Ayarlar</Link>
    <a href="#" onClick={handleLogout}>Çıkış Yap</a>
  </div>
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
            <button onClick={closeAvatarModal}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

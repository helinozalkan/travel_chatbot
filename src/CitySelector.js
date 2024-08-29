import React, { useState, useEffect } from 'react';
import { fetchCities } from './api';

const CitySelector = ({ onCitySelect }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const citiesList = await fetchCities();
        setCities(citiesList);
      } catch (error) {
        console.error('Şehirler alınırken bir hata oluştu:', error);
      }
    };

    // Şehirleri ilk yükleme
    getCities();

    // 10 saniyede bir güncellemek için interval ayarlama
    const intervalId = setInterval(() => {
      getCities();
    }, 10000); // 100000 ms = 10 saniye

    // Bileşen temizlendiğinde interval'i temizleme
    return () => clearInterval(intervalId);
  }, []);

  // Şehir eklenme işlemi sonrası listeyi yeniden yüklemek için
  const handleCityAdded = async () => {
    try {
      const citiesList = await fetchCities();
      setCities(citiesList);
    } catch (error) {
      console.error('Şehirler alınırken bir hata oluştu:', error);
    }
  };

  return (
    <div className="city-selector">
      <h2>Şehirler</h2>
      <ul>
        {cities.map((city, index) => (
          <li key={index} onClick={() => onCitySelect(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelector;

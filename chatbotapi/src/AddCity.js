import React, { useState } from 'react';
import CityService from './services/CityService';
import { useNavigate } from 'react-router-dom';
import './AddCity.css';

const AddCity = ({ onClose }) => {
    const [cityName, setCityName] = useState('');
    const [description, setDescription] = useState(''); // İngilizce açıklama
    const [attractions, setAttractions] = useState(''); // Turistik yerler
    const [localDishes, setLocalDishes] = useState(''); // Yerel yemekler
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Yönlendirme için hook

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
        name: cityName || '', // Varsayılan boş string
        descriptionEnglish: description || '', // Varsayılan boş string
        attractionsEnglish: (attractions || '').split(',').map(attraction => attraction.trim()), // Varsayılan boş string
        localDishesEnglish: (localDishes || '').split(',').map(dish => dish.trim()), // Varsayılan boş string
            minCost: Math.floor(Math.random() * 1000) + 1 // Rastgele maliyet
        };
         
        try {
            const result = await CityService.AddCity(formData);
            if (result.success) {
                alert('Şehir başarıyla eklendi!');
                navigate('/'); // Chatbot ekranına yönlendirme
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    const handleClear = () => {
        setCityName('');
        setDescription(''); // Temizle
        setAttractions('');
        setLocalDishes('');
        setError('');
    };

    return (
        <div className="add-city-container">
            <h2>Yeni Şehir Ekle</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Şehir Adı:
                    <input
                        type="text"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Açıklama (İngilizce):
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Turistik Yerler (İngilizce, virgülle ayrılmış):
                    <input
                        type="text"
                        value={attractions}
                        onChange={(e) => setAttractions(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Yerel Yemekler (İngilizce, virgülle ayrılmış):
                    <input
                        type="text"
                        value={localDishes}
                        onChange={(e) => setLocalDishes(e.target.value)}
                        required
                    />
                </label>
                <div className="button-container">
                    <button type="submit">Kaydet</button>
                    <button type="button" onClick={handleClear}>Temizle</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default AddCity;

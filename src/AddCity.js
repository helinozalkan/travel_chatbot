import React, { useState } from 'react';
import CityService from './services/CityService';
import { useNavigate } from 'react-router-dom';
import './AddCity.css';

const AddCity = ({ onClose }) => {
    const [cityName, setCityName] = useState('');
    const [description, setDescription] = useState('');
    const [attractions, setAttractions] = useState('');
    const [localDishes, setLocalDishes] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: cityName || '',
            descriptionEnglish: description || '',
            attractionsEnglish: (attractions || '').split(',').map(attraction => attraction.trim()),
            localDishesEnglish: (localDishes || '').split(',').map(dish => dish.trim()),
            minCost: Math.floor(Math.random() * 1000) + 1
        };
         
        try {
            const result = await CityService.AddCity(formData);
            if (result.success) {
                alert('Şehir başarıyla eklendi!');
                onClose(); // Call onClose when the city is added successfully
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    const handleClear = () => {
        setCityName('');
        setDescription('');
        setAttractions('');
        setLocalDishes('');
        setError('');
    };

    const handleClose = () => {
        onClose(); // Call onClose when the "Kapat" button is clicked
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
                    <button type="button" onClick={handleClose}>Kapat</button> {/* Add Kapat button */}
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default AddCity;

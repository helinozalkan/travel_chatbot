import axios from 'axios';

const API_BASE_URL = 'http://localhost:5204';

// Seyahat bilgilerini almak için fonksiyon
export const fetchChatbotResponse = async (destination, language) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/travel/${destination}/${language}`);
    console.log('API yanıtı:', response.data); // API yanıtını kontrol edin
    
    if (
      response.data &&
      response.data.name &&
      response.data.description &&
      Array.isArray(response.data.attractions) &&
      Array.isArray(response.data.localDishes) &&
      response.data.minimumCost
    ) {
      return {
        name: response.data.name,
        description: response.data.description,
        attractions: response.data.attractions,
        localDishes: response.data.localDishes,
        minimumCost: response.data.minimumCost
      };
    } else {
      console.error('Yanıt formatı beklenen formatta değil.');
      return { text: 'Yanıt formatı beklenen formatta değil.' };
    }
  } catch (error) {
    console.error('API çağrısı sırasında bir hata oluştu:');
    console.error('Hata durumu:', error.response ? error.response.status : 'Bilinmiyor');
    console.error('Hata mesajı:', error.response ? error.response.data : error.message);
    return { text: 'Üzgünüm, bir hata oluştu.' };
  }
};

// Şehir isimlerini almak için fonksiyon
export const fetchCities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    console.log('Şehirler:', response.data); // API yanıtını kontrol edin

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Şehir yanıtı beklenen formatta değil.');
      return [];
    }
  } catch (error) {
    console.error('API çağrısı sırasında bir hata oluştu:');
    console.error('Hata durumu:', error.response ? error.response.status : 'Bilinmiyor');
    console.error('Hata mesajı:', error.response ? error.response.data : error.message);
    return [];
  }
};

// Şehir eklemek için fonksiyon
export const AddCity = async (cityData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/destinations`, cityData);
    console.log('Şehir eklendi:', response.data); // API yanıtını kontrol edin

    if (response.status === 200) { // 200 OK
      return response.data; // Başarıyla eklenen şehir bilgileri
    } else {
      console.error('Şehir ekleme başarısız oldu.');
      return { success: false, message: 'Şehir ekleme başarısız oldu.' };
    }
  } catch (error) {
    console.error('API çağrısı sırasında bir hata oluştu:', error);
    return { success: false, message: 'Şehir ekleme sırasında bir hata oluştu. Lütfen tekrar deneyin.' };
  }
};

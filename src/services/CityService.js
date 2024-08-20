// src/services/CityService.js
export default class CityService {
    static async AddCity(formData) {
        try {
            const response = await fetch('http://localhost:5204/destinations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // API'den dönen hata mesajını al
                const errorData = await response.json();
                throw new Error(errorData.message || 'Şehir verileri eklenirken bir hata oluştu.');
            }

            const result = await response.json();
            return { success: true, data: result };
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.' };
        }
    }
}

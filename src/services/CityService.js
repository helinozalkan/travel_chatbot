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
                throw new Error('Şehir verileri eklenirken bir hata oluştu.');
            }

            const result = await response.json();
            return { success: true, data: result };
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: 'Eklemeye çalıştığınız şehir zaten listede mevcut.' };
        }
    }
}

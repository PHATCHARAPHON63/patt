
import axios from 'axios';

const baseUrl = 'http://localhost:3301'; // แทนที่ด้วย URL ของ API ของคุณ

export const getProductListByPos = async (pos) => {
    try {
      const response = await axios.post(`${baseUrl}/getProductListByPos`, { pos });
      console.log('API Response:', response.data); // เพิ่มบรรทัดนี้
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };



import axios from 'axios';
import { artStyles } from '@/data/artStyles'

const API_BASE_URL = 'http://localhost:5000/api';

interface BackendResponse {
  style: string;
  confidence: number;
}

interface AnalysisResult {
  styleId: string;
  confidence: number;
}

export const analyzeImage = async (imageFile: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post<BackendResponse>(
      `${API_BASE_URL}/classify-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const styleId = Object.keys(artStyles).find(
      id => artStyles[id].name.toLowerCase() === response.data.style.toLowerCase()
    );

    if (!styleId) {
      throw new Error(`Unknown art style: ${response.data.style}`);
    }

    return {
      styleId,
      confidence: Number((response.data.confidence * 100).toFixed(2))
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to analyze image');
    }
    throw error;
  }
}

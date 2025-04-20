// Mocking an AI service for now
// In a real application, this would connect to a machine learning model or API

import { artStyles } from '@/data/artStyles'

interface AnalysisResult {
  styleId: string
  confidence: number
}

// This is a mock function that returns a random art style
// In a real application, this would analyze the image using a ML model
export const analyzeImage = async (imageFile: File): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Get all style IDs
  const styleIds = Object.keys(artStyles)

  // In a mock implementation, select a random style
  const randomStyleId = styleIds[Math.floor(Math.random() * styleIds.length)]

  // Generate a random confidence score between 60% and 98%
  const confidence = 60 + Math.floor(Math.random() * 39)

  return {
    styleId: randomStyleId,
    confidence
  }
}

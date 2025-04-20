import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import StyleResult from '@/components/StyleResult'
import ArtStyleInfo from '@/components/ArtStyleInfo'
import { artStyles } from '@/data/artStyles'
import { analyzeImage } from '@/services/imageAnalysis'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    styleId: string
    confidence: number
  } | null>(null)
  const { toast } = useToast()

  const handleImageSelected = async (file: File) => {
    try {
      setSelectedImage(file)
      setImageUrl(URL.createObjectURL(file))
      setAnalyzing(true)
      setAnalysisResult(null)

      // Analyze the image
      const result = await analyzeImage(file)

      setAnalysisResult(result)
      setAnalyzing(false)

      toast({
        title: 'Analysis Complete',
        description: `Style identified as ${artStyles[result.styleId].name} with ${result.confidence}% confidence.`,
      })
    } catch (error) {
      setAnalyzing(false)
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your image. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const resetAnalysis = () => {
    setSelectedImage(null)
    setImageUrl(null)
    setAnalysisResult(null)
  }

  return (
    <div className='min-h-screen bg-background py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold mb-3'>Art Style Oracle</h1>
          <p className='text-xl text-muted-foreground'>
            Discover the artistic style of any painting or artwork
          </p>
        </header>

        <div className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-3'>
            {!selectedImage ? (
              <ImageUploader onImageSelected={handleImageSelected} />
            ) : analyzing ? (
              <div className='art-card rounded-lg p-8 flex flex-col items-center justify-center h-full'>
                <Loader2 className='h-12 w-12 animate-spin text-accent mb-4' />
                <h3 className='text-xl font-semibold'>Analyzing Your Artwork...</h3>
                <p className='text-muted-foreground mt-2'>
                  Our AI is studying the artistic elements of your image.
                </p>
              </div>
            ) : analysisResult && imageUrl ? (
              <StyleResult
                style={artStyles[analysisResult.styleId]}
                confidence={analysisResult.confidence}
                imageUrl={imageUrl}
              />
            ) : null}

            {selectedImage && !analyzing && (
              <div className='text-center mt-6'>
                <button
                  onClick={resetAnalysis}
                  className='text-accent underline hover:text-muted-foreground'
                >
                  Analyze a different image
                </button>
              </div>
            )}
          </div>

          <div className='md:col-span-2'>
            <ArtStyleInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index

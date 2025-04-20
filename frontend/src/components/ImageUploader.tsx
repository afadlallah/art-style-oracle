import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  onImageSelected: (file: File) => void
}

const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        onImageSelected(file)
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelected(e.target.files[0])
    }
  }

  return (
    <div
      className={`upload-area p-8 rounded-lg cursor-pointer text-center ${isDragging ? 'border-accent bg-secondary' : ''
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handleFileChange}
      />

      <div className='flex flex-col items-center justify-center space-y-4'>
        <div className='p-4 bg-muted rounded-full'>
          <Upload className='h-8 w-8 text-accent' />
        </div>
        <h3 className='text-xl font-semibold'>Upload Your Artwork</h3>
        <p className='text-muted-foreground max-w-md'>
          Drop an image here or click to browse. We'll analyze it to determine its artistic style.
        </p>
        <Button className='mt-4'>
          <ImageIcon className='mr-2 h-4 w-4' />
          Select Image
        </Button>
      </div>
    </div>
  )
}

export default ImageUploader

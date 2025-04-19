import { ArtStyle } from '@/data/artStyles'

interface StyleResultProps {
  style: ArtStyle
  confidence: number
  imageUrl: string
}

const StyleResult = ({ style, confidence, imageUrl }: StyleResultProps) => {
  return (
    <div className='art-card rounded-lg overflow-hidden p-6 flex flex-col md:flex-row gap-6 page-transition'>
      <div className='md:w-1/2'>
        <img
          src={imageUrl}
          alt='Analyzed artwork'
          className='w-full h-auto object-contain rounded-md'
        />
      </div>

      <div className='md:w-1/2 space-y-4'>
        <h2 className='text-3xl font-bold'>{style.name}</h2>
        <p className='text-lg text-muted-foreground'>{style.period}</p>

        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium'>Confidence</span>
            <span className='text-sm font-bold'>{confidence}%</span>
          </div>
          <div className='confidence-meter'>
            <div
              className='confidence-value'
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>

        <p className='text-base'>{style.description}</p>

        <div>
          <h3 className='text-lg font-semibold mb-2'>Key Characteristics:</h3>
          <ul className='list-disc pl-5 space-y-1'>
            {style.characteristics.map((characteristic, index) => (
              <li key={index}>{characteristic}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-2'>Notable Artists:</h3>
          <p>{style.famousArtists.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}

export default StyleResult

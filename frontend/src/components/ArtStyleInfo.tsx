import { Palette } from 'lucide-react'

const ArtStyleInfo = () => {
  return (
    <div className='art-card rounded-lg p-6 space-y-6 page-transition'>
      <div className='flex items-center space-x-3'>
        <div className='p-2 bg-accent rounded-full'>
          <Palette className='h-6 w-6 text-accent-foreground' />
        </div>
        <h2 className='text-2xl font-bold'>Art Style Oracle</h2>
      </div>

      <p>
        Welcome to the Art Style Oracle! Upload any artwork image, and our AI will analyze it to determine
        its artistic style.
      </p>

      <p>
        Whether you're exploring a museum, studying art history, or just curious about an artwork you've
        discovered, our oracle will help you identify its style and learn about its characteristics.
      </p>

      <div className='grid grid-cols-2 gap-4 my-6'>
        <div className='border rounded-md p-3 text-center'>
          <h3 className='font-semibold mb-1'>Easy Analysis</h3>
          <p className='text-sm'>Upload any artwork and get instant style identification</p>
        </div>
        <div className='border rounded-md p-3 text-center'>
          <h3 className='font-semibold mb-1'>Educational</h3>
          <p className='text-sm'>Learn about different art movements and their characteristics</p>
        </div>
      </div>

      <div className='border rounded-md p-4'>
        <h3 className='font-semibold mb-2'>Supported Art Styles</h3>
        <div className='grid grid-cols-2 gap-x-4 gap-y-1 text-sm md:grid-cols-2'>
          <span>Abstract Expressionism</span>
          <span>Art Nouveau Modern</span>
          <span>Baroque</span>
          <span>Color Field Painting</span>
          <span>Cubism</span>
          <span>Early Renaissance</span>
          <span>Expressionism</span>
          <span>High Renaissance</span>
          <span>Impressionism</span>
          <span>Mannerism (Late Renaissance)</span>
          <span>Minimalism</span>
          <span>Naive Art (Primitivism)</span>
          <span>Northern Renaissance</span>
          <span>Pop Art</span>
          <span>Post-Impressionism</span>
          <span>Realism</span>
          <span>Rococo</span>
          <span>Romanticism</span>
          <span>Symbolism</span>
        </div>
      </div>
    </div>
  )
}

export default ArtStyleInfo

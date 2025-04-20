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
        its artistic style, from Renaissance to Contemporary Art.
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
    </div>
  )
}

export default ArtStyleInfo

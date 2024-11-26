import Button from '@/components/ui/Button';
import Navbar from '../components/Navbar'
import Properties from '@/components/ui/Properties';

export default function Home() {
  return (
    <div className='w-[100%] mx-auto mt-10'>
      <Navbar />

      <div className='w-[82%] mx-auto my-6 flex flex-col gap-3'>
        <p className='font-semibold text-2xl'>Find Your Next Vacation Spot</p>
        <div className='flex justify-start gap-3'>  
          <input 
            type="text" 
            name="" 
            id="" 
            placeholder='Search by location...'
            className='outline-none border border-gray-400 rounded-lg w-1/3 px-3 focus-within:border-blue-600'
          />
          <Button text='Search' dark type='button'/>
        </div>
      </div>
      <Properties/>
    </div>
  );
}

import Button from '@/app/components/ui/Button';


export default function Home() {
  return (
    <div className='w-[100%] mx-auto'>
      {/* <Navbar /> */}

      <div 
        className='px-[14%] py-5 mt-[5.1rem] mx-auto mb-6 flex flex-col gap-3 h-[25rem] bg-main-page bg-cover'
      >
        <div className='mt-20 ml-20'>
          <p className='font-semibold text-2xl text-white'>Find Your Next Vacation Spot</p>
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
      </div>
      <Properties/>
    </div>
  );
}

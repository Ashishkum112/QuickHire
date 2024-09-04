import React from 'react'

const FooterBanner = () => {
  return (
    <div className='flex flex-col items-center'>
      <div
        className="
          w-full 
          h-[25vh] 
          sm:h-[50vh] 
          lg:w-[120vh]
          lg:h-[60vh]
          
          bg-cover 
          bg-center
          bg-[url('/bg.png')]     /* Default (Mobile) */
          sm:bg-[url('/tablet-image.png')]  /* Tablet */
          lg:bg-[url('/full.png')] /* Desktop */
        "
      ></div>
    </div>
  )
}

export default FooterBanner

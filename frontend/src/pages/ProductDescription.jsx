import React from 'react'

const ProductDescription = () => {
  return (
   <div className='mt-20'>
       <div className='flex gap-3 mb-4'>
          <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36'>Description</button>
          <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Care Guide</button>
          <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Size Guide</button>  
       </div>
       <div className='flex flex-col pb-16'>
        <p className='text-sm'>Drive sales with Dynamics 365 texting. TrueDialog helps you convert more leads.
             Dynamics 365 texting setup too complex? TrueDialog offers a seamless solution.
             Drive sales with Dynamics 365 texting. TrueDialog helps you convert more leads.
             Dynamics 365 texting setup too complex? TrueDialog offers a seamless solution.</p>
             <p className='text-sm'>Drive sales with Dynamics 365 texting. TrueDialog helps you convert more leads.
             Dynamics 365 texting setup too complex? TrueDialog offers a seamless solution.
             Drive sales with Dynamics 365 texting. TrueDialog helps you convert more leads.
             Dynamics 365 texting setup too complex? TrueDialog offers a seamless solution.</p>
       </div>
   </div>
  )
}

export default ProductDescription
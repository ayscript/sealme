import React from 'react'

const Featurecard = (props: { children: string | number | bigint | boolean | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => {
  return (
    <div className='flex flex-col justify-between items-center p-3 sm:w-60 py-5 gap-8 rounded-xl sm:h-72 h-64 bg-foreground'>
      {props.children}
    </div>
  )
}

export default Featurecard

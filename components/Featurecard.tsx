import Image from 'next/image'
import React from 'react'

const Featurecard = (props: { children: string | number | bigint | boolean | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => {
  return (
    <div className='flex flex-col items-center p-3 sm:w-60 py-5 gap-8 rounded-2xl bg-foreground'>
      <Image
      src={'/cartoon.webp'}
      width={200}
      height={200}
      alt='img'
      className='bg-background rounded-lg'
      />
      <h2>{props.children}</h2>
    </div>
  )
}

export default Featurecard

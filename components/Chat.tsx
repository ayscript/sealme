import React from 'react'

const Chat = (props: { children: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => {
  return (
    <span className='bg-secondary inline-block p-3 rounded-2xl m-4'>
    {props.children}
    </span>
  )
}

export default Chat

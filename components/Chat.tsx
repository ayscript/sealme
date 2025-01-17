import React from 'react'

type NewType = {
  chatType: string
  children: string | number | bigint | boolean | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined
}

const Chat = (props: NewType) => {
  return (
    <p className={`bg-foreground text-sm text-text ${props.chatType === 'self' ? 'self-end chatBoxSelf' : 'self-start chatBox'} p-3 rounded m-2 max-w-72 sm:max-w-[50%] pb-[0] flex flex-col gap-2`}>
      <span className='w-full text-ellipsis overflow-hidden inline-block'>{props.children}</span>
      <span className="text-[8px] self-end">
        27 January, 2025, 20:34
      </span>
    </p>
  )
}

export default Chat

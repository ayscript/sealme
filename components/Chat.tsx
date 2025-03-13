import React from 'react';

type ChatProps = {
  chatType: string;
  children: React.ReactNode;
  dateCreated: string;
};

const Chat: React.FC<ChatProps> = ({ children, dateCreated }) => {
  return (
    <p
      className={`bg-foreground text-sm text-text p-3 rounded m-2 max-w-72 sm:max-w-[50%] pb-[0] flex flex-col gap-2`}
      onTouchMove={(e) => {
        (e.target as HTMLElement).style.transform = `translateX(${e.touches[0].clientX}px)`;
      }}
    >
      <span className='w-full text-ellipsis overflow-hidden inline-block'>
        {typeof children === 'object' ? JSON.stringify(children) : children}
      </span>
      <span className='text-[8px] self-end'>{dateCreated}</span>
    </p>
  );
};

export default Chat;

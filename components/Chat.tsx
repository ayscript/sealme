import React from "react";

type ChatProps = {
  chatType: string;
  children: React.ReactNode;
  dateCreated: string;
  reactions?: { [key: string]: number }; // Add reactions prop
  onReact?: (reaction: string) => void; // Add onReact prop
};

const Chat: React.FC<ChatProps> = ({
  children,
  dateCreated,
}) => {
  // const [showReactions, setShowReactions] = useState(false);

  // const handleReaction = (reaction: string) => {
  //   if (onReact) {
  //     onReact(reaction);
  //   }
  // };

  return (
      <p
        className={`bg-foreground text-sm text-text p-3 rounded m-2 min-w-72 sm:max-w-[50%] pb-[0] flex flex-col gap-2 mx-auto`}
        onTouchMove={(e) => {
          if (e.target === e.currentTarget) {
            (
              e.target as HTMLElement
            ).style.transform = `translateX(${e.touches[0].clientX}px)`;
          }
        }}
        onTouchEnd={(e) => {
          if (e.target === e.currentTarget) {
            (e.target as HTMLElement).style.transform = "translateX(0)";
          }
        }}
      >
        <span className="text-ellipsis overflow-hidden inline-block">
          {typeof children === "object" ? JSON.stringify(children) : children}
        </span>
        <span className="text-[8px] self-end">{dateCreated}</span>
      </p>
  );
};

export default Chat;

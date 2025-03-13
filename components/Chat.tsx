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
    <div className="relative">
      <p
        className={`bg-foreground text-sm text-text p-3 rounded m-2 max-w-72 sm:max-w-[50%] pb-[0] flex flex-col gap-2`}
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
      {/* <div className="absolute bottom-[30%] right-[48%]">
        <button onClick={() => setShowReactions(!showReactions)}>
          <svg
            width={22}
            height={25}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g fill="currentColor">
              <path d="M8 12c-1.01 0-1.782-.504-2.267-.945a4.7 4.7 0 0 1-.564-.614 3 3 0 0 1-.212-.305.75.75 0 0 1 1.284-.775 3.2 3.2 0 0 0 .5.584c.341.31.769.555 1.259.555s.918-.246 1.258-.555a3.2 3.2 0 0 0 .5-.584.75.75 0 0 1 1.285.775l-.212.305c-.128.167-.317.39-.564.614C9.782 11.495 9.01 12 8 12M5 6a1 1 0 0 1 1-1h.007a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1m5-1a1 1 0 1 0 0 2h.007a1 1 0 1 0 0-2z" />
              <path
                fillRule="evenodd"
                d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0"
                clipRule="evenodd"
              />
            </g>
          </svg>
        </button>
        {showReactions && (
          <div>
            {["👍", "❤️", "😂", "😮", "😢", "👏"].map((reaction) => (
              <button key={reaction} onClick={() => handleReaction(reaction)}>
                {reaction}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        {Object.entries(reactions).map(([reaction, count]) => (
          <span key={reaction}>
            {reaction} {count}
          </span>
        ))}
      </div> */}
    </div>
  );
};

export default Chat;

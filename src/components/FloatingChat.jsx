"use client";

export default function FloatingChat() {
  const messengerUrl = "https://m.me/unitechfa";

  return (
    <div className="fixed bottom-24 right-5 z-40 flex items-center md:bottom-7 md:right-7">
      {/* Messenger Button Wrapper */}
      <div className="group relative flex items-center">
        {/* Chat With Us Label */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-gray-800 opacity-0 invisible translate-x-2 shadow-md transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:translate-x-0 group-hover:opacity-100"
        >
          Chat With Us 👋
        </a>

        {/* Messenger Button */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with UniTech on Messenger"
          className="messenger-button relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0084FF] transition-transform duration-300 hover:scale-105"
        >
          {/* Messenger Icon */}
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M12 0C5.37 0 0 4.89 0 10.92c0 3.43 1.7 6.48 4.37 8.4v4.14l4-2.2c1.14.32 2.36.49 3.63.49 6.63 0 12-4.89 12-10.92S18.63 0 12 0Z"
            />

            <path
              fill="#0084FF"
              d="m5.17 14.9 5.1-5.42a.75.75 0 0 1 1.08-.07l2.5 2.16 4.98-2.67-5.1 5.42a.75.75 0 0 1-1.08.07l-2.5-2.16-4.98 2.67Z"
            />
          </svg>

          {/* Notification Badge */}
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#FF3B30] text-[10px] font-bold text-white">
            1
          </span>
        </a>
      </div>
    </div>
  );
}

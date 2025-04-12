import { fetchMessages } from "@/store/Action/chatAction";
import { socketMarkAsSeen } from "@/store/webSocketAction/webSocketAction";
import { MessageCircle, Menu, ChevronUp, MoreVertical, Copy, Trash, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
 export const MessageBubble = ({ message, currentUserId, formatDate  , handleDeleteMessage}) => {
   
    const isSentByMe = message?.senderId !== currentUserId;
    const [showActions, setShowActions] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(()=>{
      if(message?.senderId==currentUserId&&!message?.isSeen){
        socketMarkAsSeen(message.id);
      }
    },[message?.id])
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    
    const handleDelete = (e) => {
      
      console.log("Deleting message:", message.id);
      handleDeleteMessage(message?.id)
      setDropdownOpen(false);
    };
    
    const handleCopy = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(message.message);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      setDropdownOpen(false);
    };
    
    // Format date for the message header
    const formatFullDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    
    return (
      <div 
        className={` mt-4 flex group ${isSentByMe ? 'justify-end' : 'justify-start'} relative mb-2`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => {
          setShowActions(false);
          if (!dropdownOpen) setCopySuccess(false);
        }}
      >
        {/* Date tooltip */}
        <div 
          className={`absolute -top-6 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm transition-opacity duration-200 ${
            showActions ? 'opacity-100' : 'opacity-0'
          } ${isSentByMe ? 'right-2' : 'left-2'}`}
        >
          {/* {formatFullDate(message.createdAt)} */}
        </div>
        
        {/* Message actions button */}
        <div className="relative">
          {showActions &&isSentByMe && (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`absolute top-0 ${isSentByMe ? '-left-8' : '-right-8'} text-gray-500 hover:text-gray-700 p-1.5 bg-white rounded-full shadow-sm transition-all duration-200`}
            >
              <MoreVertical size={16} />
            </button>
          )}
          
          {/* Dropdown menu */}
          {dropdownOpen && isSentByMe && (
            <div 
              ref={dropdownRef}
              className={`absolute z-10 top-8 ${isSentByMe ? '-left-24' : '-right-24'} bg-white rounded-lg shadow-lg py-1 w-32`}
            >
              <button
                onClick={handleCopy}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                {copySuccess ? <Check size={14} className="mr-2 text-green-500" /> : <Copy size={14} className="mr-2" />}
                {copySuccess ? "Copied!" : "Copy"}
              </button>
              
              {isSentByMe && (
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <Trash size={14} className="mr-2" />
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
        
        <div 
          className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2.5 rounded-lg shadow-sm ${
            isSentByMe 
              ? 'bg-blue-500 text-white mr-2 rounded-tr-none' 
              : 'bg-white text-gray-800  ml-8 rounded-tl-none'
          } ${showActions ? 'shadow-md' : ''}`}
        >
          <p className="break-words whitespace-pre-wrap">{message?.message}</p>
          
          <div className={`flex items-center justify-end text-xs mt-1 ${isSentByMe ? 'text-blue-100' : 'text-gray-500'}`}>
            <span>{formatFullDate(message?.createdAt)}</span>
            
            {isSentByMe&&(
              <span className="ml-1.5 flex items-center">
                {message?.isSeen ? (
                  <>
                    <svg viewBox="0 0 16 15" width="16" height="15" className="fill-current">
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 16 15" width="16" height="15" className="fill-current">
                      <path d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                    </svg>
                  </>
                )}
              </span>
            )}
          </div>
        </div>
        <div className="relative">
          {showActions && !isSentByMe && (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`absolute top-0 ${isSentByMe ? '-left-8' : '-right-8'} text-gray-500 hover:text-gray-700 p-1.5 bg-white rounded-full shadow-sm transition-all duration-200`}
            >
              <MoreVertical size={16} />
            </button>
          )}
          
          {/* Dropdown menu */}
          {dropdownOpen && !isSentByMe && (
            <div 
              ref={dropdownRef}
              className={`absolute z-10 top-8 ${isSentByMe ? '-left-24' : '-right-24'} bg-white rounded-lg shadow-lg py-1 w-32`}
            >
              <button
                onClick={handleCopy}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                {copySuccess ? <Check size={14} className="mr-2 text-green-500" /> : <Copy size={14} className="mr-2" />}
                {copySuccess ? "Copied!" : "Copy"}
              </button>
              
              {isSentByMe && (
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <Trash size={14} className="mr-2" />
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
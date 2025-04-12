
import { Search, X, ChevronDown, ChevronUp, Menu, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

export const UserListItem = ({ user, isActive, onClick, unReadMessage }) => {

  
  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">Admin</span>;
      case 'founder':
        return <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Founder</span>;
      case 'incubation_manager':
        return <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">Inc. Mgr</span>;
      case 'program_manager':
        return <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Prog. Mgr</span>;
      default:
        return null;
    }
  };
  
  return (
    <div
      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${isActive ? 'bg-white shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xl text-gray-600">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
          
          
          
          {isActive && (
            <div className="absolute  bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`${unReadMessage ? ' font-bold' : ' font-normal'}`}>{user.name}</h3>
            <span className="text-xs text-gray-500">
              {user.lastMessageTime || ''}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            {user.startupName && (
              <span className={`truncate mr-2 ${unReadMessage ? 'font-semibold' : ''}`}>{user.startupName}</span>
            )}
            {getRoleBadge(user.role)}
          </div>
          
          {user.lastMessage && (
            <p className={`text-sm truncate mt-1 ${unReadMessage ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
              {user.lastMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
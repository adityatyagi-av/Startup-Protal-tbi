import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, ChevronUp, Menu, MessageCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserListItem } from '@/components/chatComponet/userListItem';
import NewChatModal from '@/modals/newChatModal/page';

export const ChatSidebar = ({ users, activeUserId, setActiveUserId, isMobile, setSidebarOpen , setUsers }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [userList  , setUserList] = useState([]);
  const [activeUser ,setActiveUser]= useState({});
  const {  unreadChatUser ,intialActiveUser,resetActiveUser,setActiveUser:newActiveUser} = useSelector((state)=>state.chatReducer);
  
  useEffect(() => {
    const uniqueUsers = Array.from(
      new Map(users.map(user => [user.id, user])).values()
    );
    setUserList(uniqueUsers);
  }, [users]);
  useEffect(()=>{
    if(newActiveUser){
      console.log("active user")
      setActiveUser({...activeUser,[newActiveUser]:true})
    }
    else if(resetActiveUser){
      if(activeUser[resetActiveUser]){
        setActiveUser({...activeUser,[resetActiveUser]:false})
      }
    }
  
  },[newActiveUser,resetActiveUser])

  useEffect(()=>{
    console.log(intialActiveUser)
  if(intialActiveUser&&intialActiveUser.length>0){
    intialActiveUser.map((id)=>{
      setActiveUser({...activeUser,[id]:true})
    })
  }
  },[intialActiveUser])
  
 useEffect(()=>{
  console.log("active user changed ", activeUser)
 },[activeUser])
  
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterExpanded, setFilterExpanded] = useState(false);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.startupName && user.startupName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery('');
    }
  };

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col" onClick={()=>{console.log(intialActiveUser ,activeUser)}}>
      <div className=" px-4 flex justify-between items-center">
        
        {isMobile && (
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="p-4  ">
        <div className="flex  justify-end flex-col gap-3">
       
            <NewChatModal setActiveUserId={setActiveUserId}/>
        </div>

       
      </div>

      <div className="flex-1 overflow-y-auto">
        {userList.length > 0 ? (
          userList.map(user => (
            <UserListItem
              key={user.id} 
              user={user} 
              isActive={activeUser[user.id]||false}
              unReadMessage={user.id==2}
              onClick={() => {
                setActiveUserId(user.id);
                if (isMobile) {
                  setSidebarOpen(false);
                }
              }}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};






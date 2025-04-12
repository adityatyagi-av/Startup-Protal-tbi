import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@/customHook/debounceInput";
import { FetchChatUserQuesry, updateChatUser } from "@/store/Action/chatAction";
import toast from "react-hot-toast";

const NewChatModal = ({ setActiveUserId }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue, debounceValue] = useDebounce("admi");
    const [selectedUser, setSelectedUser] = useState(null);
    const { searchUser, loading } = useSelector((state) => state.chatReducer);

    const dispatch = useDispatch();

    const handleAssign = () => {

        console.log("Selected user:", selectedUser);

        dispatch(updateChatUser(selectedUser))
        setTimeout(() => {

            setActiveUserId(selectedUser.id)
            setOpen(false)
        }, 500)





        setOpen(false);
    };

    useEffect(() => {
        dispatch(FetchChatUserQuesry(debounceValue));
    }, [debounceValue]);

    // Get user role and avatar based on the new data structure
    const getUserInfo = (user) => {
        if (user.manager) {
            return {
                role: user.manager.role,
                avatar: user.manager.avatar
            };
        } else if (user.admin) {
            return {
                role: user.admin.role,
                avatar: user.admin.avatar
            };
        } else if (user.founder) {
            return {
                role: user.founder.role,
                avatar: user.founder.avatar
            };
        }
        return { role: "user", avatar: null };
    };

    // User item component for reuse
    const UserItem = ({ user, selected, onClick }) => {
        const userInfo = getUserInfo(user);

        return (
            <div
                onClick={onClick}
                className="flex items-center gap-3 py-3 cursor-pointer hover:bg-slate-100 rounded-md px-2"
            >
                <img
                    src={userInfo.avatar || "/api/placeholder/40/40"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover bg-gray-200"
                />
                <div className="flex flex-col flex-1">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-gray-500">
                        {userInfo.role?.replace(/_/g, " ")}
                    </span>
                </div>
                {selected && (
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                )}
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-[#3b4db4] px-7 rounded-md text-white hover:bg-[#2d3a8a]">
                    New Chat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white h-[400px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Select User to Chat</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {selectedUser && (
                        <div className="border rounded-lg p-2 bg-slate-50">
                            <UserItem
                                user={selectedUser}
                                selected={true}
                                onClick={() => {
                                    setSelectedUser(null);
                                    setInputValue("");
                                }}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search user..."
                            className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <ScrollArea className="h-fit max-h-[300px] border rounded-md">
                        <div className="p-2">
                            {searchUser && searchUser
                                .filter(user =>
                                    user.name.toLowerCase().includes(inputValue.toLowerCase()) &&
                                    user.id !== selectedUser?.id
                                )
                                .map((user) => (
                                    <UserItem
                                        key={user.id}
                                        user={user}
                                        selected={false}
                                        onClick={() => {
                                            setSelectedUser(user);

                                        }}
                                    />
                                ))}

                            {(!searchUser || searchUser.length === 0) && !loading && (
                                <div className="py-4 text-center text-gray-500">
                                    No users found
                                </div>
                            )}


                        </div>
                    </ScrollArea>

                    <Button
                        onClick={handleAssign}
                        disabled={!selectedUser}
                        variant="default"
                        className="w-full bg-[#3b4db4] hover:bg-[#2d3a8a]"
                    >
                        {selectedUser ? `Chat with ${selectedUser.name}` : "Select User to chat"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NewChatModal;
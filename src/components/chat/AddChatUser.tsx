import React, { useEffect, useState } from "react";
import { User } from "../../model/chat-types";
import axiosApi from "../../config/axiosConfig";
import AddChatNamePopup from "./AddChatNamePopup";

interface AddChatUserProps {
  id: number;
  chatGroupUsersIds: number[];
  availableUsers: User[];
  fetchMessages: () => void;
}

const AddChatUser : React.FC<AddChatUserProps> = ({ id, chatGroupUsersIds, availableUsers, fetchMessages }) =>  {

  const [isAddChatNameOpen, setAddChatNameOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    
    setFilteredUsers(availableUsers.filter(user => !chatGroupUsersIds.includes(user.id)));

  },[availableUsers, chatGroupUsersIds, id]);
  
  const handleAddChatName = async (user2: User) => {
    // console.log('Added user2 : ', user2);
    const user1Id = Math.min(id,user2.id);
    const user2Id = Math.max(id,user2.id);
    
    const chatRequest = {
      user1Id: user1Id,
      user2Id: user2Id,
      roomId: `user${user1Id}_user${user2Id}`
    };

    axiosApi.post('/api/v1/messages/create', chatRequest)
      .then(response => {
        console.log('Chat created successfully:', response.data);
        fetchMessages();
      })
      .catch(error => {
        console.error('Error creating chat:', error.response ? error.response.data : error.message);
        // Handle error, show error message, etc.
      });
  };

  return (
    <>
    
    {/* <div className="absolute bottom-0 right-0 mr-2 "> */}
    <div className="flex justify-end mr-2 ">
        <button
          onClick={() => setAddChatNameOpen(true)}
          className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full">
          <svg className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>

      {isAddChatNameOpen &&
        <AddChatNamePopup
          isOpen={isAddChatNameOpen}
          onClose={() => setAddChatNameOpen(false)}
          onSubmit={handleAddChatName}
          filteredUsers={filteredUsers}
        />
      }
    
    </>
  )
}

export default AddChatUser;
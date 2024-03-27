import React, { useEffect, useState } from 'react';
import { Message } from '../../model/chat-types';
import { useSelector } from 'react-redux';
import { AuthState, ChatState } from '../../model/slice-types';
import { Avatar } from '@mui/material';

interface ChatTextsPanelProps {
  // chatItem: ChatItem | null;
  messages: Message[] | null;
}

const ChatTextsPanel: React.FC<ChatTextsPanelProps> = ({ messages }) => {
  const { id } = useSelector((state: { auth: AuthState }) => state.auth);
  const { chatItem } = useSelector((state: { chat: ChatState }) => state.chat);
  const [otherUser, setOtherUser] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (chatItem) {
      const foundUser = chatItem.users.find((user) => user.id !== id);
      setOtherUser(foundUser?.fullname);
    }

  }, [chatItem]);

  function stringAvatar(name: string, isUser: boolean) {
    const initials = name == "You" ? "You" : name.split(" ").map((part) => part[0]).join("").toUpperCase();

    return {
      sx: {
        bgcolor: isUser ? "#1A4712" : "#8E3424"
      },
      children: initials
    };
  }

  return (
    <>
      {chatItem ? (
        <>
          <div className='text-sm text-red-400 inline-flex justify-center items-baseline rounded-lg shadow-lg bg-slate-300 p-2 mb-2'>
            <span className='mx-2 text-lg font-bold'>{otherUser}</span>
          </div>

          {messages && messages.length > 0 ? (
            <div className='flex flex-col items-start overflow-y-auto max-h-52 min-h-52'>
              {messages.map((msg, index) => (
                <div key={index} className='flex items-center'>
                  <span>
                    {msg.senderId == id ?
                      <Avatar style={{ width: '25px', height: ' 25px', fontSize: '10px' }} {...stringAvatar("You", true)} />
                      :
                      <Avatar style={{ width: '25px', height: ' 25px', fontSize: '10px' }} {...stringAvatar(otherUser!, false)} />
                    }
                  </span>
                  <span className='ml-2 text-lg text-white'>{msg.content}</span>
                </div>
              ))}
            </div>
          
          ) : (
            <p className='text-center'>
              <span className='text-red-500 text-lg font-mono '>No Messages</span>
            </p>
          )}

        </>
      ) : (
        <div className='text-center'>
          <span className=' italic font-mono text-red-500'>No Chats <b className='underline'>or</b> Select an user</span>
        </div>
      )}
    </>
  );
};

export default ChatTextsPanel;

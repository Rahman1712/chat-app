import React, { useState } from 'react';
import Stomp from 'stompjs';
import { ChatItem } from '../../model/chat-types';

interface ChatFormProps {
  id: number;
  stompClient: Stomp.Client | null;
  roomId: string;
  chatItem: ChatItem;
}

const ChatForm: React.FC<ChatFormProps> = ({ id, stompClient, roomId, chatItem }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === '') {
      return;
    }

    try {

      stompClient!.send(`/app/chat/${roomId}`, {}, JSON.stringify(
        {
          roomId: roomId,
          chatId: chatItem.id,
          content: newMessage,
          contentType: 'text',
          senderId: id
        }));

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (

    <>
      <div className="w-full">
        <form onSubmit={handleSendMessage} className='w-full flex justify-center items-center gap-2'>

          <input
            type="text"
            className='w-9/12 h-10 px-2 text-sm font-poppins border border-blue-300 rounded-lg'
            placeholder="Type your message...."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <button type="submit" className='bg-indigo-200 h-10 font-bold text-lg p-2 rounded-lg shadow-md hover:bg-white hover:text-indigo-950'>Send</button>
        </form>
      </div>
    </>

  );
};

export default ChatForm;

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
      <form onSubmit={handleSendMessage}>

        <input
          type="text"
          placeholder="Type your message...."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button type="submit">send</button>
      </form>
    </>

  );
};

export default ChatForm;

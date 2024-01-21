import { Box } from '@mui/material';
import React from 'react';
import { ChatItem, Message } from '../../model/chat-types';

interface ChatTextsPanelProps {
  chatItem: ChatItem | null;
  messages: Message[] | null;
}

const ChatTextsPanel: React.FC<ChatTextsPanelProps> = ({ chatItem, messages }) => {
  return (
    <>
      {chatItem ? (
        <>
          <p>
            <span>HEAD $</span> 🗨️🗨️🗨️
          </p>
          <Box display="flex" flexDirection="row" alignItems="center">
            {messages && messages.length > 0 ? (
              messages.map((msg, index) => (
                <Box key={index} display="flex" alignItems="center" marginRight="1rem">
                  <span>{msg.senderId}</span>
                  <span>{msg.content}</span>
                </Box>
              ))
            ) : (
              <p>No Messages</p>
            )}
          </Box>
        </>
      ) : (
        <p>No Chats</p>
      )}
    </>
  );
};

export default ChatTextsPanel;

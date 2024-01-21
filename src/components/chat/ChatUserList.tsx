
import React from 'react';
import { chatActions } from '../../store/chat-slice';
import { useDispatch } from 'react-redux';
import { ChatItem, User } from '../../model/chat-types';

interface ChatUserListProps {
  id: number;
  chatGroupUsers: ChatItem[];
}

const ChatUserList: React.FC<ChatUserListProps> = ({ id, chatGroupUsers }) => {
  const dispatch = useDispatch();

  const setActiveRoom = (roomId: string) => {
    dispatch(chatActions.setRoomId(roomId));
  }

  return (
    <>
      {chatGroupUsers.map((chat, i) => (
        <p
          key={i}
          onClick={() => {
            setActiveRoom(chat.roomId);
          }}
        >
          <span>{getUserFullName(chat.users, id)} $</span>
        </p>
      ))}
    </>
  );
};

const getUserFullName = (users: User[] | undefined, id: number): string => {
  const defaultName = 'Unknown User';

  if (users && users.length > 0) {
    const foundUser = users.find((user) => user.id !== id);

    if (foundUser) {
      return foundUser.fullname;
    }
  }

  return defaultName;
};

export default ChatUserList;


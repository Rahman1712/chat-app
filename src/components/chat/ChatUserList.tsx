
import React from 'react';
import { chatActions } from '../../store/chat-slice';
import { useDispatch } from 'react-redux';
import { ChatItem, User } from '../../model/chat-types';
import Avatar from '@mui/material/Avatar';

interface ChatUserListProps {
  id: number;
  chatGroupUsers: ChatItem[];
  chatItem: ChatItem | null;
}

const ChatUserList: React.FC<ChatUserListProps> = ({ id, chatGroupUsers, chatItem }) => {
  const dispatch = useDispatch();

  const setActiveRoom = (roomId: string) => {
    dispatch(chatActions.setRoomId(roomId));
  }

  function stringToColor(name: string) {
    let hash = 0;
    let i;

    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    const initials = name.split(" ").map((part) => part[0]).join("").toUpperCase();

    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: initials
    };
  }

  return (
    <>
      {chatGroupUsers.map((chat, i) => (
        <p
          key={i}
          onClick={() => {
            setActiveRoom(chat.roomId);
          }}
          className={`flex items-center cursor-pointer text-sm ml-1 `}
        >
          <Avatar style={{width: '20px', height:' 20px', fontSize: '10px'}} {...stringAvatar(getUserFullName(chat.users, id))} />
          <span className={`text-sm ml-1 ${chatItem && chatItem.roomId  === chat.roomId ? 'font-extrabold bg-opacity-50 text-[#36abff] bg-[#46535c] px-1' : ''}`}>
            {getUserFullName(chat.users, id)}
          </span>
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


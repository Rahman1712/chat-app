import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { User } from '../../model/chat-types';
// import { Modal } from 'react-modal';
import Modal from 'react-modal';

interface AddChatNamePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user2: User) => Promise<void>;
  filteredUsers: User[];
}

const AddChatNamePopup : React.FC<AddChatNamePopupProps> = ({ isOpen, onClose, onSubmit, filteredUsers }) => {

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleSubmit = () => {
    if (selectedUser) {
      onSubmit(selectedUser);
      setSelectedUser(null);
      onClose();
    }
  };


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
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none"
      overlayClassName="fixed inset-0 bg-transparent"
    >
      <div className="bg-slate-200 w-96 p-6 rounded-md shadow-lg font-poppins">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Add to Chat</h2>
        <div className="mb-4 overflow-y-auto max-h-52">
          <label className="block text-sm font-semibold text-gray-600">
            Available Users List:
          </label>
          <ul className="list-none p-0 mt-2 ">
            {filteredUsers.map((user, i) => (
              <li
                key={i}
                onClick={() => handleUserClick(user)}
                className={`flex items-center cursor-pointer p-2 rounded-md ${
                  selectedUser && selectedUser.id === user.id
                    ? 'bg-blue-200 '
                    : ''
                }`}
              >
                <Avatar  style={{width: '25px', height:' 25px', fontSize: '12px'}} {...stringAvatar(user.fullname)} />
                <span className='text-indigo-950 ml-2 font-bold text-sm'>{user.fullname}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-slate-400 hover:bg-white hover:shadow-xl border-2 font-bold text-sm text-gray-800 rounded-full"
          >
            Add to Chat
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddChatNamePopup;

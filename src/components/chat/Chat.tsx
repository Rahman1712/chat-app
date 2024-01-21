import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from 'stompjs';
import { chatActions } from '../../store/chat-slice';
import axiosApi from "../../config/axiosConfig";
import { Box, Grid } from "@mui/material";
import Terminal from "./Terminal";
import React from 'react';
import ChatUserList from "./ChatUserList";
import ChatTextsPanel from "./ChatTextsPanel";
import ChatForm from "./ChatForm";
import { ChatItem, Message, User } from "../../model/chat-types";
import { AuthState, ChatState } from "../../model/slice-types";
import Style from "./Chat.module.scss";
import { themeActions } from "../../store/theme-slice";

const WEBSOCKET_URI = import.meta.env.VITE_WEBSOCKET_URI;

interface ChatProps {
  darkMode: boolean;
}

const Chat: React.FC<ChatProps> = ({ darkMode }) => {

  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [chatGroupUsers, setChatGroupUsers] = useState<ChatItem[]>([]);

  const { id, access_token } = useSelector((state: { auth: AuthState }) => state.auth);
  const { roomId, chatItem } = useSelector((state: { chat: ChatState }) => state.chat);

  const dispatch = useDispatch();

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length == 2) {
      return parts.pop()!.split(";").shift();
    }
  }

  useEffect(() => {
    console.log(access_token);

    const socket = new SockJS(
      WEBSOCKET_URI,
      null,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    const stomp = Stomp.over(socket);

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
    }

    stomp.connect(headers, () => {
      setStompClient(stomp);

      stomp.subscribe(`/topic/chat/${roomId}`, (message) => {
        // Handle incoming messages
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      },
        { Authorization: `Bearer ${access_token}` },
      );

    },
      onError
    );

    fetchMessages();

    return () => {
      // Disconnect WebSocket on component unmount
      if (stomp.connected) {
        stomp.disconnect(() => {
          console.log('Disconnected from WebSocket');
        });
      }
    };

  }, [roomId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    console.log(error);
  };

  async function fetchMessages() {
    try {
      await loadUsersData();
    } catch (error) {
      console.error('Error loading all users data:', error);
    }

    try {
      await chatUsersData();
    } catch (error) {
      console.error('Error fetching chat users data:', error);
    }

    try {
      await fetchChatByRoomId(roomId);
    } catch (error) {
      console.error('Error fetching chat by roomId:', error);
    }
  }

  async function fetchChatByRoomId(roomId: string) {
    if (!roomId) { return; }
    try {
      const response = await axiosApi.get(`/api/v1/messages/by-roomId/${roomId}`);
      console.log("Chat data ", response.data);
      setMessages(response.data.messages);
      dispatch(chatActions.setChatItem(response.data))
    } catch (error) {
      console.error(error);
    }
  }


  const loadUsersData = async () => {
    try {
      const response = await axiosApi.get(`/api/v1/user/all`);
      console.log(response.data);
      setAvailableUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const chatUsersData = async () => {
    try {
      const response = await axiosApi.get(`/api/v1/messages/chatUsers/${id}`);
      console.log(response.data);
      setChatGroupUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dispatch(themeActions.setNavLink("chat"));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mt={'3rem'}>
        <Grid container spacing={1} marginRight={'10px'} marginLeft={'10px'}>
          <Grid item xs={12} sm={4} md={6} lg={4} display={'flex'} justifyContent={'center'}>
            <Terminal>
              <ChatUserList id={id} chatGroupUsers={chatGroupUsers} />
            </Terminal>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={8} display={'flex'} justifyContent={'center'}>
            <Terminal>
              <ChatTextsPanel chatItem={chatItem} messages={messages} />
            </Terminal>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <ChatForm
              id={id}
              stompClient={stompClient}
              roomId={roomId}
              chatItem={chatItem!}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Chat;

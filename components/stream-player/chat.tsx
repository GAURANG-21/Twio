"use client";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  viewer,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  //* To match for the dynamic changes in screen size
  const matches = useMediaQuery("(max-width:1024px)");
  const { variant, onExpand } = useChatSidebar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  //* User can only be online if there exists a host and that the viewer(user) is connected to the LiveKit Room
  const isOnline = participant && connectionState === ConnectionState.Connected;

  //*Chats can't be sent if they are disabled or the host is not online
  const isHidden = !isChatEnabled && !isOnline;

  const [value, setValue] = useState(""); // Message to be sent
  const { chatMessages: messages, send } = useChat(); //Manages chats sent in the specific room

  //* Chat shouldn't be hidden on small screen size
  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  //* Last message should be at the bottom and therefore reverse the array of messages
  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  //* Whenever the send button is clicked, value is sent to messages array and displayed
  const onSubmit = () => {
    if (!value) return;
    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col pt-0 bg-background border-l border-b h-[calc(100vh-80px)]">
      <ChatHeader />
    </div>
  );
};

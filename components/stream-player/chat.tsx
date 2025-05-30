"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

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
  viewerName,
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
  const isHidden = !isOnline || !isChatEnabled;

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
      {variant == ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            onChange={onChange}
            value={value}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
};

export function ChatSkeleton() {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
}

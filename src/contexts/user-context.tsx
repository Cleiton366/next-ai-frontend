'use client'
import { ChatEntity } from '@/entities/chat/chat-entity';
import { UserEntity } from '@/entities/user/user-entity';
import ArchivesService from '@/services/archives-service';
import ChatsServices from '@/services/chats-service';
import { createContext, useState, useEffect, useContext } from 'react';

type UserContextType = {
  user: UserEntity | null;
  setUser: (user: UserEntity | null) => void;
  getUser: () => UserEntity | null;
  loadUser: () => void;
  clearUser: () => void;
  fetchChats: () => void;
  chats: ChatEntity[];
  archives: ChatEntity[];
  currentChat: ChatEntity | null;
  setChats: (chats: ChatEntity[]) => void;
  setArchives: (chats: ChatEntity[]) => void;
  setCurrentChat: (chat: ChatEntity | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  chats: [],
  archives: [],
  currentChat: null,
  setUser: () => { },
  getUser: () => { return null },
  loadUser: () => { },
  clearUser: () => { },
  fetchChats: () => { },
  setChats: () => { },
  setArchives: () => { },
  setCurrentChat: () => { },
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chatsServices = new ChatsServices();
  const archivesService = new ArchivesService();

  const [user, setUser] = useState<UserEntity | null>(null);
  const [chats, setChats] = useState<ChatEntity[]>([]);
  const [archives, setArchives] = useState<ChatEntity[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatEntity | null>(null);

  const loadUser = () => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  function getUser(): UserEntity | null {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      return JSON.parse(storedUser) as UserEntity;
    }
    return null;
  }

  async function fetchChats() {
    if (user) {
      const chats = await chatsServices.getChats(user.id);
      const archives = await archivesService.getArchivesChat(user.id);
      setChats(chats || []);
      setArchives(archives || []);
    }
  };

  const clearUser = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      getUser,
      loadUser,
      clearUser,
      fetchChats,
      chats,
      archives,
      currentChat,
      setChats,
      setArchives,
      setCurrentChat
    }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  return useContext(UserContext);
};

export { UserProvider, UserContext, useUser };
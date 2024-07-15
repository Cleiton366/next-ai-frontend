'use client'
import { ChatEntity } from '@/entities/chat/chat-entity';
import { UserEntity } from '@/entities/user/user-entity';
import ArchivesService from '@/services/archives-service';
import ChatsServices from '@/services/chats-service';
import UserService from '@/services/user-service';
import { createContext, useState, useEffect, useContext } from 'react';

type UserContextType = {
  user: UserEntity | null;
  setUser: (user: UserEntity | null) => void;
  getUser: () => Promise<UserEntity | null>;
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
  getUser: async () => null,
  clearUser: () => { },
  fetchChats: () => { },
  setChats: () => { },
  setArchives: () => { },
  setCurrentChat: () => { },
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chatsServices = new ChatsServices();
  const archivesService = new ArchivesService();
  const userService = new UserService();

  const [user, setUser] = useState<UserEntity | null>(null);
  const [chats, setChats] = useState<ChatEntity[]>([]);
  const [archives, setArchives] = useState<ChatEntity[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatEntity | null>(null);

  async function getUser(): Promise<UserEntity | null> {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      const userData = JSON.parse(storedUser) as UserEntity;
      const user = await userService.getUser(userData.id);
      return user;
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
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        setUser(user);
      }
    }
    fetchUser();
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
'use client'
import { ChatEntity } from '@/entities/chat/chat-entity';
import { Model } from '@/entities/provider/models-entity';
import { ProviderEntity } from '@/entities/provider/provider-entity';
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
  models: Model[];
  defaultModel: string;
  defaultProvider: string;
  APIs: ProviderEntity[];
  setChats: (chats: ChatEntity[]) => void;
  setArchives: (chats: ChatEntity[]) => void;
  setCurrentChat: (chat: ChatEntity | null) => void;
  setModels: (models: Model[]) => void;
  setDefaultModel: (model: string) => void;
  setDefaultProvider: (provider: string) => void;
  setAPIs: (apis: ProviderEntity[]) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  chats: [],
  archives: [],
  currentChat: null,
  models: [],
  defaultModel: '',
  defaultProvider: '',
  APIs: [],
  setUser: () => { },
  getUser: async () => null,
  clearUser: () => { },
  fetchChats: () => { },
  setChats: () => { },
  setArchives: () => { },
  setCurrentChat: () => { },
  setModels: () => { },
  setDefaultModel: () => { },
  setDefaultProvider: () => { },
  setAPIs: () => { }
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chatsServices = new ChatsServices();
  const archivesService = new ArchivesService();
  const userService = new UserService();

  const [user, setUser] = useState<UserEntity | null>(null);
  const [chats, setChats] = useState<ChatEntity[]>([]);
  const [archives, setArchives] = useState<ChatEntity[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatEntity | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [defaultModel, setDefaultModel] = useState('');
  const [defaultProvider, setDefaultProvider] = useState('');
  const [APIs, setAPIs] = useState<ProviderEntity[]>([]);

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
      models,
      defaultModel,
      defaultProvider,
      APIs,
      archives,
      currentChat,
      setChats,
      setArchives,
      setCurrentChat,
      setModels,
      setDefaultModel,
      setDefaultProvider,
      setAPIs
    }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  return useContext(UserContext);
};

export { UserProvider, UserContext, useUser };
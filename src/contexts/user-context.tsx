'use client'
import { UserEntity } from '@/entities/user/user-entity';
import { createContext, useState, useEffect, useContext } from 'react';

type UserContextType = {
  user: UserEntity| null;
  setUser: (user: UserEntity | null) => void;
  getUser: () => UserEntity | null;
  loadUser: () => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
  getUser: () => { return null },
  loadUser: () => { },
  clearUser: () => { },
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserEntity | null>(null);

  const loadUser = () => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };


  function getUser () : UserEntity | null {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      return JSON.parse(storedUser) as UserEntity;
    }
    return null;
  }


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
    <UserContext.Provider value={{ user, setUser, getUser, loadUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  return useContext(UserContext);
};

export { UserProvider, UserContext, useUser };
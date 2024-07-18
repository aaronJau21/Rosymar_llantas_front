import { create } from 'zustand';
import { User } from '../interfaces';
import { persist } from 'zustand/middleware';

interface LoginStore {
  token: string;
  user: User;

  setToken: ( token: string ) => void;
  setUser: ( user: User ) => void;
}

export const useLoginStore = create<LoginStore>()(
  persist(
    ( set ) => ( {
      token: '',
      user: {
        name: '',
        dni: '',
        role: ''
      },
      setToken: ( token: string ) => set( { token } ),
      setUser: ( user: User ) => set( { user } )
    } ), { name: 'person-store' } )
);
import { create } from 'zustand/react'
import { persist } from 'zustand/middleware'
import type { Session } from '../models/login'

type State = {
  session: Session | null
  isAuth: boolean
}

type Actions = {
  setAuth: (isAuth: boolean) => void
  setSession: (session: Session | null) => void
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      session: null,
      isAuth: false,
      setAuth: (isAuth: boolean) => set(() => ({ isAuth })),
      setSession: (session: Session | null) => set(() => ({ session })),
    }),
    {
      name: 'auth',
    }
  )
)

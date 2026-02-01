import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react"
import type { Role, User } from "../domain/types"

type SessionContextValue = {
  currentUser: User | null
  setRole: (role: Role) => void
  logout: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

const makeUser = (role: Role): User => ({
  id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
  role,
})

export function SessionProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const setRole = (role: Role) => {
    setCurrentUser(makeUser(role))
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({
      currentUser,
      setRole,
      logout,
    }),
    [currentUser],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider")
  }
  return ctx
}

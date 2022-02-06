import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import { Credentials } from "../../pages";

interface IAuthContext {
  isAuthenticated: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren<{}>;
export function AuthProvider(props: AuthProviderProps) {
  const { ...rest } = props;
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const signIn = useCallback(async (cred: Credentials) => {
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(async () => {
    setIsAuthenticated(false);
  }, []);

  const value = { isAuthenticated, signIn, signOut }; // TODO: memoize

  return <AuthContext.Provider {...rest} value={value} />;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Cannot use 'useAuth' outside of '<AuthProvider />'");
  }
  return context;
}

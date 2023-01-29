
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState({} as UserProps);

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true
  })

  const [resquest, response, promptAsync] = Google.useAuthRequest({
    clientId: '582049503297-u6vqf0jaeo5cfqkeo0he13mbrqon72c6.apps.googleusercontent.com',
    redirectUri
  })

  async function signIn () {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle (accessToken: string) {
    console.log('token ===> ', accessToken);
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
};
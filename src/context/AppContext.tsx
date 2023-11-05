import { User } from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type AppContextProps = {
  children: ReactNode;
};

type AppContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const AppContext = createContext<AppContext | null>(null);

export const useAppContext = () => {
  const value = useContext(AppContext);
  if (value === null)
    throw new Error("Please use app context in the app provider");
  return value;
};

const AppProvider = ({ children }: AppContextProps) => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

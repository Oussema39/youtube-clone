import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initializeApp, FirebaseApp, deleteApp } from "firebase/app";
import { firebaseConfig } from "../utils/config";
import { Firestore, getFirestore } from "firebase/firestore";

export type FirebaseContextType = {
  app: FirebaseApp | null;
  db: Firestore | null;
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);

  const value = useMemo<FirebaseContextType>(
    () => ({ app, db }),
    [app, db, setApp, setDb]
  );

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    setApp(app);
    setDb(firestore);

    return () => {
      deleteApp(app);
    };
  }, []);

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const firebaseApp = useContext(FirebaseContext);
  if (firebaseApp === undefined)
    throw Error("Cannot use Firebase context out of its Provider");
  return firebaseApp;
};

export default FirebaseProvider;

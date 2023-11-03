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
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

export type FirebaseContextType = {
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
  googleProvider: GoogleAuthProvider | null;
  storage: FirebaseStorage | null;
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [storage, setStorage] = useState<FirebaseStorage | null>(null);

  const googleProvider = new GoogleAuthProvider();

  const value = useMemo<FirebaseContextType>(
    () => ({ app, db, auth, googleProvider, storage }),
    [app, db, auth, googleProvider, storage, setStorage, setApp, setDb, setAuth]
  );

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    setApp(app);
    setDb(getFirestore(app));
    setAuth(getAuth(app));
    setStorage(getStorage(app));

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
  if (firebaseApp === null)
    throw Error("Cannot use Firebase context out of its Provider");
  return firebaseApp;
};

export default FirebaseProvider;

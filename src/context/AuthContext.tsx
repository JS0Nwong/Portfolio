import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth, db } from "../lib/firebase";
import { User } from "firebase/auth";

import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  messages: any[];
  signIn: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "guestbook", "messages"),
      (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages);
        } else {
          setMessages([]);
        }
      },
      (error) => {
        console.log(error);
        setMessages([]);
      }
    );

    return unsub;
  }, []);

  const signIn = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider value={{ user, messages, signIn }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

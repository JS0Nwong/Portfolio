import { useContext, createContext, useState, useEffect } from "react"
import { auth, db } from "../utils/firebase"
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
import { onSnapshot, doc } from "firebase/firestore"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false)
    const [loading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState([])

    const provider = new GoogleAuthProvider()

    useEffect(() => {
        const unsub = onAuthStateChanged((auth), user => {
            setUser(user)
            setIsLoading(false)
        })
        return unsub
    }, [])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'guestbook', 'messages'), (doc) => {
            if (doc.exists) {
                setMessages(doc.data().messages)
            } else {
                setMessages([])
            }
        }, (error) => {
            console.log(error)
            setMessages([])
        })

        return unsub
    }, [])

    const signIn = async () => {
        await signInWithPopup(auth, provider)
    }

    return (
        <AuthContext.Provider value={{ user, messages, signIn }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
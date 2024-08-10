import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase";
import { getDoc, setDoc, arrayUnion, doc } from 'firebase/firestore'
import GuestbookLists from "../components/GuestbookLists";
import { useEffect } from "react";

export default function Guestbook() {
    const { user, signIn, messages } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = e.target.value.trim()
        if (message !== '') {
            const newMessage = {
                message,
                user: user.displayName,
                timestamp: new Date()
            }

            const guestbookRef = doc(db, 'guestbook', 'messages')
            const getDocRef = getDoc(guestbookRef)
            if (!getDocRef.exists) {
                await setDoc(guestbookRef, {
                    messages: arrayUnion(newMessage)
                })
                e.target.value = ''
                return
            } else {
                await setDoc(guestbookRef, {
                    messages: arrayUnion(newMessage)
                }, { merge: true })
                e.target.value = ''
                return
            }
        } else {
            alert('Please enter a message')
        }
    }

    return (
        <div className="pt-16 md:pt-16 flex flex-col">
            <h1 className="text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-100">
                sign my guestbook
            </h1>
            <p className="text-xs mt-2 font-medium text-neutral-400 dark:text-neutral-500">or not it's up to you</p>

            <form className="mt-10" onSubmit={user ? handleSubmit : signIn}>
                {user
                    ? <textarea
                        defaultValue=''
                        placeholder="Leave a message!"
                        aria-label="Leave a message"
                        name='sign'
                        id='sign'
                        rows='4'
                        maxLength={250}
                        autoFocus={true}
                        onKeyDown={(e) => e.key === 'Enter' && e.shiftKey === false ? handleSubmit(e) : null}
                        className="resize-none w-full p-4 rounded-md border dark:text-neutral-200 text-neutral-800 border-neutral-200 dark:border-neutral-800 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700 dark:focus:ring-neutral-300 bg-transparent"
                    />
                    : <button
                        type="submit"
                        className="flex items-center bg-transparent px-3 py-2 rounded-md font-medium text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-100"
                    >
                        <FcGoogle className="mr-2 size-4" />
                        Sign in with Google
                    </button>
                }
            </form>
            <ul className="mt-12 list-none">
                {messages.map((message, index) => (
                    <GuestbookLists
                        key={index}
                        author={message.user}
                        message={message.message}
                    />
                ))}

            </ul>
        </div>
    )
}


export default function Container({ children }) {
    return (
        <div className='max-w-screen-md m-auto min-h-dvh h-full p-6 md:p-12'>
            {children}
        </div>
    )
}

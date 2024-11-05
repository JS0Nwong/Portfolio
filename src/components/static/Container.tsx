export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-screen-md m-auto min-h-dvh h-full p-6 md:p-12 relative">
      {children}
    </div>
  );
}

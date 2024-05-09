export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="duration-500 animate-in fade-in slide-in-from-bottom-1">
      {children}
    </div>
  );
};

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-in duration-500 fade-in slide-in-from-bottom-1">
      {children}
    </div>
  );
};

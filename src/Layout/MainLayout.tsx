interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className="flex flex-1 h-[100vh] px-48">{children}</div>;
};

export default MainLayout;

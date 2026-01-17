import { Header } from "./header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 m-auto min-w-[1200px]">
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
};

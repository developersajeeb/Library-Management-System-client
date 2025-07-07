import { Outlet } from "react-router";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/sonner";
import Footer from "./components/Footer";


const App = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Toaster />
        <main className="w-full">
          <nav className="flex items-center justify-between p-4 flex-row-reverse md:flex-row bg-gray-100 md:bg-transparent">
            <div className="bg-gray-200 p-2 rounded-full cursor-pointer"><SidebarTrigger className="cursor-pointer" /></div>
            <img src="/image/logo.png" alt="EduShelf" className="w-full max-w-40 md:hidden" />
          </nav>
          <div className="pl-5 pr-5 md:pr-10 py-5"><Outlet /></div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default App;
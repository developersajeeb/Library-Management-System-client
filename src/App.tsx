import { Outlet } from "react-router";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";


const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="pl-5 pr-10 py-5"><Outlet/></div>
      </main>
    </SidebarProvider>
  );
};

export default App;
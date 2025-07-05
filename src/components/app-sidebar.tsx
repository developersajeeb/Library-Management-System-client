import { BookText, LayoutDashboard, ScrollText } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Books",
    url: "books",
    icon: BookText,
  },
  {
    title: "Borrow Summary",
    url: "borrow-summary",
    icon: ScrollText,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white py-6 px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-12">
            <a href="/"><img src="/image/logo.png" alt="EduShelf" /></a>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                    <NavLink to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-[#A87242] text-white" : "hover:bg-[#fbfbd4] text-gray-600 hover:text-[#A87242]"
                        } duration-300 text-base font-medium mb-2`
                      }>
                      <item.icon size={20} />
                      <span className="">{item.title}</span>
                    </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
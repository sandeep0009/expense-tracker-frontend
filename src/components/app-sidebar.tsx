import { PieChart, Wallet, BarChart2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const items = [
  {
    title: "Income",
    url: "/income",
    icon: Wallet,

  },
  {
    title: "Dashboard",
    url: "/",
    icon: PieChart,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart2,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-center text-2xl text-black mb-4">
          Pocket Pilot
          </SidebarGroupLabel>
          <hr className="max-w-full mt-2 " />
          <SidebarGroupContent>
            <SidebarMenu className="space-y-6 mt-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-4">
                      <item.icon className="text-xl" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

import { useLocation } from "react-router-dom";
import { LayoutGrid, Calendar, MessageSquare, FileText, Wallet, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    { name: "My Bookings", icon: Calendar, href: "/bookings" },
    { name: "My Games", icon: Wallet, href: "/my_games" },
    { name: "Chat", icon: MessageSquare, href: "/chat" },
    { name: "Invoices", icon: FileText, href: "/invoices" },
    { name: "Profile Setting", icon: UserCog, href: "/profile" },
  ];

  return (

    <div className="overflow-x-auto bg-gray-50">
      <nav className="flex justify-center gap-4 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center p-4 rounded-xl transition-colors min-w-[120px]
              ${isActive ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-white hover:bg-gray-100"}`}
            >
              <item.icon className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

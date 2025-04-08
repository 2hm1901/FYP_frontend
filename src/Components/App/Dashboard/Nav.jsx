import { useContext } from "react";
import { LayoutGrid, Calendar, MessageSquare, FileText, Gamepad2, UserCog, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";

export default function Nav() {
  const location = useLocation();
  const { user } = useContext(AppContext);

  // Xác định các mục nav dựa trên user_type
  const baseNavItems = [
    { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    ...(user?.user_type === "owner"
      ? [{ name: "Quản lý sân", icon: FileText, href: "/my_courts" }]
      : []),
    {
      name: "Sân đã đặt",
      icon: Calendar,
      href: user?.user_type === "owner" ? "/view_bookings" : "/bookings",
    },
    ...(user?.user_type === "renter"
      ? [{ name: "Game đã tạo", icon: Gamepad2, href: "/my_games" }]
      : []),
    { name: "Yêu Cầu", icon: Clock, href: "/requests" },
    { name: "Chat", icon: MessageSquare, href: "/chat" },
    { name: "Hồ Sơ", icon: UserCog, href: "/profile" },
  ].filter(Boolean); // Loại bỏ các giá trị falsy (nếu có)

  const navItems = [...baseNavItems];

  return (
    <div className="overflow-x-auto bg-gray-50">
      <nav className="flex justify-center gap-4 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center p-4 rounded-xl transition-colors min-w-[120px] ${
                isActive
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-white hover:bg-gray-100"
              }`}
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
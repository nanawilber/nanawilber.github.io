"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Music,
  Info,
  Link as LinkIcon,
  Image,
  Calendar,
  Home,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Releases", href: "/admin/releases", icon: Music },
  { name: "About Sections", href: "/admin/about", icon: Info },
  { name: "Social Links", href: "/admin/social", icon: LinkIcon },
  { name: "Hero Content", href: "/admin/hero", icon: Image },
  { name: "Tour Dates", href: "/admin/tour", icon: Calendar },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="w-64 min-h-screen bg-card border-r p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Brapurple <span className="text-primary">CMS</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Content Management</p>
      </div>

      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>View Website</span>
        </Link>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-3"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}

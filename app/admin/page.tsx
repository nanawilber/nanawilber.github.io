"use client";

import { useEffect, useState } from "react";
import { Music, Info, LinkIcon, Calendar } from "lucide-react";
import Link from "next/link";

interface Stats {
  releases: number;
  aboutSections: number;
  socialLinks: number;
  tourDates: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    releases: 0,
    aboutSections: 0,
    socialLinks: 0,
    tourDates: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // We'll create these API routes next
      const [releases, about, social, tour] = await Promise.all([
        fetch("/api/admin/releases").then((r) => r.json()),
        fetch("/api/admin/about").then((r) => r.json()),
        fetch("/api/admin/social").then((r) => r.json()),
        fetch("/api/admin/tour").then((r) => r.json()),
      ]);

      setStats({
        releases: releases.data?.length || 0,
        aboutSections: about.data?.length || 0,
        socialLinks: social.data?.length || 0,
        tourDates: tour.data?.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Releases",
      count: stats.releases,
      icon: Music,
      href: "/admin/releases",
      color: "text-blue-500",
    },
    {
      title: "About Sections",
      count: stats.aboutSections,
      icon: Info,
      href: "/admin/about",
      color: "text-green-500",
    },
    {
      title: "Social Links",
      count: stats.socialLinks,
      icon: LinkIcon,
      href: "/admin/social",
      color: "text-purple-500",
    },
    {
      title: "Tour Dates",
      count: stats.tourDates,
      icon: Calendar,
      href: "/admin/tour",
      color: "text-orange-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome to the <span className="text-primary">CMS</span>
        </h1>
        <p className="text-muted-foreground">
          Manage your artist website content from one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="block p-6 bg-card rounded-lg border hover:border-primary transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${card.color}`} />
                {loading ? (
                  <div className="h-8 w-12 bg-muted animate-pulse rounded" />
                ) : (
                  <span className="text-3xl font-bold">{card.count}</span>
                )}
              </div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong className="text-foreground">1. Set up Supabase:</strong>{" "}
            Make sure you've added your Supabase credentials to the{" "}
            <code className="bg-muted px-2 py-1 rounded">.env.local</code> file
          </p>
          <p>
            <strong className="text-foreground">2. Run the SQL schema:</strong>{" "}
            Execute the{" "}
            <code className="bg-muted px-2 py-1 rounded">
              supabase-schema.sql
            </code>{" "}
            file in your Supabase SQL editor
          </p>
          <p>
            <strong className="text-foreground">
              3. Create storage bucket:
            </strong>{" "}
            Create a public bucket named{" "}
            <code className="bg-muted px-2 py-1 rounded">artist-media</code> in
            Supabase Storage
          </p>
          <p>
            <strong className="text-foreground">4. Start managing:</strong> Use
            the navigation to add releases, update content, and manage your
            website
          </p>
        </div>
      </div>
    </div>
  );
}

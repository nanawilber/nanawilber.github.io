"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface HeroContent {
  id: string;
  heading_line1: string;
  heading_line2: string;
  subheading: string;
  hero_image_url: string;
}

export default function HeroPage() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    heading_line1: "",
    heading_line2: "",
    subheading: "",
    hero_image_url: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/admin/hero");
      const data = await response.json();
      if (data.data) {
        setContent(data.data);
        setFormData({
          heading_line1: data.data.heading_line1,
          heading_line2: data.data.heading_line2,
          subheading: data.data.subheading,
          hero_image_url: data.data.hero_image_url,
        });
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, hero_image_url: data.url }));
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = content ? "PATCH" : "POST";
      const body = content ? { id: content.id, ...formData } : formData;

      await fetch("/api/admin/hero", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await fetchContent();
      alert("Hero content updated successfully!");
    } catch (error) {
      alert("Failed to save");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Hero <span className="text-primary">Content</span>
        </h1>
        <p className="text-muted-foreground">
          Edit the hero section on your homepage
        </p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heading_line1">Heading Line 1 *</Label>
            <Input
              id="heading_line1"
              value={formData.heading_line1}
              onChange={(e) =>
                setFormData({ ...formData, heading_line1: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heading_line2">Heading Line 2 *</Label>
            <Input
              id="heading_line2"
              value={formData.heading_line2}
              onChange={(e) =>
                setFormData({ ...formData, heading_line2: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading *</Label>
            <Textarea
              id="subheading"
              value={formData.subheading}
              onChange={(e) =>
                setFormData({ ...formData, subheading: e.target.value })
              }
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_image">Hero Image *</Label>
            <Input
              id="hero_image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {formData.hero_image_url && (
              <div className="mt-4">
                <Image
                  src={formData.hero_image_url}
                  alt="Hero preview"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          <Button type="submit" disabled={uploading}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}

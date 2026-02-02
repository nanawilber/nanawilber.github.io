"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialLink {
  id: string;
  platform_name: string;
  platform_url: string;
  icon_url: string;
  display_order: number;
  is_active: boolean;
}

export default function SocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    platform_name: "",
    platform_url: "",
    icon_url: "",
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch("/api/admin/social");
      const data = await response.json();
      setLinks(data.data || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = "/api/admin/social";
      const method = editingId ? "PATCH" : "POST";
      const body = editingId ? { id: editingId, ...formData } : formData;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await fetchLinks();
      resetForm();
    } catch (error) {
      alert("Failed to save");
    }
  };

  const handleEdit = (link: SocialLink) => {
    setFormData({
      platform_name: link.platform_name,
      platform_url: link.platform_url,
      icon_url: link.icon_url,
      display_order: link.display_order,
      is_active: link.is_active,
    });
    setEditingId(link.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;

    try {
      await fetch(`/api/admin/social?id=${id}`, { method: "DELETE" });
      await fetchLinks();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const resetForm = () => {
    setFormData({
      platform_name: "",
      platform_url: "",
      icon_url: "",
      display_order: 0,
      is_active: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Social <span className="text-primary">Links</span>
          </h1>
          <p className="text-muted-foreground">
            Manage streaming platform links
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? "Edit Link" : "New Link"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform_name">Platform Name *</Label>
                <Input
                  id="platform_name"
                  value={formData.platform_name}
                  onChange={(e) =>
                    setFormData({ ...formData, platform_name: e.target.value })
                  }
                  placeholder="e.g., spotify, appleMusic"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform_url">Platform URL *</Label>
                <Input
                  id="platform_url"
                  type="url"
                  value={formData.platform_url}
                  onChange={(e) =>
                    setFormData({ ...formData, platform_url: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon_url">Icon URL *</Label>
                <Input
                  id="icon_url"
                  value={formData.icon_url}
                  onChange={(e) =>
                    setFormData({ ...formData, icon_url: e.target.value })
                  }
                  placeholder="/images/spotify.svg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Update" : "Create"} Link
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link.id}
              className="p-6 bg-card rounded-lg border flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={link.icon_url}
                  alt={link.platform_name}
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="font-bold">{link.platform_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {link.platform_url}
                  </p>
                  <span
                    className={`text-xs ${
                      link.is_active ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {link.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(link)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(link.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

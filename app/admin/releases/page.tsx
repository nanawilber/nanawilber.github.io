"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface Release {
  id: string;
  title: string;
  artwork_url: string;
  listen_url: string;
  watch_url: string;
  release_date: string;
  display_order: number;
  is_featured: boolean;
}

export default function ReleasesPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artwork_url: "",
    listen_url: "",
    watch_url: "",
    release_date: "",
    display_order: 0,
    is_featured: false,
  });

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const response = await fetch("/api/admin/releases");
      const data = await response.json();
      setReleases(data.data || []);
    } catch (error) {
      console.error("Failed to fetch releases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, artwork_url: data.url }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = "/api/admin/releases";
      const method = editingId ? "PATCH" : "POST";
      const body = editingId ? { id: editingId, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save release");

      await fetchReleases();
      resetForm();
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save release");
    }
  };

  const handleEdit = (release: Release) => {
    setFormData({
      title: release.title,
      artwork_url: release.artwork_url,
      listen_url: release.listen_url,
      watch_url: release.watch_url,
      release_date: release.release_date || "",
      display_order: release.display_order,
      is_featured: release.is_featured,
    });
    setEditingId(release.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this release?")) return;

    try {
      const response = await fetch(`/api/admin/releases?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      await fetchReleases();
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete release");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      artwork_url: "",
      listen_url: "",
      watch_url: "",
      release_date: "",
      display_order: 0,
      is_featured: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Manage <span className="text-primary">Releases</span>
          </h1>
          <p className="text-muted-foreground">
            Add and manage your music releases
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Release
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? "Edit Release" : "New Release"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="release_date">Release Date</Label>
                <Input
                  id="release_date"
                  type="date"
                  value={formData.release_date}
                  onChange={(e) =>
                    setFormData({ ...formData, release_date: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="listen_url">Listen URL *</Label>
                <Input
                  id="listen_url"
                  type="url"
                  value={formData.listen_url}
                  onChange={(e) =>
                    setFormData({ ...formData, listen_url: e.target.value })
                  }
                  placeholder="https://song.link/..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="watch_url">Watch URL *</Label>
                <Input
                  id="watch_url"
                  type="url"
                  value={formData.watch_url}
                  onChange={(e) =>
                    setFormData({ ...formData, watch_url: e.target.value })
                  }
                  placeholder="https://youtube.com/..."
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

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) =>
                    setFormData({ ...formData, is_featured: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <Label htmlFor="is_featured">Featured Release</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="artwork">Artwork Image *</Label>
              <Input
                id="artwork"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {formData.artwork_url && (
                <div className="mt-2">
                  <Image
                    src={formData.artwork_url}
                    alt="Artwork preview"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={uploading || !formData.artwork_url}
              >
                {editingId ? "Update" : "Create"} Release
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
      ) : releases.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border">
          <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            No releases yet. Add your first release!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((release) => (
            <div
              key={release.id}
              className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square">
                <Image
                  src={release.artwork_url}
                  alt={release.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{release.title}</h3>
                {release.release_date && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {new Date(release.release_date).toLocaleDateString()}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(release)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(release.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

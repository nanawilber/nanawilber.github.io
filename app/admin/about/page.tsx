"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface AboutSection {
  id: string;
  title: string | null;
  content: string;
  image_url: string | null;
  display_order: number;
}

export default function AboutPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    display_order: 0,
  });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch("/api/admin/about");
      const data = await response.json();
      setSections(data.data || []);
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
      setFormData((prev) => ({ ...prev, image_url: data.url }));
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = "/api/admin/about";
      const method = editingId ? "PATCH" : "POST";
      const body = editingId ? { id: editingId, ...formData } : formData;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await fetchSections();
      resetForm();
    } catch (error) {
      alert("Failed to save");
    }
  };

  const handleEdit = (section: AboutSection) => {
    setFormData({
      title: section.title || "",
      content: section.content,
      image_url: section.image_url || "",
      display_order: section.display_order,
    });
    setEditingId(section.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this section?")) return;

    try {
      await fetch(`/api/admin/about?id=${id}`, { method: "DELETE" });
      await fetchSections();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", image_url: "", display_order: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            About <span className="text-primary">Sections</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your about page content
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? "Edit Section" : "New Section"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (optional)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (optional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {formData.image_url && (
                <Image
                  src={formData.image_url}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-lg mt-2"
                />
              )}
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

            <div className="flex gap-2">
              <Button type="submit" disabled={uploading}>
                {editingId ? "Update" : "Create"} Section
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
          {sections.map((section) => (
            <div key={section.id} className="p-6 bg-card rounded-lg border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {section.title && (
                    <h3 className="font-bold text-xl mb-2">{section.title}</h3>
                  )}
                  <p className="text-muted-foreground mb-4">
                    {section.content}
                  </p>
                  {section.image_url && (
                    <Image
                      src={section.image_url}
                      alt={section.title || "Section image"}
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(section)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(section.id)}
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

"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TourDate {
  id: string;
  venue_name: string;
  city: string;
  country: string;
  event_date: string;
  ticket_url: string | null;
  bandsintown_id: string | null;
  is_past: boolean;
}

export default function TourDatesPage() {
  const [dates, setDates] = useState<TourDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    venue_name: "",
    city: "",
    country: "",
    event_date: "",
    ticket_url: "",
    bandsintown_id: "",
    is_past: false,
  });

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const response = await fetch("/api/admin/tour");
      const data = await response.json();
      setDates(data.data || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = "/api/admin/tour";
      const method = editingId ? "PATCH" : "POST";
      const body = editingId ? { id: editingId, ...formData } : formData;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await fetchDates();
      resetForm();
    } catch (error) {
      alert("Failed to save");
    }
  };

  const handleEdit = (date: TourDate) => {
    setFormData({
      venue_name: date.venue_name,
      city: date.city,
      country: date.country,
      event_date: new Date(date.event_date).toISOString().slice(0, 16),
      ticket_url: date.ticket_url || "",
      bandsintown_id: date.bandsintown_id || "",
      is_past: date.is_past,
    });
    setEditingId(date.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tour date?")) return;

    try {
      await fetch(`/api/admin/tour?id=${id}`, { method: "DELETE" });
      await fetchDates();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const resetForm = () => {
    setFormData({
      venue_name: "",
      city: "",
      country: "",
      event_date: "",
      ticket_url: "",
      bandsintown_id: "",
      is_past: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Tour <span className="text-primary">Dates</span>
          </h1>
          <p className="text-muted-foreground">Manage your tour schedule</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Tour Date
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? "Edit Tour Date" : "New Tour Date"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="venue_name">Venue Name *</Label>
                <Input
                  id="venue_name"
                  value={formData.venue_name}
                  onChange={(e) =>
                    setFormData({ ...formData, venue_name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event_date">Event Date & Time *</Label>
                <Input
                  id="event_date"
                  type="datetime-local"
                  value={formData.event_date}
                  onChange={(e) =>
                    setFormData({ ...formData, event_date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticket_url">Ticket URL</Label>
                <Input
                  id="ticket_url"
                  type="url"
                  value={formData.ticket_url}
                  onChange={(e) =>
                    setFormData({ ...formData, ticket_url: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bandsintown_id">Bandsintown ID</Label>
                <Input
                  id="bandsintown_id"
                  value={formData.bandsintown_id}
                  onChange={(e) =>
                    setFormData({ ...formData, bandsintown_id: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_past"
                checked={formData.is_past}
                onChange={(e) =>
                  setFormData({ ...formData, is_past: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label htmlFor="is_past">Mark as past event</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Update" : "Create"} Tour Date
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
      ) : dates.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            No tour dates yet. Add your first show!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {dates.map((date) => (
            <div
              key={date.id}
              className="p-6 bg-card rounded-lg border flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-xl">{date.venue_name}</h3>
                <p className="text-muted-foreground">
                  {date.city}, {date.country}
                </p>
                <p className="text-sm mt-2">
                  {new Date(date.event_date).toLocaleString()}
                </p>
                {date.ticket_url && (
                  <a
                    href={date.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Get Tickets
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(date)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(date.id)}
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

import React from "react";
import BandsintownWidget from "../../components/BandsintownWidget";
import { getTourDates } from "@/lib/supabase";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const TourPage = async () => {
  let tourDates: any[] | null = [];

  try {
    tourDates = await getTourDates();
  } catch (error) {
    console.error("Error fetching tour dates:", error);
  }

  // Filter out past dates if needed, or sort them
  const upcomingDates = tourDates?.filter((date) => !date.is_past) || [];

  return (
    <main className="mt-16 min-h-[calc(100vh-65px)]">
      <div className="container my-6 mx-auto flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest">
          Tour <span className="text-primary">Dates</span>
        </h1>

        {upcomingDates.length > 0 ? (
          <div className="w-full max-w-4xl space-y-4">
            {upcomingDates.map((tour) => (
              <div
                key={tour.id}
                className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg border bg-card hover:bg-accent/5 transition-colors gap-4"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 flex-1 text-center md:text-left">
                  <div className="flex flex-col min-w-[100px]">
                    <span className="text-2xl font-bold text-primary">
                      {format(new Date(tour.event_date), "dd")}
                    </span>
                    <span className="text-sm uppercase tracking-wider">
                      {format(new Date(tour.event_date), "MMM yyyy")}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1">
                    <h3 className="text-xl font-bold">{tour.venue_name}</h3>
                    <p className="text-muted-foreground">
                      {tour.city}, {tour.country}
                    </p>
                  </div>
                </div>

                <div className="min-w-[140px]">
                  {tour.ticket_url ? (
                    <Button asChild className="w-full">
                      <a
                        href={tour.ticket_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Tickets
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled className="w-full">
                      Sold Out
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-2xl text-center space-y-8">
            <p className="text-muted-foreground text-lg">
              No custom tour dates scheduled directly. Check Bandsintown below!
            </p>
            <BandsintownWidget artistName="Brapurple" />
          </div>
        )}
      </div>
    </main>
  );
};

export default TourPage;

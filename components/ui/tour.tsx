import React from "react";

import axios from "axios";

interface TourEvent {
  id: string;
  datetime: string;
  url: string;
  venue: {
    name: string;
    city: string;
    country: string;
  };
}

interface TourProps {
  tourDates: TourEvent[];
}

export async function getServerSideProps() {
  const artistName = "brapurple"; // Replace with the artist's name
  const appId = "11df4929088981a2e7617f7bcad33b5c"; // Replace with your Bandsintown app ID

  try {
    const response = await axios.get(
      `https://rest.bandsintown.com/artists/${encodeURIComponent(
        artistName,
      )}/events?app_id=${appId}`,
    );

    return {
      props: {
        tourDates: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching tour dates:", error);
    return {
      props: {
        tourDates: [],
      },
    };
  }
}

export default function Tour({ tourDates }: TourProps) {
  return (
    <div>
      <h1>Tour Dates</h1>
      {/* {tourDates.length > 0 ? (
        <ul>
          {tourDates.map((event) => (
            <li key={event.id}>
              <strong>{event.datetime}</strong> - {event.venue.name},{" "}
              {event.venue.city}, {event.venue.country}
              <br />
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                Buy Tickets
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming tour dates.</p>
      )} */}
      <p>No upcoming tours </p>
    </div>
  );
}

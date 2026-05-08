import { musicDetails } from "@/lib/data";
import ReleaseDetail from "@/components/music/ReleaseDetail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return musicDetails.map((track) => ({
    slug: track.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const track = musicDetails.find((t) => t.slug === slug);

  if (!track) return {};

  return {
    title: track.title,
    description: `Listen to "${track.title}" by Brapurple. Available on all streaming platforms.`,
    openGraph: {
      title: `${track.title} | Brapurple`,
      description: `New music from Brapurple: "${track.title}". Stream it now.`,
      images: [{ url: track.artwork }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${track.title} | Brapurple`,
      description: `Listen to "${track.title}" on streaming platforms.`,
      images: [track.artwork],
    },
  };
}

export default async function TrackPage({ params }: Props) {
  const { slug } = await params;
  const track = musicDetails.find((t) => t.slug === slug);

  if (!track) {
    notFound();
  }

  return <ReleaseDetail release={track} />;
}

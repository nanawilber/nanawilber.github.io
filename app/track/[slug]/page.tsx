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

export default async function TrackPage({ params }: Props) {
  const { slug } = await params;
  const track = musicDetails.find((t) => t.slug === slug);

  if (!track) {
    notFound();
  }

  return <ReleaseDetail release={track} />;
}

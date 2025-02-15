import HeroGrid from "../components/heroGrid";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center justify-center border ">
      <div className="container mx-auto">
        <HeroGrid />
      </div>
    </main>
  );
}

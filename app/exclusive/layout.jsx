import PreSave from "../../components/PreSave";

export const metadata = {
  title: "Brapurple Exclusive",
  description: "Get Exclusive Music from Brapurple",
};

export default function ExclusiveLayout({ children }) {
  return (
    <main className="w-full min-h-[calc(100vh-130px)]">
      <div className="container mx-auto mt-16">
        <h1 className="text-3xl font-bold uppercase text-center my-10 pt-6">
          Exclusive
        </h1>

        <div>{children}</div>
        <h1 className="text-2xl font-bold uppercase text-center my-10 pt-6">
          Release Date: 17th February 2025
        </h1>
        <div className="my-10">
          <PreSave />
        </div>
      </div>
    </main>
  );
}

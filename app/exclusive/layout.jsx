// import HowItWorks from "./../../components/ui/how";
// import TokenForm from "./../../components/tokenForm";

export const metadata = {
  title: "eXclusive Music",
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
      </div>
    </main>
  );
}

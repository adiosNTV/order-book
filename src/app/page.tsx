import DashboardContainer from "@/components/DashboardContainer/DashboardContainer";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 box-border m-0">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <DashboardContainer />
      </div>
    </main>
  );
}

import MainSceneClient from "./components/MainSceneClient";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <MainSceneClient />
    </main>
    </div>
  );
}

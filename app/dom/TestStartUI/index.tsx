import { useGameStore } from "@/app/hooks/useGameStore"

const TestGameState = () => {
  const currentScene = useGameStore((state) => state.currentScene)
  return (
      <div className=" fixed bg-white p-8 rounded-lg text-white text-center m-auto pointer-events-auto">
        <h1 className="text-4xl font-bold mb-4">GAME STATE</h1>
        {/* game state display for debugging */}
        <p className="text-lg mb-4">Current Scene: {currentScene}</p>
      </div>
  )
}

export default TestGameState
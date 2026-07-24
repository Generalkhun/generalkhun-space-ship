import { useGameStore } from "@/app/hooks/useGameStore";

const TestGameState = () => {
  const currentScene = useGameStore((state) => state.currentScene);
  const setCurrentScene = useGameStore((state) => state.setCurrentScene);
  const isInfoOpen = useGameStore((state) => state.isInfoOpen);
  return (
    <div className=" fixed bg-white p-8 rounded-lg text-white text-center m-auto pointer-events-auto">
      <h1 className="text-4xl font-bold mb-4">GAME STATE</h1>
      {/* game state display for debugging */}
      <div className="bg-gray-800 p-4 rounded-lg text-white text-center mb-4 flex flex-row items-start">
        <p className="text-lg mb-4">Current Scene: {currentScene}</p>
        <p className="text-lg mb-4">
          Info displaying: {isInfoOpen ? "Yes" : "No"}
        </p>
      </div>

      <div>
        Select game state:
        <div>
          <button
            style={{ marginRight: "10px" }}
            className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-10"
            onClick={() => setCurrentScene("LOADING")}
          >
            LOADING
          </button>
          <button
            style={{ marginRight: "10px" }}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => setCurrentScene("INTRO")}
          >
            INTRO
          </button>
          <button
            style={{ marginRight: "10px" }}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => setCurrentScene("SHIPFRONT")}
          >
            SHIPFRONT
          </button>
          <button
            style={{ marginRight: "10px" }}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => setCurrentScene("WALKING_TO_SHIP")}
          >
            WALKING_TO_SHIP
          </button>
          <button
            style={{ marginRight: "10px" }}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => setCurrentScene("INSHIP")}
          >
            INSHIP
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestGameState;

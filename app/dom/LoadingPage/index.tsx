import { useGameStore } from "@/app/hooks/useGameStore";

const LoadingPage = () => {
    const { setCurrentScene } = useGameStore.getState();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-4xl font-bold mb-4">Loading...</h1>
            <p className="text-lg">Please wait while we prepare your experience.</p>
            {/* simulate loading done button */}
            <button className="mt-4 px-6 py-3 bg-white text-white font-bold rounded hover:bg-gray-200" onClick={() => {
                // Simulate loading done
                setCurrentScene('INTRO');
            }}>
                {`[Loading Done Button]`}
            </button>
        </div>  
    )
}
export default LoadingPage
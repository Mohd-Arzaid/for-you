import { useState, useEffect, useRef } from "react";

function App() {
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef(null);

  const handleInteraction = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 15;
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch((err) => console.log("Play failed", err));
      setShowHint(false);
    }
  };

  useEffect(() => {
    // Try autoplay
    if (audioRef.current) {
      audioRef.current.currentTime = 15;
      audioRef.current.volume = 0.7;
      audioRef.current
        .play()
        .then(() => setShowHint(false))
        .catch(() => {
          // Autoplay blocked, keep hint visible
        });
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/song.mp3" loop />

      <div
        onClick={handleInteraction}
        className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center p-4 cursor-pointer"
      >
        <img
          src="/chomu.png"
          alt="Chomu"
          className="max-w-full max-h-full object-contain"
        />

        {showHint && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm animate-pulse">
            Tap to play music 🎵
          </div>
        )}
      </div>
    </>
  );
}

export default App;

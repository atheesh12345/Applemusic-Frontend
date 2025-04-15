import React, { useEffect, useRef, useState } from "react";

const AudioPlayer = ({ audioSrc, songIndex, setSongIndex, songs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default full volume
  const [isLooping, setIsLooping] = useState(false); // Looping state
  const audioRef = useRef(null);

  useEffect(() => {
    if (songs.length > 0 && audioRef.current) {
      console.log("Loading song:", songs[songIndex]?.songname, "with src:", songs[songIndex]?.song);
      audioRef.current.src = songs[songIndex]?.song;
      setCurrentTime(0);
      audioRef.current.load();
      handlePlay();
    }
  }, [songIndex, songs]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleNextSong = () => {
    if (songs.length === 0) return;
    if (isLooping) {
      audioRef.current.currentTime = 0;
      handlePlay();
    } else {
      const nextIndex = (songIndex + 1) % songs.length;
      setSongIndex(nextIndex);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("ended", handleNextSong);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("ended", handleNextSong);
    };
  }, [songIndex, songs, isLooping]);

  const handlePlay = async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    isPlaying ? handlePause() : handlePlay();
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !isLooping;
  };

  return (
    <div className="audioPlayer w-[75%] p-6 bg-slate-900 m-4 flex flex-row fixed rounded-2xl bottom-0 right-0">
      <div className="w-[30%] flex flex-row text-center gap-4 items-center">
        <img className="status h-20 w-20 rounded-2xl object-cover" src={songs[songIndex]?.image} />
        <p className="text text-2xl text-white">{songs[songIndex]?.songname}</p>
      </div>
      
      <div className="w-[70%] flex flex-col items-center justify-center">
        <input
          className=" status w-[80%] cursor-pointer"
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
          }}
        />
        <audio ref={audioRef} />

   
        <div className="w-[80%] status flex text-white justify-between">
          <p>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, "0")}</p>
          <p>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, "0")}</p>
        </div>

    
        <div className=" buttons flex gap-4">
          <button className="w-16 h-10 text-white" onClick={() => setSongIndex((songIndex - 1 + songs.length) % songs.length)}>
            <span className="material-symbols-outlined">skip_previous</span>
          </button>
          <button className="rounded-lg text-white" onClick={handlePlayPause}>
            {isPlaying ? <span className="material-symbols-outlined">pause</span> : <span className="material-symbols-outlined">play_arrow</span>}
          </button>
          <button className="w-16 h-10 text-white" onClick={handleNextSong}>
            <span className="material-symbols-outlined">skip_next</span>
          </button>
          <button className={`w-16 h-10 ${isLooping ? "text-green-500" : "text-white"}`} onClick={toggleLoop}>
            <span className="material-symbols-outlined">repeat</span>
          </button>
        </div>
        <div className="volume w-[15%] absolute bottom-2 right-2 p-4 flex items-center gap-2 mt-4">
          <span className="text-white text-xl">🔊</span>
          <input
            className="w-full cursor-pointer"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setVolume(newVolume);
              audioRef.current.volume = newVolume;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

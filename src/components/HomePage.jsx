import React, { useEffect, useState } from "react";
import MusicCard from "./MusicCard";

const HomePage = ({ handleSongPlay, playList, setPlayList }) => {
  const [allSongs, setAllSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    fetch("https://applemusic-backend.onrender.com/songs")
      .then(res => res.json())
      .then(data => {
        setAllSongs(data);
        setFilteredSongs(data); // default to all
      })
      .catch(err => console.error("Error fetching songs:", err));
  }, []);

  const handleFilter = (type) => {
    if (type === "all") {
      setFilteredSongs(allSongs);
    } else {
      setFilteredSongs(allSongs.filter(song => song.type === type));
    }
  };

  return (
    <div className="home w-[75%] h-[72%] m-6 bg-slate-900 rounded-2xl fixed right-0 overflow-auto scrollbar-hidden">
      <div className="header flex flex-col m-8 text-white text-2xl">
        <div className="flex flex-row justify-between m-4 text-white text-xl">
          <p className="text text-2xl font-bold">Home</p>
          <p className="status bg-zinc-400 text-center content-center rounded-full w-12 h-12 mr-4">AS</p>
        </div>
        <div className="flex buttons gap-4">
          <button onClick={() => handleFilter("all")} className="text bg-slate-900 text-md hover:bg-slate-400 px-4 rounded-lg text-white">All</button>
          <button onClick={() => handleFilter("pop")} className="text bg-slate-900 text-md hover:bg-slate-400 px-4 rounded-lg text-white">Pop</button>
          <button onClick={() => handleFilter("melody")} className="text bg-slate-900 text-md hover:bg-slate-400 px-4 rounded-lg text-white">Melody</button>
        </div>
      </div>

      <p className="text text-white ml-8 text-2xl font-bold">Top picks for you..</p>

      <div className="flex flex-wrap gap-16 p-8 justify-center overflow-auto scrollbar-hidden">
        {filteredSongs.length === 0 ? (
          <p className="text-white text-2xl">No songs found.</p>
        ) : (
          filteredSongs.map((data) => (
            <MusicCard 
              key={data.id} 
              data={data} 
              handleSongPlay={handleSongPlay} 
              playList={playList} 
              setPlayList={setPlayList} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;

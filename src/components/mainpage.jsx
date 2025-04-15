import React, { useState, useEffect } from "react";
import Albums from "./Albums";
import SearchPage from "./SearchPage";
import PlayListPage from "./PlayList";
import AudioPlayer from "./AudioPlayer";
import SideBar from "./sideBar";
import HomePage from "./homePage";


const Mainpage = () => {
  const [audioSrc, setAudioSrc] = useState("");
  const [songIndex, setSongIndex] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('https://applemusic-backend.onrender.com/songs');
        const data = await res.json();
        setSongs(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching songs:", err);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleSongPlay = (song, isFromPlaylist = false) => {
    console.log("Playing song:", song.songname, "with src:", song.song);
    const sourceList = isFromPlaylist ? playList : songs;
    setAudioSrc(song.song);
    setSongIndex(sourceList.findIndex((s) => s.song === song.song));
    setSongs(sourceList);
  };

  if (loading) return <div className="text-white text-2xl p-8">Loading songs...</div>;

  return (
    <div className="flex body">
      <>
      <SideBar setCurrentPage={setCurrentPage} />
      {currentPage === "home" && (
        <HomePage
          songs={songs}
          setAudioSrc={setAudioSrc}
          setSongIndex={setSongIndex}
          setSongs={setSongs}
          playList={playList}
          setPlayList={setPlayList}
          handleSongPlay={handleSongPlay}
        />
      )}
      {currentPage === "albums" && (
        <Albums
          songs={songs}
          setAudioSrc={setAudioSrc}
          setSongIndex={setSongIndex}
          setSongs={setSongs}
          handleSongPlay={handleSongPlay}
          playList={playList}
          setPlayList={setPlayList}
        />
      )}
      {currentPage === "search" && (
        <SearchPage
          songs={songs}
          setAudioSrc={setAudioSrc}
          setSongIndex={setSongIndex}
          setSongs={setSongs}
          playList={playList}
          setPlayList={setPlayList}
          handleSongPlay={handleSongPlay}
        />
      )}
      {currentPage === "playlist" && (
        <PlayListPage
          playList={playList}
          setPlayList={setPlayList}
          handleSongPlay={handleSongPlay}
        />
      )}
      <AudioPlayer
        audioSrc={audioSrc}
        songIndex={songIndex}
        setSongIndex={setSongIndex}
        songs={songs}
      />
      </>
    </div>
  );
};

export default Mainpage;

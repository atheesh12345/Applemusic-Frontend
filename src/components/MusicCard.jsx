import React, { useState } from "react";

const MusicCard = ({ data, handleSongPlay, playList, setPlayList }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuVisible(!menuVisible);
   
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    if (!playList.some((song) => song.songname === data.songname)) {
      setPlayList([...playList, data]);
      console.log("Added to Playlist:", data);
    } 
    setMenuVisible(false);
  };

  const handleDownload = (e) => {
    e.stopPropagation(); 

    const link = document.createElement("a");
    link.href = data.song; 
    link.download = `${data.songname}.mp3`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 

    console.log(`Downloading ${data.songname}...`);
    setMenuVisible(false);
  };
  

  return (
    <div onClick={() => handleSongPlay(data)} className="h-60 w-48  flex flex-col rounded-2xl cursor-pointer text-white text-start relative">
      <img src={data.image} alt="album cover" className="w-[100%] h-[70%] object-fill rounded-2xl" />
      <p className="text-xl pt-2">{data.songname}</p>
      <p>{data.movie}</p>

      <button onClick={handleMenuToggle } className="absolute bottom-2 right-2 text-4xl text-white p-1 shadow-md">
        ⋮
      </button>

      {menuVisible && (
        <div className="absolute bottom-16 right-2 bg-white shadow-lg rounded-lg z-10" onClick={(e) => e.stopPropagation()}>
          <ul className="flex flex-col text-black">
            <li onClick={handleAddToPlaylist} className="p-2 hover:bg-gray-200 cursor-pointer">
              Add to Playlist
            </li>
            <li className="p-2 hover:bg-gray-200 cursor-pointer">Like</li>
            <li className="p-2 hover:bg-gray-200 cursor-pointer">Share</li>
            <li onClick={handleDownload} className="p-2 hover:bg-gray-200 cursor-pointer">download</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MusicCard;
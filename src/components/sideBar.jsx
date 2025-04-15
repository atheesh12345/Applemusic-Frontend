import React from "react";


const SideBar = ({ setCurrentPage }) => {
  return (
    <div className="sidebar h-[95%] w-[20%] bg-slate-900 m-8 fixed rounded-2xl text-white text-2xl">
      <div className="flex flex-row w-[60%] justify-around  items-center m-8 mb-12">
        <img className="apple h-8 w-8" src="./images/logo2.webp" alt="Logo" />
        <p className="status text-xl midscreen">Apple Music</p>
      </div>
      <div className="flex flex-row gap-2 items-center sm:flex-col">
        <div onClick={() => setCurrentPage("home")} className="w-[80%] flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-400 rounded-lg text-center">
          <span  class="material-icons">home</span>
          <p className="status midscreen">Home</p>
        </div>
        <div onClick={() => setCurrentPage("albums")} className="w-[80%] flex items-center gap-4 p-4 cursor-pointer  hover:bg-slate-400 rounded-lg text-center">
        <span class="material-symbols-outlined">tile_small</span>
          <p className="status midscreen">albums</p>
        </div>
        <div onClick={() => setCurrentPage("search")} className="w-[80%] flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-400 rounded-lg text-center">
        <span class="material-symbols-outlined">search</span>
          <p className="status midscreen">search</p>
        </div>
        <div onClick={() => setCurrentPage("playlist")} className="w-[80%] flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-400 rounded-lg text-center">
        <span class="material-symbols-outlined">playlist_add</span>
          <p className="midscreen status">playlist</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
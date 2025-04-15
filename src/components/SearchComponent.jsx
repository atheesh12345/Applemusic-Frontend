import React, { useState } from "react";

const SearchComponent = ({ data, handleSongPlay, playList, setPlayList }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuToggle = (e) => {
        e.stopPropagation();
        setMenuVisible(!menuVisible);
    };

  
    const handleAddToPlaylist = (e) => {
        e.stopPropagation();
        if (!playList.some(song => song.songname === data.songname)) { 
            setPlayList([...playList, data]); 
            console.log("Added to Playlist:", data);
        } else {
            
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
        <div onClick={()=>(handleSongPlay(data))} className='song h-24 w-[70%] mt-4 bg-zinc-400 flex pl-4 pr-4 gap-5 justify-between items-center flex-row rounded-2xl relative'>
            <div className="flex gap-5 items-center">
                <img src={data.image} alt='album cover' className=' w-20 h-20 object-fill rounded-full' />
                <div>
                    <p className='text-2xl font-bold'>{data.songname}</p>
                    <p className='text-xl'>From {data.movie}</p>
                </div>
            </div>

            <button 
                onClick={handleMenuToggle} 
                className='text-2xl text-white p-2 shadow-md'
            >
                ⋮
            </button>

            {menuVisible && (
                <div className='absolute bottom-[-100%] right-4 bg-white shadow-lg rounded-lg z-10' onClick={(e) => e.stopPropagation()}>
                    <ul className='flex flex-col'>
                        <li onClick={handleAddToPlaylist} className='p-2 hover:bg-gray-200 cursor-pointer'>Add to Playlist</li>
                        <li className='p-2 hover:bg-gray-200 cursor-pointer'>Like</li>
                        <li className='p-2 hover:bg-gray-200 cursor-pointer'>Share</li>
                        <li onClick={handleDownload} className='p-2 hover:bg-gray-200 cursor-pointer'>Download</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;

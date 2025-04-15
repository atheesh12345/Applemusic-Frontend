const PlayListPage = ({ playList, setPlayList, handleSongPlay }) => {

  
    const removePlaylist = (songToRemove, e) => {
      e.stopPropagation();
      setPlayList(playList.filter(song => song.songname !== songToRemove.songname));
    };
  
    return (
      <div className='playlist w-[75%] h-[72%] m-8 mr-2 right-0 bg-slate-900 rounded-2xl fixed overflow-auto'>
        <div className='flex flex-row justify-between m-8 text-white text-2xl'>
          <p className='text-4xl font-bold'>Playlist</p>
        </div>
        <div className='flex flex-wrap gap-12 p-8'>
          {playList.length === 0 ? (
            <p className='text-white'>Your playlist is empty.</p>
          ) : (
            playList.map((song, index) => (
              <div 
                key={index} 
                onClick={() => handleSongPlay(song, true)} 
                className='h-24 w-[70%] bg-zinc-400 flex pl-4 gap-5 justify-between items-center flex-row rounded-2xl cursor-pointer'
              >
                <div className="flex gap-5 items-center">
                  <img src={song.image} className='w-20 h-20 object-fill rounded-2xl' />
                  <div>
                    <p className='text-2xl font-bold'>{song.songname}</p>
                    <p className='text-xl'>From {song.movie}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => removePlaylist(song, e)} 
                  className="h-12 px-4 mr-4 bg-red-500 text-white rounded-lg shadow-md"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  export default PlayListPage;
  
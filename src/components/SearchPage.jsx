import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';

const SearchPage = ({ setAudioSrc, setSongIndex, setSongs, playList, setPlayList }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [allSongs, setAllSongs] = useState([]);

    useEffect(() => {
        fetch('https://applemusic-backend.onrender.com/songs')
            .then(res => res.json())
            .then(data => {
                setAllSongs(data);
                setFilteredResults(data); // show all by default
            })
            .catch(err => console.error("Error fetching songs:", err));
    }, []);

    const handleSongPlay = (song) => {
        console.log("Playing song:", song.songname, "with src:", song.song);
        setAudioSrc(song.song);
        setSongIndex(allSongs.findIndex((data) => data.song === song.song));
        setSongs(allSongs);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const results = allSongs.filter(data =>
            data.songname.toLowerCase().includes(query) ||
            data.musicDirector.toLowerCase().includes(query) ||
            data.movie.toLowerCase().includes(query)
        );
        setFilteredResults(results);
    };

    return (
        <div className='search w-[75%] h-[72%] m-8 mr-1 right-0 bg-slate-900 rounded-2xl drop-shadow-2xl fixed overflow-auto scrollbar-hidden'>
            <div className='status flex flex-row justify-between m-8 text-white text-2xl'>
                <p className='text-4xl font-bold'>Search</p>
            </div>
            <input 
                type="text" 
                placeholder="Search for songs..." 
                className="w-[85%] h-10 rounded-md p-2 m-8 mb-4" 
                value={searchQuery}
                onChange={handleSearch}
            />
            <div className='p-6 flex ml-4 flex-col'>
                {filteredResults.length === 0 ? (
                    <p className="text-white text-xl">No results found.</p>
                ) : (
                    filteredResults.map(data => (
                        <SearchComponent 
                            data={data} 
                            key={data.id} 
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

export default SearchPage;

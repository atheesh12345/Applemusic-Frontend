import React, { useEffect, useState, useRef } from 'react';

const Albums = ({ setAudioSrc, setSongIndex, setSongs, setCurrentSong, handleSongPlay, playList, setPlayList }) => {
    const [assets, setAssets] = useState([]);
    const [groupedMoviesArray, setGroupedMoviesArray] = useState([]);
    const [albumSongs, setAlbumSongs] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const songsRef = useRef(null);
    const [menuVisible, setMenuVisible] = useState({});

    useEffect(() => {
        fetch("https://applemusic-backend.onrender.com/songs")
            .then((res) => res.json())
            .then((data) => {
                setAssets(data);
                const grouped = data.reduce((acc, song) => {
                    const { movie, songname, song: songUrl, image, musicDirector } = song;
                    if (!acc[movie]) {
                        acc[movie] = {
                            movie,
                            musicDirector,
                            songs: [],
                            image
                        };
                    }
                    acc[movie].songs.push({ songname, song: songUrl, musicDirector, image });
                    return acc;
                }, {});
                setGroupedMoviesArray(Object.values(grouped));
            })
            .catch((err) => console.error("Error fetching songs:", err));
    }, []);

    const showSongs = (data) => {
        setAlbumSongs(data.songs);
        setSelectedAlbum(data.movie);
        setTimeout(() => {
            songsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
    };

    const playSong = (song) => {
        setAudioSrc(song.song);
        setSongIndex(albumSongs.findIndex(s => s.songname === song.songname));
        setSongs(albumSongs);
        setCurrentSong(song.songname);
    };

    const handleMenuToggle = (e, songname) => {
        e.stopPropagation();
        setMenuVisible((prev) => ({
            ...prev,
            [songname]: !prev[songname],
        }));
    };

    const handleAddToPlaylist = (e, song) => {
        e.stopPropagation();
        if (!playList.some(item => item.songname === song.songname)) {
            setPlayList([...playList, song]);
        }
        setMenuVisible(false);
    };

    const handleDownload = (e, song) => {
        e.stopPropagation();
        const link = document.createElement("a");
        link.href = song.song;
        link.download = `${song.songname}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMenuVisible({});
    };

    const handleClickOutside = () => setMenuVisible({});

    return (
        <div className='album w-[75%] h-[72%] m-8 mr-2 right-0 bg-slate-900 rounded-2xl fixed overflow-auto scrollbar-hidden' onClick={handleClickOutside}>
            <div className='flex flex-row justify-between m-8 text-white text-2xl'>
                <p className='text text-4xl font-bold'>Albums</p>
                <div className='status bg-zinc-400 text-center content-center rounded-full w-14 h-14 mr-4'>AS</div>
            </div>

            {selectedAlbum && (
                <div ref={songsRef} className='p-6 bg-slate-800 text-white overflow-auto scrollbar-hidden rounded-xl m-8 mt-4'>
                    <h2 className='text-4xl  mb-8'>{selectedAlbum}</h2>
                    <div className='flex flex-col overflow-auto scrollbar-hidden'>
                        {albumSongs.map((song) => (
                            <div key={song.songname} onClick={() => playSong(song)} className="flex rounded-4xl gap-4 h-20 mt-4 hover:bg-slate-400 items-center relative">
                                <img src={song.image} alt='album cover' className='status w-16 h-16 object-fill ml-4 rounded-lg' />
                                <div className='text rounded-4xl'>
                                    <p className='text-2xl ml-4 font-bold'>{song.songname}</p>
                                    <p className='text-xl'>{song.movie}</p>
                                </div>
                                <button onClick={(e) => handleMenuToggle(e, song.songname)} className='text-2xl absolute right-4 text-white p-2 shadow-md'>⋮</button>
                                {menuVisible[song.songname] && (
                                    <div className='absolute right-4 text-black bg-white shadow-lg rounded-lg z-10' onClick={(e) => e.stopPropagation()}>
                                        <ul className='flex flex-col'>
                                            <li onClick={(e) => handleAddToPlaylist(e, song)} className='p-2 hover:bg-gray-200 cursor-pointer'>Add to Playlist</li>
                                            <li className='p-2 hover:bg-gray-200 cursor-pointer'>Like</li>
                                            <li className='p-2 hover:bg-gray-200 cursor-pointer'>Share</li>
                                            <li onClick={(e) => handleDownload(e, song)} className='p-2 hover:bg-gray-200 cursor-pointer'>Download</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className=' album-container flex flex-wrap gap-12 p-8'>
                {groupedMoviesArray.map((data) => (
                    <div key={data.movie} onClick={() => showSongs(data)} className=' h-64 w-56 text-white text-start text-2xl rounded-2xl cursor-pointer'>
                        <img src={data.image} alt={data.movie} className='status h-48 w-full object-cover rounded-2xl' />
                        <p className='pt-1 font-bold text-xl'>{data.movie}</p>
                        <p className=' text-xl'>{data.musicDirector}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Albums;

import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Playlist from "./components/Playlist";
import SearchResults from "./components/SearchResults";
import SpotifyAuth from "./SpotifyAuth";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [tracks, setTracks] = useState([]);

  const searchSpotify = (searchTerm) => {
    SpotifyAuth.search(searchTerm).then((results) => {
      setTracks(results);
    });
  };

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      setPlaylistTracks((prev) => [...prev, track]);
    }
  };

  function removeTrack(trackId) {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((track) => track.id !== trackId)
    );
  }

  return (
    <>
      <SearchBar onSearch={searchSpotify} />
      <SearchResults tracks={tracks} addTrack={addTrackToPlaylist} />
      <Playlist
        setPlaylistName={setPlaylistName}
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        removeTrack={removeTrack}
      />
    </>
  );
}

export default App;

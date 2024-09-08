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

  async function getMyIdFromSpotify() {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${SpotifyAuth.getAccessToken()}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Response not ok: " + errorData.error.message);
      }

      const jsonData = await response.json();
      return jsonData.id;
    } catch (e) {
      console.log("response error " + e);
    }
  }

  async function createPlaylistOnSpotify() {
    const userId = await getMyIdFromSpotify();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SpotifyAuth.getAccessToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
            description: "New playlist description",
            public: false,
          }), // Convert body to JSON string
        }
      );

      if (!response.ok) {
        // Log the entire response if not OK
        const errorData = await response.json();
        console.error("Error creating playlist:", errorData.error.message);
        return;
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.log("catch error message: " + error);
    }
  }

  async function addTrackToSpotifyPlaylist() {
    const playlistId = await createPlaylistOnSpotify();
    const playlistUris = playlistTracks.map((tracks) => tracks.uri);

    if (playlistTracks.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SpotifyAuth.getAccessToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: playlistUris,
            position: 0,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error to adding tracks " + errorData.error.message);
        return;
      }

      const data = await response.json();
      return data;
    } catch (e) {
      console.log("Error in addTrackToSpotifyPlaylist" + e.message);
    }
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
        addTrackToSpotifyPlaylist={addTrackToSpotifyPlaylist}
      />
    </>
  );
}

export default App;

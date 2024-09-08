import React from "react";
import Tracklist from "./Tracklist";

function Playlist({
  setPlaylistName,
  playlistName,
  playlistTracks,
  removeTrack,
  saveToSpotify,
  addTrackToSpotifyPlaylist,
}) {
  function handlePlaylistName(e) {
    setPlaylistName(e.target.value);
  }

  return (
    <div>
      <input placeholder="Update Playlist Name" onChange={handlePlaylistName} />

      <Tracklist tracks={playlistTracks} removeTrack={removeTrack} />

      <button onClick={() => addTrackToSpotifyPlaylist()}>
        Save To Spotify
      </button>
    </div>
  );
}

export default Playlist;

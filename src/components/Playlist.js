import React from "react";
import Tracklist from "./Tracklist";

function Playlist({
  setPlaylistName,
  playlistName,
  playlistTracks,
  removeTrack,
}) {
  function handlePlaylistName(e) {
    setPlaylistName(e.target.value);
  }

  function saveToSpotify() {}

  return (
    <div>
      <input placeholder="Update Playlist Name" onChange={handlePlaylistName} />

      <Tracklist tracks={playlistTracks} removeTrack={removeTrack} />

      <button onSubmit={saveToSpotify}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;

import React from "react";

function SearchResults({ tracks, addTrack }) {
  return (
    <div>
      <h2>Search Results</h2>
      {tracks.length > 0 ? (
        <ul>
          {tracks.map((track) => (
            <li key={track.id}>
              <strong>{track.name}</strong> by {track.artist} (Album:{" "}
              {track.album})
              <a href={track.uri} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
              <button onClick={() => addTrack(track)}>+ Add</button>;
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracks found</p>
      )}
    </div>
  );
}

export default SearchResults;

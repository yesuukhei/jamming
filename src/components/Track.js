import React from "react";
import Tracklist from "./Tracklist";

function Track({ track, removeTrack }) {
  return (
    <div key={track.id}>
      <h3>{track.name}</h3>
      <p>
        {track.artist} | {track.album}
      </p>

      <button onClick={removeTrack}>-</button>
    </div>
  );
}
export default Track;

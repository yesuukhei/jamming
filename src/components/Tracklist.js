import React, { useState, useEffect } from "react";
import Track from "./Track";
function Tracklist({ tracks, removeTrack }) {
  return (
    <div>
      {tracks && tracks.length > 0 ? (
        tracks.map((track) => {
          return (
            <Track track={track} removeTrack={() => removeTrack(track.id)} />
          );
        })
      ) : (
        <p>No tracks</p>
      )}
    </div>
  );
}

export default Tracklist;

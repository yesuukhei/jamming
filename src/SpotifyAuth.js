import React, { useEffect } from "react";

const clientId = "bbe3e009ba57426781d4c21d2d88adcc";
const redirectUri = "http://localhost:3000/";

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    // Step 3: If the access token is already set, return it.
    if (accessToken) {
      return accessToken;
    }

    // Step 2: Check if access token is present in the URL
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      // Step 2a: Extract and set access token and expiration time
      accessToken = tokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);

      // Step 3a: Set the token to expire after the duration Spotify provides
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // Step 4: Clear the URL

      return accessToken;
    } else {
      // Step 1: Redirect user to Spotify authorization page if no token is found
      const scopes = 'playlist-modify-public playlist-modify-private';
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = url;
    }
  },

  // Example of making a Spotify API request using the access token
  search(term) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;

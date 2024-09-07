import fetch from "node-fetch";

const getAccesToken = async () => {
  const tokenurl = "https://accounts.spotify.com/api/token";
  const myId = "bbe3e009ba57426781d4c21d2d88adcc";
  const mySecredId = "481eef07ad0848f3b8911ef5df91fc61";

  try {
    const response = await fetch(tokenurl, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: myId,
        client_secret: mySecredId,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    return data.access_token;
  } catch (error) {
    console.log("Error fetching access token:", error);
  }
};

getAccesToken();

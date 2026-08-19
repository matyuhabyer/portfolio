function json(body, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { ...init, headers });
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Spotify token refresh failed (${response.status}): ${details.slice(0, 160)}`);
  }

  const data = await response.json();
  return data.access_token;
}

function sanitizeTrack(item, isPlaying, progressMs) {
  if (!item?.name) return null;
  return {
    name: item.name,
    artists: item.artists?.map((artist) => artist.name).join(", ") || "Spotify",
    albumImage: item.album?.images?.[0]?.url,
    url: item.external_urls?.spotify,
    isPlaying,
    progressMs,
    durationMs: item.duration_ms,
  };
}

export default {
  async fetch(request) {
    if (request.method !== "GET") {
      return json({ configured: true, error: "Method not allowed." }, { status: 405, headers: { Allow: "GET" } });
    }

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return json({ configured: false, track: null, error: "Spotify activity is not configured yet." }, { status: 503 });
      }

      const authorization = { Authorization: `Bearer ${accessToken}` };
      const currentResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers: authorization });
      let track = null;

      if (currentResponse.status === 204) {
        const recentResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", { headers: authorization });
        if (!recentResponse.ok) throw new Error(`Spotify recent activity failed (${recentResponse.status}).`);
        const recent = await recentResponse.json();
        track = sanitizeTrack(recent.items?.[0]?.track, false);
      } else {
        if (!currentResponse.ok) throw new Error(`Spotify current activity failed (${currentResponse.status}).`);
        const current = await currentResponse.json();
        track = sanitizeTrack(current.item, current.is_playing, current.progress_ms);
      }

      return json(
        { configured: true, track },
        { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
      );
    } catch (error) {
      console.error("Spotify activity error", error);
      return json({ configured: true, track: null, error: "Spotify activity is temporarily unavailable." }, { status: 502 });
    }
  },
};

import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

function loadLocalEnvironment() {
  try {
    const contents = readFileSync(".env.local", "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const separator = trimmed.indexOf("=");
      if (separator < 1) continue;
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // Environment variables may also be supplied directly by the shell.
  }
}

loadLocalEnvironment();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:5173/";

if (!clientId || !clientSecret) {
  console.error("Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local before running this command.");
  process.exit(1);
}

const callback = new URL(redirectUri);
const state = randomBytes(20).toString("hex");
const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
authorizeUrl.search = new URLSearchParams({
  client_id: clientId,
  response_type: "code",
  redirect_uri: redirectUri,
  scope: "user-read-currently-playing user-read-recently-played",
  state,
  show_dialog: "true",
}).toString();

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", redirectUri);
  if (requestUrl.pathname !== callback.pathname) {
    response.writeHead(404).end("Not found");
    return;
  }

  if (requestUrl.searchParams.get("state") !== state) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" }).end("Spotify state verification failed.");
    server.close();
    return;
  }

  const code = requestUrl.searchParams.get("code");
  if (!code) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" }).end("Spotify authorization was not completed.");
    server.close();
    return;
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });
    const tokens = await tokenResponse.json();
    if (!tokenResponse.ok || !tokens.refresh_token) throw new Error(tokens.error_description || "Spotify did not return a refresh token.");

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end("<main style='font:16px system-ui;padding:3rem'><h1>Spotify connected</h1><p>Return to the terminal to finish the private Vercel setup. You may close this tab.</p></main>");
    console.log("\nSpotify refresh token (keep private):\n");
    console.log(tokens.refresh_token);
    console.log("\nAdd this value to Vercel as SPOTIFY_REFRESH_TOKEN, then delete it from your terminal history if saved.\n");
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" }).end("Spotify token exchange failed. Check the terminal.");
    console.error(error);
  } finally {
    server.close();
  }
});

server.listen(Number(callback.port || 80), callback.hostname, () => {
  console.log(`Listening for Spotify at ${redirectUri}`);
  console.log("Open this URL in your browser, sign in with Matthew's Spotify account, and approve access:\n");
  console.log(authorizeUrl.toString());
});

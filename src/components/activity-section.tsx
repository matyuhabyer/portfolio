import { useCallback, useEffect, useMemo, useState } from "react";
import { ExternalLink, GitGraph, Headphones, Loader2, Music2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ListeningTrack = {
  name: string;
  artists: string;
  albumImage?: string;
  url?: string;
  isPlaying: boolean;
  progressMs?: number;
  durationMs?: number;
};

type SpotifyActivityResponse = {
  configured: boolean;
  track: ListeningTrack | null;
  error?: string;
};

type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubContributionResponse = {
  contributions: Contribution[];
};

function buildContributionWeeks(contributions: Contribution[]) {
  const weeks: Array<Array<Contribution | null>> = [];
  let currentWeek: Array<Contribution | null> = Array(7).fill(null);

  contributions.forEach((contribution) => {
    const day = new Date(`${contribution.date}T00:00:00Z`).getUTCDay();
    if (day === 0 && currentWeek.some(Boolean)) {
      weeks.push(currentWeek);
      currentWeek = Array(7).fill(null);
    }
    currentWeek[day] = contribution;
  });

  if (currentWeek.some(Boolean)) weeks.push(currentWeek);
  return weeks;
}

function SpotifyActivity() {
  const [track, setTrack] = useState<ListeningTrack | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");

  const loadListeningActivity = useCallback(async () => {
    try {
      setStatus((current) => current === "ready" ? current : "loading");
      const response = await fetch("/api/spotify", { cache: "no-store" });
      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        throw new Error("The Spotify feed runs through the deployed Vercel function.");
      }

      const data = await response.json() as SpotifyActivityResponse;
      if (!response.ok || !data.configured) {
        throw new Error(data.error || "Spotify activity is not configured yet.");
      }

      setTrack(data.track);
      setStatus("ready");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Spotify activity is temporarily unavailable.");
    }
  }, []);

  useEffect(() => {
    void loadListeningActivity();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void loadListeningActivity();
    }, 15_000);
    return () => window.clearInterval(interval);
  }, [loadListeningActivity]);

  useEffect(() => {
    if (!track?.isPlaying || !track.durationMs) return;

    const interval = window.setInterval(() => {
      setTrack((current) => {
        if (!current?.isPlaying || !current.durationMs) return current;
        const nextProgress = Math.min(current.durationMs, (current.progressMs ?? 0) + 1_000);
        return nextProgress === current.progressMs ? current : { ...current, progressMs: nextProgress };
      });
    }, 1_000);

    return () => window.clearInterval(interval);
  }, [track?.durationMs, track?.isPlaying, track?.name]);

  const progress = track?.durationMs && track.progressMs
    ? Math.min(100, (track.progressMs / track.durationMs) * 100)
    : 0;

  return (
    <article className="activity-panel spotify-activity">
      <header className="activity-panel-heading">
        <span className="activity-panel-icon"><Headphones aria-hidden /></span>
        <div><p>Listening signal</p><h3>Spotify activity</h3></div>
        <span className="spotify-auto-update"><i aria-hidden />Live</span>
      </header>

      <div className="activity-panel-body" aria-live="polite">
        {track ? (
          <div className="spotify-track">
            <div className="spotify-artwork">
              {track.albumImage ? <img src={track.albumImage} alt="" /> : <Music2 aria-hidden />}
            </div>
            <div className="spotify-track-copy">
              <span className={cn("spotify-status", track.isPlaying && "is-live")}>{track.isPlaying ? "Now playing" : "Recently played"}</span>
              <h4>{track.name}</h4>
              <p>{track.artists}</p>
              {track.isPlaying ? <div className="spotify-progress" aria-label="Track progress"><span style={{ width: `${progress}%` }} /></div> : null}
              {track.url ? <a href={track.url} target="_blank" rel="noopener noreferrer">Open in Spotify <ExternalLink aria-hidden /></a> : null}
            </div>
          </div>
        ) : status === "loading" ? (
          <div className="activity-state"><Loader2 className="animate-spin" aria-hidden /><p>Finding Matthew’s latest track…</p></div>
        ) : (
          <div className="activity-state activity-state-disconnected">
            <Music2 aria-hidden />
            <div>
              <h4>{message.includes("Vercel") || message.includes("configured") ? "Listening feed awaiting deployment" : "The listening signal is quiet"}</h4>
              <p>{message || "No current or recent Spotify track was returned."}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function GitHubActivity() {
  const username = portfolioData.profile.github.split("/").filter(Boolean).at(-1) ?? "matyuhabyer";
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Contribution activity could not be loaded.");
        return response.json() as Promise<GitHubContributionResponse>;
      })
      .then((data) => {
        setContributions(data.contributions ?? []);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });
    return () => controller.abort();
  }, [username]);

  const weeks = useMemo(() => buildContributionWeeks(contributions), [contributions]);
  const total = useMemo(() => contributions.reduce((sum, day) => sum + day.count, 0), [contributions]);

  return (
    <article className="activity-panel github-activity">
      <header className="activity-panel-heading">
        <span className="activity-panel-icon"><GitGraph aria-hidden /></span>
        <div><p>Development trail</p><h3>GitHub contributions</h3></div>
        <a href={portfolioData.profile.github} target="_blank" rel="noopener noreferrer" aria-label="Open Matthew's GitHub profile"><ExternalLink aria-hidden /></a>
      </header>

      <div className="activity-panel-body">
        {status === "loading" ? (
          <div className="activity-state"><Loader2 className="animate-spin" aria-hidden /><p>Mapping the latest contributions…</p></div>
        ) : status === "error" ? (
          <div className="activity-state"><GitGraph aria-hidden /><p>The live heatmap is unavailable. Visit GitHub to see the complete activity record.</p></div>
        ) : (
          <>
            <div className="github-summary"><strong>{total.toLocaleString()}</strong><span>contributions in the last year</span></div>
            <div className="github-heatmap-scroll">
              <div className="github-heatmap" role="img" aria-label={`${total} GitHub contributions in the last year`}>
                {weeks.map((week, weekIndex) => (
                  <div className="github-week" key={`week-${weekIndex}`}>
                    {week.map((day, dayIndex) => day ? (
                      <span key={day.date} className={`github-day level-${day.level}`} title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`} />
                    ) : <span key={`empty-${weekIndex}-${dayIndex}`} className="github-day is-empty" />)}
                  </div>
                ))}
              </div>
            </div>
            <div className="github-legend" aria-hidden><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className={`github-day level-${level}`} />)}<span>More</span></div>
          </>
        )}
      </div>
    </article>
  );
}

export function ActivitySection() {
  return (
    <section id="activity" className="celestial-section activity-section scroll-mt-24" aria-labelledby="activity-title">
      <div className="section-heading">
        <p className="section-eyebrow">Signals from the present</p>
        <h2 id="activity-title">What I’m up to</h2>
        <p>A live glimpse of what I’m listening to and the code I’m bringing to life.</p>
      </div>
      <div className="activity-grid">
        <SpotifyActivity />
        <GitHubActivity />
      </div>
    </section>
  );
}

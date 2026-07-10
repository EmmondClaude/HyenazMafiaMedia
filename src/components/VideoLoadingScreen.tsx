"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic video loading screen — faithful port of the Higgsfield "Crimson
 * Rain" intro (docs handoff / hyena_loading_screen.html). Full-screen intro
 * video with native audio (autoplay muted, click to unmute), skip button +
 * Enter/Space/Esc, film grain / vignette / letterbox. When the video ends (or
 * on skip) the enter screen fades in over the source still; ENTER SITE removes
 * the overlay to reveal the site — the handoff's z-9999 overlay option.
 *
 * Shows once per tab session (like the prior splash). Styles live in globals.css
 * under `.hmm-loader`, ported verbatim from the handoff's <style>.
 */
const VIDEO_SRC = "/brand/loading-intro.mp4";

export function VideoLoadingScreen() {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [enterVisible, setEnterVisible] = useState(false);
  const [unmuteVisible, setUnmuteVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  // Show once per tab session; returning visitors skip it.
  useEffect(() => {
    if (sessionStorage.getItem("hmm-intro-video")) {
      const t = setTimeout(() => setShow(false), 0);
      return () => clearTimeout(t);
    }
  }, []);

  // Lock body scroll while the overlay is up.
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  // Video playback + interactions (ported from the handoff's <script>).
  useEffect(() => {
    if (!show) return;
    const video = videoRef.current;
    if (!video) return;

    const showEnter = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setEnterVisible(true);
    };

    // Try to autoplay (muted — browsers require it).
    video.muted = true;
    let promptTimer: ReturnType<typeof setTimeout> | undefined;
    video
      .play()
      .then(() => {
        setUnmuteVisible(true);
        promptTimer = setTimeout(() => setUnmuteVisible(false), 4000);
      })
      .catch(() => {
        document.addEventListener(
          "click",
          () => {
            video.muted = false;
            video.play().catch(() => {});
          },
          { once: true },
        );
      });

    // Click anywhere to unmute.
    const onDocClick = () => {
      if (video.muted) {
        video.muted = false;
        setUnmuteVisible(false);
      }
    };
    const onEnded = () => showEnter();
    const onKey = (e: KeyboardEvent) => {
      if (!finishedRef.current && (e.key === "Enter" || e.key === " " || e.key === "Escape")) {
        e.preventDefault();
        video.pause();
        showEnter();
      }
    };

    document.addEventListener("click", onDocClick);
    video.addEventListener("ended", onEnded);
    document.addEventListener("keydown", onKey);
    return () => {
      if (promptTimer) clearTimeout(promptTimer);
      document.removeEventListener("click", onDocClick);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("keydown", onKey);
    };
  }, [show]);

  function skip() {
    videoRef.current?.pause();
    if (!finishedRef.current) {
      finishedRef.current = true;
      setEnterVisible(true);
    }
  }

  function enterSite() {
    sessionStorage.setItem("hmm-intro-video", "1");
    setExiting(true);
    setTimeout(() => setShow(false), 500);
  }

  if (!show) return null;

  return (
    <div className={`hmm-loader${exiting ? " hmm-exit" : ""}`} role="dialog" aria-label="Intro">
      <div className="video-wrap">
        <video ref={videoRef} id="introVideo" preload="auto" playsInline>
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      <div className="vignette" />
      <div className="film-grain" />
      <div className="letterbox top" />
      <div className="letterbox bottom" />

      <button type="button" className="skip-btn" onClick={skip}>
        SKIP INTRO &rarr;
      </button>
      <div className={`unmute-prompt${unmuteVisible ? " visible" : ""}`}>
        &#128264; CLICK TO ENABLE SOUND
      </div>

      <div className={`enter-screen${enterVisible ? " visible" : ""}`}>
        <div className="enter-still" />
        <div className="enter-content">
          <button type="button" className="enter-btn" onClick={enterSite}>
            ENTER SITE
          </button>
        </div>
      </div>
    </div>
  );
}

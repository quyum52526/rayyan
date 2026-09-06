"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

type GalleryAsset = {
  type: "image" | "video";
  src: string;
  alt: string;
  label: string;
};

type ProductGalleryProps = {
  productName: string;
  frontImage: string;
  detailImage: string;
  videoSrc?: string;
};

export default function ProductGallery({ productName, frontImage, detailImage, videoSrc }: ProductGalleryProps) {
  const assets: GalleryAsset[] = [
    { type: "image", src: frontImage, alt: `${productName} প্যাকেজ`, label: "প্যাকেজ" },
    { type: "image", src: detailImage, alt: `${productName} উপকরণ`, label: "উপকরণ" },
    { type: "video", src: videoSrc || "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4", alt: `${productName} তৈরির ভিডিও`, label: "ভিডিও" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef<number | null>(null);
  const activeAsset = assets[activeIndex];

  const selectAsset = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
    setIsMuted(true);
    setZoomOrigin("50% 50%");
    if (videoRef.current) videoRef.current.pause();
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    const muted = !videoRef.current.muted;
    videoRef.current.muted = muted;
    setIsMuted(muted);
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="product-gallery">
      <div className={`gallery-main-viewport ${activeAsset.type === "image" ? "gallery-zoom-ready" : "gallery-video-active"}`} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) > 45) selectAsset((activeIndex + (distance < 0 ? 1 : -1) + assets.length) % assets.length); touchStartX.current = null; }} onMouseMove={(event) => {
        if (activeAsset.type !== "image") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setZoomOrigin(`${((event.clientX - bounds.left) / bounds.width) * 100}% ${((event.clientY - bounds.top) / bounds.height) * 100}%`);
      }} onMouseLeave={() => setZoomOrigin("50% 50%")}>
        {activeAsset.type === "image" ? <img className="gallery-main-media" src={activeAsset.src} alt={activeAsset.alt} style={{ transformOrigin: zoomOrigin }} /> : <div className="gallery-video-wrap"><video ref={videoRef} className="gallery-main-media" src={activeAsset.src} poster={detailImage} muted={isMuted} loop playsInline autoPlay={false} /><button className="gallery-play-button" onClick={toggleVideo} aria-label={isPlaying ? "ভিডিও থামান" : "ভিডিও চালান"}>{isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}</button><button className="gallery-muted" onClick={toggleSound} aria-label={isMuted ? "শব্দ চালু করুন" : "শব্দ বন্ধ করুন"}>{isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />} {isMuted ? "মিউটেড" : "শব্দ চালু"}</button></div>}
  <span className="gallery-asset-label">{activeAsset.label}</span>
      </div>
      <div className="gallery-thumbnails" role="tablist" aria-label="পণ্যের মিডিয়া">
        {assets.map((asset, index) => <button className={`gallery-thumbnail ${index === activeIndex ? "active" : ""}`} onClick={() => selectAsset(index)} role="tab" aria-selected={index === activeIndex} aria-label={`${asset.label} দেখুন`} key={asset.label}><img src={asset.src === assets[2].src ? detailImage : asset.src} alt="" />{asset.type === "video" && <span className="thumbnail-play"><Play size={11} fill="currentColor" /></span>}<small>{asset.label}</small></button>)}
      </div>
    </div>
  );
}

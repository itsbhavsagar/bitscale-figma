"use client";

import { Modal } from "@/components/shared/Modal";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  videoUrl?: string;
}

function getEmbedUrl(url: string): string | null {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/,
  );
  if (youtubeMatch?.[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch?.[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  return null;
}

export function VideoModal({
  open,
  onClose,
  title,
  videoUrl,
}: VideoModalProps) {
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <Modal open={open} onClose={onClose} title={title} size="lg">
      <div className="video-modal-body">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="video-modal-embed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="video-modal-player"
          />
        ) : (
          <div className="video-modal-placeholder">
            Add a video URL to this slide in `data/latest-content.ts`.
          </div>
        )}
      </div>
    </Modal>
  );
}

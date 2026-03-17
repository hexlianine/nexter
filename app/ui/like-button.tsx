"use client";

import { useState } from "react";

type LikeButtonProps = {
  initialCount?: number;
  label?: string;
};

export default function LikeButton({
  initialCount = 0,
  label = "Like",
}: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="like-button"
      aria-pressed={liked}
      aria-label={liked ? `Unlike (${count})` : `Like (${count})`}
    >
      <span className="like-icon" aria-hidden="true">
        {liked ? "♥" : "♡"}
      </span>
      <span className="like-label">{label}</span>
      <span className="like-count">{count}</span>
    </button>
  );
}

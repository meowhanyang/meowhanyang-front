'use client';

import { useState, useEffect } from 'react';
import styles from './LikeButton.module.css';

interface LikeButtonProps {
  isLiked: boolean;
  onClick: () => void;
}

const LikeButton = ({ isLiked: initialIsLiked, onClick }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
    onClick();
  };

  return (
    <button
      className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
      onClick={handleClick}
    >
      <div className={styles.heartBg}>
        <div
          className={`${styles.heart} ${isLiked ? styles.heartActive : ''}`}
        />
      </div>
    </button>
  );
};

export default LikeButton;

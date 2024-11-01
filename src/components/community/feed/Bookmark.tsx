import { useRive } from '@rive-app/react-canvas';
import { useEffect } from 'react';

interface BookmarkProps {
  isBookmarked: boolean;
  toggleBookmark: () => void;
}

export default function Bookmark({
  isBookmarked,
  toggleBookmark
}: BookmarkProps) {
  const { rive, RiveComponent } = useRive({
    src: '/images/icons/bookmark.riv',
    stateMachines: 'State Machine 1'
  });

  useEffect(() => {
    if (!rive) return;
    rive?.play(isBookmarked ? 'save-click' : 'unsave-click');
  }, [isBookmarked, rive]);

  return (
    <div className="h-6 w-6">
      <RiveComponent
        onClick={e => {
          e.stopPropagation(), toggleBookmark();
        }}
      />
    </div>
  );
}

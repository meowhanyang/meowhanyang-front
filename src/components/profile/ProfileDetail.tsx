interface ProfileDetailProps {
  catCount: number;
  postCount: number;
  bookmarkCount?: number;
}

export default function Detail({
  catCount,
  postCount,
  bookmarkCount
}: ProfileDetailProps) {
  return (
    <div className="flex items-center justify-center self-stretch px-6">
      <section
        className="flex max-w-[100px] flex-1 flex-col items-center justify-center px-4 py-3"
        aria-label="Cat Count"
      >
        <div className="font-bold">{catCount}</div>
        <div className="text-gr-600">고양이</div>
      </section>
      <div className="h-5 w-[1px] bg-gr-100" aria-hidden="true"></div>
      <section
        className="flex max-w-[100px] flex-1 flex-col items-center justify-center px-4 py-3"
        aria-label="Post Count"
      >
        <div className="font-bold">{postCount}</div>
        <div className="text-gr-600">게시물</div>
      </section>
      {bookmarkCount !== undefined && (
        <>
          <div className="h-5 w-[1px] bg-gr-100" aria-hidden="true"></div>
          <section
            className="flex max-w-[100px] flex-1 flex-col items-center justify-center px-4 py-3"
            aria-label="Bookmark Count"
          >
            <div className="font-bold">{bookmarkCount}</div>
            <div className="text-gr-600">북마크</div>
          </section>
        </>
      )}
    </div>
  );
}

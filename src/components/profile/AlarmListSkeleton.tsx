import { Skeleton } from '@/components/ui/Skeleton';

const AlarmListSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <div key={index} className="bg-gr-white p-4">
          <div className="flex items-center justify-start gap-4">
            <div className="w-fit">
              <Skeleton className="h-9 w-9 rounded-full bg-gr-100" />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Skeleton className="h-5 w-full rounded-16 bg-gr-100" />
              <Skeleton className="h-4 w-16 rounded-16 bg-gr-100" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AlarmListSkeleton;

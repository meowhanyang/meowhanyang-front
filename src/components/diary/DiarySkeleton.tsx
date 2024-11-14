import { Skeleton } from '@/components/ui/Skeleton';

const DiarySkeleton = () => {
  return (
    <div>
      <Skeleton className="h-[300px] w-full rounded-b-none rounded-t-2xl bg-gr-100" />
      <div className="flex flex-col gap-2 rounded-b-2xl bg-gr-white p-4">
        <div className="flex gap-1">
          <Skeleton className="h-5 w-11 rounded-[4px] bg-gr-100" />
          <Skeleton className="h-5 w-9 rounded-[4px] bg-gr-100" />
        </div>
        <div className="flex flex-col gap-[6px]">
          <Skeleton className="h-4 w-full rounded-[4px] bg-gr-100" />
          <Skeleton className="h-4 w-72 rounded-[4px] bg-gr-100" />
          <Skeleton className="h-4 w-52 rounded-[4px] bg-gr-100" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <Skeleton className="h-6 w-6 rounded-full bg-gr-100" />
            <Skeleton className="-ml-1 h-6 w-6 rounded-full bg-gr-100" />
            <Skeleton className="-ml-1 h-6 w-6 rounded-full bg-gr-100" />
            <Skeleton className="-ml-1 h-6 w-6 rounded-full bg-gr-100" />
            <Skeleton className="-ml-1 h-6 w-6 rounded-full bg-gr-100" />
          </div>
          <Skeleton className="h-4 w-[100px] rounded-[4px] bg-gr-100" />
        </div>
      </div>
    </div>
  );
};

export default DiarySkeleton;

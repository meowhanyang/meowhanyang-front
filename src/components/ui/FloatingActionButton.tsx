import Image from 'next/image';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <div className="fixed bottom-[100px] left-1/2 z-10 z-20 w-full max-w-[640px] -translate-x-1/2 transform">
      <button
        className="absolute right-5 flex h-12 w-12 items-center justify-center rounded-full bg-pr-500"
        onClick={onClick}
      >
        <Image src="/images/icons/plus.svg" alt="icon" width={24} height={24} />
      </button>
    </div>
  );
};

export default FloatingActionButton;

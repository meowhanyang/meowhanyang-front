import BottomNavBar from '@/components/ui/BottomNavBar';

export default function CommunityLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-screen bg-gr-100">
      <section className="relative mx-auto h-full max-w-[640px]">
        {children}
        <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-[640px] -translate-x-1/2 transform">
          <BottomNavBar />
        </div>
      </section>
    </div>
  );
}

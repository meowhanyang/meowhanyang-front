import BottomNavBar from '@/components/ui/BottomNavBar';

export default function CommunityLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-screen bg-gr-100">
      <section className="relative mx-auto min-h-screen max-w-[640px]">
        {children}
        <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-[640px] -translate-x-1/2 transform">
          <BottomNavBar />
        </div>
      </section>
    </div>
  );
}

import BottomNavBar from '@/components/ui/BottomNavBar';

export default function CommunityLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gr-50">
      {children}
      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center">
        <BottomNavBar />
      </div>
    </section>
  );
}

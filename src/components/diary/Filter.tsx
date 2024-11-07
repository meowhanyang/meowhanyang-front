import Profile from '@/components/ui/Profile';
import Badge from '@/components/ui/Badge';

interface FilterProps {
  id: number;
  imageUrl: string;
  isCoParented?: boolean;
  onClick?: () => void;
  name?: string;
  type?: 'cat';
}

const Filter = ({
  id,
  imageUrl,
  isCoParented,
  name,
  type,
  onClick
}: FilterProps) => {
  return (
    <>
      <section
        className={`flex flex-col items-center justify-center bg-gr-white ${type === 'cat' ? 'px-0 py-0' : 'gap-2 px-2 py-3'}`}
      >
        <button className="relative flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-gr-100 bg-gr-white active:border-pr-500">
          <Profile
            onClick={onClick}
            items={[
              {
                id: id,
                imageUrl: imageUrl,
                style: 'w-14 h-14 rounded-[20px] border border-gr-50'
              }
            ]}
          />
          {isCoParented && (
            <div className="absolute bottom-0 right-0 rounded-full border-15 border-gr-white">
              <Badge
                type="icon"
                icon="/images/icons/share.svg"
                bgColor="bg-gradient-01"
              />
            </div>
          )}
        </button>
        <div className="text-body-4">{name}</div>
      </section>
    </>
  );
};

export default Filter;

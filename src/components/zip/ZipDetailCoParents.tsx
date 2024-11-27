import { CoParent } from '@/app/zip/catType';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';
import Image from 'next/image';

const ZipDetailCoParents = ({ ...props }: CoParent) => {
  return (
    <div className="flex flex-col items-center gap-2 overflow-scroll p-2">
      <Image
        src={props.imageUrl || DEFAULT_PROFILE_IMAGE_SRC}
        alt={props.nickname}
        width={56}
        height={56}
        className="rounded-full"
      />
      <h3 className="text-body-4 text-gr-black">{props.nickname}</h3>
    </div>
  );
};

export default ZipDetailCoParents;

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/services/profile';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';

const BOTTOM_NAV = [
  {
    key: 'diary',
    value: '일지',
    img: {
      active: '/images/icons/bottom-diary-active.svg',
      default: '/images/icons/bottom-diary-default.svg'
    }
  },
  {
    key: 'zip',
    value: '모음집',
    img: {
      active: '/images/icons/bottom-zip-active.svg',
      default: '/images/icons/bottom-zip-default.svg'
    }
  },
  {
    key: 'community',
    value: '커뮤니티',
    img: {
      active: '/images/icons/bottom-community-active.svg',
      default: '/images/icons/bottom-community-default.svg'
    }
  },
  {
    key: 'profile',
    value: '프로필',
    img: {
      active: DEFAULT_PROFILE_IMAGE_SRC,
      default: DEFAULT_PROFILE_IMAGE_SRC
    }
  }
];

const BottomNavBar = () => {
  const [activeNav, setActiveNav] = useState('diary');
  const pathName = usePathname();

  const { data: myProfile, isLoading } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile()
  });

  useEffect(() => {
    const path = pathName.split('/')[1];
    setActiveNav(path);
  }, [pathName]);

  if (isLoading) return;

  return (
    <div className="flex w-full justify-evenly rounded-t-[20px] bg-gr-white px-2 pb-[34px] pt-2 shadow-bottomNav">
      {BOTTOM_NAV.map(nav => {
        const imgSrc =
          nav.key === 'profile'
            ? myProfile.profileImageUrl || nav.img.default
            : nav.key === activeNav
              ? nav.img.active
              : nav.img.default;

        return (
          <Link key={nav.key} href={`/${nav.key}`} className="relative px-4">
            {nav.key === 'profile' && (
              <div className="absolute right-4">
                <Badge type="default" bgColor="bg-pr-500" />
              </div>
            )}
            <Image
              src={imgSrc}
              alt={nav.key}
              width={40}
              height={40}
              className="rounded-full p-[3px]"
            />
            <h5 className="text-center text-[10px] font-normal text-gr-800">
              {nav.value}
            </h5>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavBar;

import { getMyProfile } from '@/services/profile';
import { useQuery } from '@tanstack/react-query';

export default function useMyProfileQuery() {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile()
  });
}

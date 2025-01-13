import returnFetch from '@/utils/returnFetch';
import { getCookie } from '@/utils/common';
import { useQuery } from '@tanstack/react-query';

const memberToken = getCookie('Authorization');
const fetchExtendedAuth = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API + '/api/auth/v1.0.0',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${memberToken}`
  }
});

export const useCatDetail = (id: number) => {
  const fetchCatDetail = async (id: number) => {
    const response = await fetchExtendedAuth(`/cats/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
  };

  return useQuery({
    queryKey: ['catDetail', id],
    queryFn: () => fetchCatDetail(id),
    staleTime: 1000 * 60 * 10
  });
};

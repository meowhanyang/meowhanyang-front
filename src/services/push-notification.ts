import { fetchExtendedAuth } from '@/services/nickname';
import { getCookie } from '@/utils/common';

export const getPushNotification = async () => {
  try {
    const memberToken = getCookie('Authorization');
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${memberToken}`
      }
    };
    const response = await fetchExtendedAuth(
      '/members/notifications',
      requestOptions
    );

    const isSuccess = (response.body as any).status;
    if (isSuccess) {
      const data = (response.body as any).data;
      return data;
    } else {
      throw new Error('푸시 알람 여부 조회 중 오류 발생:');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('푸시 알람 여부 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('푸시 알람 여부 조회 중 오류 발생:');
    }
  }
};

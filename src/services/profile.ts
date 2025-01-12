import { fetchExtended } from '@/services/cat';
import { fetchExtendedAuth } from '@/services/signup';
import { getCookie, objectToQueryString } from '@/utils/common';

export const getMyProfile = async () => {
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
      '/profiles/my-profile',
      requestOptions
    );

    const isSuccess = (response.body as any).status;
    if (isSuccess) {
      const data = (response.body as any).data;
      return data;
    } else {
      throw new Error('내 프로필 조회 중 오류 발생:');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('내 프로필 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('내 프로필 조회 중 오류 발생:');
    }
  }
};

export const getMyFeeds = async ({
  page,
  size
}: {
  page: number;
  size: number;
}) => {
  try {
    const memberToken = getCookie('Authorization');

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });

    const response = await fetchExtended(
      `/profiles/posts?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${memberToken}`
        }
      }
    );
    if (response.body) {
      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody);
      return parsedBody;
    } else {
      throw new Error('응답 본문이 없습니다.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('내 피드 조회 중 오류 발생: ' + error.message);
    }
  }
};

export const getMyBookmarks = async ({
  page,
  size
}: {
  page: number;
  size: number;
}) => {
  try {
    const memberToken = getCookie('Authorization');

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });

    const response = await fetchExtended(
      `/profiles/bookmarks?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${memberToken}`
        }
      }
    );
    if (response.body) {
      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody);
      return parsedBody;
    } else {
      throw new Error('응답 본문이 없습니다.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('내 피드 조회 중 오류 발생: ' + error.message);
    }
  }
};

export const getClickedUserProfile = async (memberId: number) => {
  try {
    const queryParams = new URLSearchParams({
      'member-id': memberId.toString()
    });

    const memberToken = getCookie('Authorization');
    const response = await fetchExtendedAuth(
      `/profiles?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${memberToken}`
        }
      }
    );

    const responseBody = response.body as any;
    const isSuccess = responseBody.status;

    if (isSuccess) {
      return responseBody.data;
    } else {
      throw new Error('사용자 프로필 조회 중 오류 발생');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('사용자 프로필 조회 중 오류 발생: ' + error.message);
    } else {
      throw new Error('사용자 프로필 조회 중 오류 발생');
    }
  }
};

export const getOtherUserFeeds = async ({
  page,
  size,
  offset,
  memberId
}: {
  page: number;
  size: number;
  offset?: number;
  memberId: number;
}) => {
  try {
    const memberToken = getCookie('Authorization');
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      offset: offset ? offset.toString() : '0',
      'member-id': memberId.toString()
    });

    const response = await fetchExtendedAuth(
      `/profiles/posts?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${memberToken}`
        }
      }
    );
    const responseBody = response.body as { items?: any[] };
    return responseBody?.items;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('내 피드 조회 중 오류 발생: ' + error.message);
    }
  }
};

type NotiSearchOption = {
  page: number;
  size: number;
};

export const getNotifications = async ({ page, size }: NotiSearchOption) => {
  try {
    const memberToken = getCookie('Authorization');

    const response = await fetchExtended(
      `/notifications?${objectToQueryString({ page, size })}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${memberToken}`
        }
      }
    );
    if (response.body) {
      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody);
      return parsedBody;
    } else {
      throw new Error('응답 본문이 없습니다.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('내 소식 조회 중 오류 발생: ' + error.message);
    } else {
      throw new Error('내 소식 조회 중 오류 발생');
    }
  }
};

export const getCoParentNotifications = async ({
  page,
  size
}: NotiSearchOption) => {
  try {
    const memberToken = getCookie('Authorization');

    const response = await fetchExtended(
      `/notifications/co-parent?${objectToQueryString({ page, size })}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${memberToken}`
        }
      }
    );
    // const responseBody = response.body as { items?: any[] };
    // return responseBody?.items;
    if (response.body) {
      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody);
      return parsedBody;
    } else {
      throw new Error('응답 본문이 없습니다.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('공동 냥육 알림 조회 중 오류 발생: ' + error.message);
    } else {
      throw new Error('공동 냥육 알림 조회 중 오류 발생');
    }
  }
};

export const readNotificationOnServer = async (notificationId: number) => {
  try {
    const memberToken = getCookie('Authorization');

    const response = await fetchExtendedAuth(
      `/notifications/${notificationId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${memberToken}`
        }
      }
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('알림 읽음 처리 중 오류 발생:' + error.message);
    } else {
      throw new Error('알림 읽음 처리 중 오류 발생:');
    }
  }
};

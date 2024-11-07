import { fetchExtendedAuth } from '@/services/signup';
import { getCookie } from '@/utils/common';

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
  size,
  offset
}: {
  page: number;
  size: number;
  offset?: number;
}) => {
  try {
    const memberToken = getCookie('Authorization');

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      offset: offset ? offset.toString() : '0'
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

export const getMyBookmarks = async ({
  page,
  size,
  offset
}: {
  page: number;
  size: number;
  offset?: number;
}) => {
  try {
    const memberToken = getCookie('Authorization');

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      offset: offset ? offset.toString() : '0'
    });

    const response = await fetchExtendedAuth(
      `/profiles/bookmarks?${queryParams.toString()}`,
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

export const getNotifications = async () => {
  try {
    const memberToken = getCookie('Authorization');

    const response = await fetchExtendedAuth('/notifications', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${memberToken}`
      }
    });

    const responseBody = response.body as { items?: any[] };
    return responseBody?.items;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('내 소식 조회 중 오류 발생: ' + error.message);
    } else {
      throw new Error('내 소식 조회 중 오류 발생');
    }
  }
};

export const getCoParentNotifications = async () => {
  try {
    const memberToken = getCookie('Authorization');

    const response = await fetchExtendedAuth('/notifications/co-parent', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${memberToken}`
      }
    });

    const responseBody = response.body as { items?: any[] };
    return responseBody?.items;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('공동 냥육 알림 조회 중 오류 발생: ' + error.message);
    } else {
      throw new Error('공동 냥육 알림 조회 중 오류 발생');
    }
  }
};

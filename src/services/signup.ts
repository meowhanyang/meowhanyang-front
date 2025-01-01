import returnFetchJson from '@/utils/returnFetchJson';
import { getCookie, removeCookie } from '@/utils/common';

export const fetchExtendedPublic = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/public/v1.0.0',
  headers: { Accept: 'application/json' }
});
export const fetchExtendedAuth = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API + '/api/auth/v1.0.0'
});

export const signUpOnServer = async (reqObj: {
  email: string;
  password: string;
  loginType: string;
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj
    };

    const response = await fetchExtendedPublic(
      '/members/sign-up',
      requestOptions
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('닉네임 유효성 검사 중 오류 발생:' + error.message);
    } else {
      throw new Error('닉네임 유효성 검사 중 오류 발생:');
    }
  }
};

export const resetPwdOnServer = async (reqObj: {
  password: string;
  token: string;
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetchExtendedPublic(
      '/members/reset-password',
      requestOptions
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('닉네임 유효성 검사 중 오류 발생:' + error.message);
    } else {
      throw new Error('닉네임 유효성 검사 중 오류 발생:');
    }
  }
};

export const deleteAccountOnServer = async () => {
  try {
    const memberToken = getCookie('Authorization');
    const requestOptions = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${memberToken}`
      }
    };
    const response = await fetchExtendedAuth(
      '/members/withdraw',
      requestOptions
    );
    console.log(response, 'response');
    if (response.status === 200) {
      removeCookie('Authorization');
      location.replace('/signin');
    }

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('회원 탈퇴 중 오류 발생:' + error.message);
    } else {
      throw new Error('회원 탈퇴 중 오류 발생:');
    }
  }
};

import returnFetchJson from '@/utils/returnFetchJson';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/public/v1.0.0',
  headers: { Accept: 'application/json' }
});

export const checkMembershipByEmail = async (email: string) => {
  try {
    const response = await fetchExtended(
      `/members/email-exists?email=${encodeURIComponent(email)}`,
      { method: 'GET' }
    );
    const isSuccess = (response.body as any).status;
    if (isSuccess) {
      const data = (response.body as any).data;
      return data;
    } else {
      console.error('이메일로 가입 여부 확인 중 오류:');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const signInOnServer = async (reqObj: {
  email: string;
  password: string;
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      credentials: 'include' as RequestCredentials
    };
    const response = await fetchExtended('/members/login', requestOptions);
    const token = response.headers.get('Authorization');

    if (token) {
      document.cookie = `Authorization=${token}; path=/; max-age=3600; secure;`;
      return response;
    } else {
      console.log('Sign-in error:', response.body);
      const errorData = (await response.body) as any;
      throw new Error(errorData.message || '로그인 요청 중 오류 발생');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendPwdResetEmail = async (reqObj: { email: string }) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetchExtended(
      '/members/send-password-reset-email',
      requestOptions
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(
        '비밀번호 초기화 메일 전송 중 오류 발생:' + error.message
      );
    } else {
      throw new Error('비밀번호 초기화 메일 전송 중 오류 발생');
    }
  }
};

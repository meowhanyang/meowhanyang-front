import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import returnFetchJson from '@/utils/returnFetchJson';
import { cookies } from 'next/headers';
import { checkMembershipByEmail } from '@/services/signin';
import { parseCookieString } from '@/utils/common';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.MEOW_API + '/api/public/v1.0.0',
  headers: { Accept: 'application/json' }
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000
      }
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        const [signInInfo, signInResult] = await Promise.all([
          checkMembershipByEmail(user.email || ''),
          signInOnServerWithSocial({
            email: user.email || '',
            password: user.id || ''
          }).catch(() => null)
        ]);

        if (signInInfo && signInInfo.isEmailExists) {
          return true;
        } else {
          await signUpOnServerWithSocialLogin({
            email: user.email || '',
            oauthId: user.id || '',
            loginType: account?.provider.toUpperCase() || ''
          });
          return true;
        }
      } catch (error) {
        console.error(
          'Sign in error:',
          error,
          JSON.stringify(error, Object.getOwnPropertyNames(error))
        );
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      const cookieList = cookies();
      const isMember = cookieList.get('Authorization');
      return isMember ? '/diary' : '/signin';
    }
  },
  events: {
    async signOut() {
      cookies().delete('Authorization');
      cookies().delete('Authorization-Refresh');
    }
  }
});

const signInOnServerWithSocial = async (reqObj: {
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
    const setCookies = response.headers.get('set-cookie');
    const parsedCookie = parseCookieString(setCookies || '');

    if (response.status === 200) {
      cookies().set({
        name: 'Authorization',
        value: token || '',
        secure: true,
        maxAge: 60 * 60 * 4
      });

      cookies().set({
        name: 'Authorization-Refresh',
        value: parsedCookie.token || '',
        maxAge: parseInt(parsedCookie.maxAge, 10),
        httpOnly: true,
        secure: true
      });

      if (typeof window !== 'undefined') {
        document.cookie = `Authorization=${token}; path=/; max-age=${60 * 60 * 4}; secure;`;
      }

      return true;
    }
    return false;
  } catch (error) {
    console.error('SignInOnServerWithSocial error:', error);
    return false;
  }
};

const signUpOnServerWithSocialLogin = async (reqObj: {
  email: string;
  oauthId: string;
  loginType: string;
}) => {
  console.log('signUpOnServerWithSocialLogin', reqObj);
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      credentials: 'include' as RequestCredentials
    };

    const response = await fetchExtended('/members/sign-up', requestOptions);

    if (response.status === 200) {
      await signInOnServerWithSocial({
        email: reqObj.email || '',
        password: reqObj.oauthId || ''
      });
    }
  } catch (error) {
    console.error(
      'SignUpOnServerWithSocialLogin',
      error,
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    return false;
  }
};

export { handler as GET, handler as POST };

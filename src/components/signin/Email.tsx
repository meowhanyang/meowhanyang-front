import { Input } from '@/components/ui/Input';
import useEmailHandler from '@/utils/useEmailHandler';
import { checkMembershipByEmail } from '@/services/signin';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/EmailContext';
import Button from '@/components/ui/Button';
type Step = 'email' | 'accountInfo' | 'password' | 'main' | 'complete';

interface EmailProps {
  setStep: (step: Step) => void;
}

const Email = ({ setStep }: EmailProps) => {
  const router = useRouter();
  const { email, handleEmailChange } = useEmailHandler();
  const { setEmail, setLoginType } = useUser();

  const handleVerifyAccount = async () => {
    const signInInfo = await checkMembershipByEmail(email.value);
    setEmail(email.value);

    if (signInInfo && signInInfo.isEmailExists) {
      if (signInInfo.loginType === 'EMAIL') {
        setStep('password');
      } else {
        setStep('accountInfo');
        setLoginType(signInInfo.loginType);
      }
    } else {
      router.push('/signup', { scroll: false });
    }
  };

  return (
    <section className="w-full px-6 pt-12 text-[24px] font-bold text-gray-800">
      <div className="mb-[32px]">
        이메일을 입력하여 <br /> 로그인해 주세요
      </div>
      <div className="pb-4">
        <Input
          variant="outlined"
          placeholder="이메일을 입력하세요"
          value={email.value}
          onChange={handleEmailChange}
          error={email.error ? true : false}
          helperText={email.error ? '8자 이상 / 영문, 숫자, 특수문자 가능' : ''}
        />
      </div>
      <Button
        onClick={handleVerifyAccount}
        className="w-full rounded-16 bg-pr-500 px-4 py-2 disabled:bg-gr-200"
        disabled={!email.value || email.error}
      >
        <Button.Text
          text="계정 확인하기"
          className="text-btn-1 text-gr-white"
        />
      </Button>
    </section>
  );
};

Email.displayName = 'Email';
export default Email;

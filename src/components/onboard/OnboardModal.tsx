import { useCallback, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { debounce } from 'lodash';
import OnboardProfile from '@/components/onboard/OnboardProfile';
import Topbar from '@/components/ui/Topbar';

interface OnboardModalProps {
  onClose: () => void;
}

const OnboardModal = ({ onClose }: OnboardModalProps) => {
  const [nickname, setNickname] = useState({
    value: '',
    error: false,
    msg: ''
  });

  /**
   * @description nickname 유효성 검사
   * @returns setNickname
   */
  const validateNickname = (name: string) => {
    if (name.length < 2) {
      return setNickname(prev => ({
        ...prev,
        error: true,
        msg: '닉네임은 2자 이상 입력해주세요.'
      }));
    }

    const pattern = /^[가-힣A-Za-z0-9]{2,12}$/;

    if (!pattern.test(name)) {
      return setNickname(prev => ({
        ...prev,
        error: true,
        msg: '닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요.'
      }));
    }

    return setNickname(prev => ({
      ...prev,
      error: false,
      msg: ''
    }));
  };

  /**
   * @description debounce nickname input
   */
  const debounceNickname = useCallback(
    debounce(name => {
      validateNickname(name);
    }, 500),
    []
  );

  const handleNickname = (e: { target: { value: string } }) => {
    setNickname(prev => ({ ...prev, value: e.target.value }));
    debounceNickname(e.target.value);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
        <Topbar type="modal" title="프로필 설정" onClose={onClose} />
        <section className="px-6 pt-5">
          <OnboardProfile propObj={{ edit: true }} />
          <div className="py-6 text-center text-body-4 text-gr-black">
            <h6>사용하실 프로필과 닉네임을 설정하세요.</h6>
            <h6>닉네임은 띄어쓰기 포함 최대 12자까지 가능합니다.</h6>
          </div>
          <Input
            helperText={nickname.msg}
            value={nickname.value}
            placeholder="닉네입을 입력해주세요."
            error={nickname.error ? true : false}
            onChange={handleNickname}
          />
        </section>
      </div>
    </>
  );
};

export default OnboardModal;

import { useFunnel } from '../common/Funnel';
import { useState } from 'react';
import CatName from './CatName';
import CatInfo from './CatInfo';
import CatPhoto from './CatPhoto';
import CatRegisterComplete from './CatRegisterComplete';
import { CatRegisterReqObj } from '@/app/zip/catType';

interface DiaryWriteModalProps {
  onClose: () => void;
  id: number;
}

export default function CatRegisterModal({
  onClose,
  id
}: DiaryWriteModalProps) {
  const steps = ['name', 'photo', 'info', 'complete', 'done'] as const;

  const [Funnel, setStep] = useFunnel(steps, 'name');
  const [catData, setCatData] = useState<CatRegisterReqObj>({
    name: '',
    sex: 'F',
    isNeutered: 'UNDEFINED',
    metAt: '',
    memo: '',
    image: null,
    croppedImage: null
  });

  return (
    <div>
      <div className="fixed left-0 top-0 z-[50] h-screen w-full overflow-y-auto bg-gr-white">
        <Funnel>
          <Funnel.Step name="name">
            <CatName
              setStep={() => setStep('photo')}
              setCatData={setCatData}
              setPrev={onClose}
            />
          </Funnel.Step>
          <Funnel.Step name="photo">
            <CatPhoto
              setStep={() => setStep('info')}
              setCatData={setCatData}
              setPrev={() => setStep('name')}
            />
          </Funnel.Step>
          <Funnel.Step name="info">
            <CatInfo
              type="register"
              setStep={() => setStep('complete')}
              catData={catData}
              setCatData={setCatData}
              setPrev={() => setStep('photo')}
            />
          </Funnel.Step>
          <Funnel.Step name="complete">
            <CatRegisterComplete
              catData={catData}
              setPrev={() => setStep('info')}
              setStep={onClose}
            />
          </Funnel.Step>
        </Funnel>
      </div>
    </div>
  );
}

import RightIcon from '../../../public/images/icons/right.svg';

interface SettingCardProps {
  text: string;
  onClick: () => void;
}

const SettingCard = ({ text, onClick }: SettingCardProps) => {
  return (
    <div className="flex items-center justify-between py-4 pl-5 pr-4">
      <h1 className="text-btn-1 text-gr-800">{text}</h1>
      <RightIcon
        width={24}
        height={24}
        stroke="var(--gr-800)"
        onClick={onClick}
      />
    </div>
  );
};

export default SettingCard;

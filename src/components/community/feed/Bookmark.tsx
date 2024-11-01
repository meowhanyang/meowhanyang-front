import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export default function Bookmark() {
  const { rive, RiveComponent } = useRive({
    src: '/images/icons/bookmark.riv',
    stateMachines: 'State Machine 1',
    autoplay: false
  });

  // const triggerInput = useStateMachineInput(rive, 'State Machine 1', 'save');

  const handleClick = () => {
    rive?.play();
    // console.log('rive', rive);
    // if (triggerInput) {
    //   triggerInput.fire();
    // }
    // console.log('triggerInput', triggerInput);
  };

  return (
    <div className="h-6 w-6">
      <RiveComponent onClick={handleClick} />
    </div>
  );
}

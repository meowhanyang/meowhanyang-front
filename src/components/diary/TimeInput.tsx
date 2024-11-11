import React, { useState, useEffect, use } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';

type TimeObject = {
  hour: string;
  minute: string;
};

type TimeInputProps = {
  time: TimeObject;
  setTime: (time: TimeObject) => void;
  setSelectTimeBottomSheet: (isVisible: boolean) => void;
};

const TimeInput = ({
  time,
  setTime,
  setSelectTimeBottomSheet
}: TimeInputProps) => {
  const currentHour = new Date().getHours();
  const initialPeriod = currentHour < 12 ? 'am' : 'pm';
  const [localTime, setLocalTime] = useState(time);
  const [period, setPeriod] = useState(initialPeriod);

  useEffect(() => {
    setLocalTime(time);
  }, [time]);

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'hour' | 'minute'
  ) => {
    let numericValue = e.target.value.replace(/[^0-9]/g, '');
    if (numericValue.length > 2) {
      // 값이 2자리를 초과하면 앞의 2자리만 취함
      numericValue = numericValue.substring(0, 2);
    }
    setLocalTime({ ...localTime, [type]: numericValue });
  };

  const handleTabChange = (newValue: string) => {
    setPeriod(newValue);

    let newHour = parseInt(localTime.hour, 10);
    if (newValue === 'pm') {
      if (newHour < 12) {
        newHour += 12;
      }
    } else if (newValue === 'am') {
      if (newHour === 12) {
        newHour = 0;
      } else if (newHour > 12) {
        newHour -= 12;
      }
    }

    setLocalTime({
      ...localTime,
      hour: newHour.toString().padStart(2, '0')
    });
  };

  const handleBlur = (type: 'hour' | 'minute') => {
    let numValue = parseInt(localTime[type], 10);
    if (isNaN(numValue)) {
      numValue = 0;
    } else if (type === 'hour' && (numValue < 0 || numValue > 23)) {
      numValue = numValue < 0 ? 0 : 23;
    } else if (type === 'minute' && (numValue < 0 || numValue > 59)) {
      numValue = numValue < 0 ? 0 : 59;
    }
    setLocalTime({
      ...localTime,
      [type]: numValue.toString().padStart(2, '0')
    });
  };

  return (
    <div className="flex-col items-center">
      <Tabs
        defaultValue={period}
        onValueChange={handleTabChange}
        className="flex items-center justify-center"
      >
        <TabsList>
          <TabsTrigger value="am">오전</TabsTrigger>
          <TabsTrigger value="pm">오후</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          value={localTime.hour}
          onChange={e => handleTimeChange(e, 'hour')}
          onBlur={() => handleBlur('hour')}
          className="w-10 border-b-2 border-gray-300 text-center text-[32px] focus:border-blue-500 focus:outline-none"
          maxLength={2}
        />
        <span className="text-[24px]">:</span>
        <input
          type="text"
          value={localTime.minute}
          onChange={e => handleTimeChange(e, 'minute')}
          onBlur={() => handleBlur('minute')}
          className="w-10 border-b-2 border-gray-300 text-center text-[32px] focus:border-blue-500 focus:outline-none"
          maxLength={2}
        />
      </div>
      <div className="p-[0 16px] flex h-[48px] justify-center gap-2 pt-14">
        <Button
          onClick={() => {
            setSelectTimeBottomSheet(false);
          }}
          className="h-12 w-full rounded-16 border border-gr-100 bg-gr-white px-4 py-2"
          disabled={false}
        >
          <Button.Text text="취소" className="text-btn-1 text-gr-800" />
        </Button>
        <Button
          onClick={() => {
            setTime(localTime);
            setSelectTimeBottomSheet(false);
          }}
          className="h-12 w-full rounded-16 bg-pr-500 px-4 py-2"
          disabled={false}
        >
          <Button.Text text="입력하기" className="text-btn-1 text-gr-white" />
        </Button>
      </div>
    </div>
  );
};

export default TimeInput;

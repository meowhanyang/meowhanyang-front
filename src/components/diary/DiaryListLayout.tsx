import React, { ReactNode, useState } from 'react';
import Topbar from '../ui/Topbar';
import { CalendarModal } from './CalendarModal';
import { useAtom } from 'jotai';
import { diaryDateAtom } from '@/atoms/diaryAtom';
interface DiaryListLayoutProps {
  children: ReactNode;
}

const DiaryListLayout = ({ children }: DiaryListLayoutProps) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [diaryDate, setDiaryDate] = useAtom(diaryDateAtom);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const toggleCalendar = () => {
    setCalendarOpen(!isCalendarOpen);
  };
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    };
    return date.toLocaleDateString('ko-KR', options);
  };
  const formattedMonth = formatDate(selectedMonth);

  const changeSearchDiaryDate = (day: 'dayBefore' | 'nextDay') => {
    if (day === 'dayBefore') {
      setDiaryDate(new Date(diaryDate.setDate(diaryDate.getDate() - 1)));
    }
    if (day === 'nextDay') {
      setDiaryDate(new Date(diaryDate.setDate(diaryDate.getDate() + 1)));
    }
  };
  return (
    <>
      {isCalendarOpen ? (
        <Topbar type="three">
          <Topbar.Back onClick={() => setCalendarOpen(false)} />
          <Topbar.Title title={formattedMonth} onClick={toggleBottomSheet} />
          <Topbar.Empty />
        </Topbar>
      ) : (
        <Topbar type="three">
          <Topbar.Home />
          <Topbar.Today
            onClick={toggleCalendar}
            onLeftClick={() => changeSearchDiaryDate('dayBefore')}
            onRightClick={() => changeSearchDiaryDate('nextDay')}
          />
          <Topbar.Calendar onClick={toggleCalendar} />
        </Topbar>
      )}
      <CalendarModal
        isOpen={isCalendarOpen}
        setCalendarOpen={setCalendarOpen}
        setBottomSheetVisible={setBottomSheetVisible}
        bottomSheetVisible={bottomSheetVisible}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <main className="bg-gr-50 pb-20 pt-12">{children}</main>
    </>
  );
};

export default DiaryListLayout;

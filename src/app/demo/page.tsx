'use client';

import React, { useState } from 'react';
import Chip from '@/components/ui/Chip';
import Label from '@/components/ui/Label';
import Profile from '@/components/ui/Profile';
import Carousel from '@/components/ui/Carousel';
import Topbar from '@/components/ui/Topbar';
import ActionButton from '@/components/ui/ActionButton';
import Textarea from '@/components/ui/Textarea';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from '@/components/ui/hooks/useToast';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import BottomSheet from '@/components/ui/BottomSheet';
import Badge from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';
import Tooltip from '@/components/ui/Tooltip';
import Modal from '@/components/ui/Modal';
import { Calendar } from '@/components/ui/Calendar';

const DemoPage = () => {
  const { toast } = useToast();
  const [chipObj, setChipObj] = useState({
    key: '1',
    content: 'chip1',
    checked: false
  });
  const [chipObj2, setChipObj2] = useState({
    key: '2',
    content: 'chip2',
    checked: false
  });
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      imageUrl: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute '
    },
    {
      id: 2,
      imageUrl: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[20px]'
    },
    {
      id: 3,
      imageUrl: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[40px]'
    },
    {
      id: 4,
      imageUrl: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[60px]'
    },
    {
      id: 5,
      imageUrl: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[80px]'
    },
    {
      id: 6,
      imageUrl: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[100px]'
    }
  ]);
  const [textareaContent, setTextareaContent] = useState('');
  // bottomSheet
  const [isVisible, setIsVisible] = useState(false);
  const toggleBottomSheet = () => setIsVisible(!isVisible);
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="p-4">
      <section className="border-b p-3">
        <h1 className="pb-1">🐶 Button</h1>
        <Button
          onClick={() => console.log('text btn')}
          className="h-8 w-full rounded-md bg-pr-500"
        >
          <Button.Text text="text btn" className="text-body-3 text-gr-white" />
        </Button>
        <Button onClick={() => console.log('icon btn')}>
          <Button.Icon icon="/images/icons/arrow.svg" alt="Icon" />
        </Button>
        <Button
          onClick={() => console.log('text and icon btn')}
          className="h-8 w-full rounded-md bg-pr-500"
        >
          <Button.Text
            text="text and icon btn"
            className="text-body-3 text-gr-white"
          />
          <Button.Icon icon="/images/icons/arrow.svg" alt="Icon" />
        </Button>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐱 Chip</h1>
        <div className="flex gap-2">
          <Chip
            propObj={chipObj}
            onClick={() =>
              setChipObj(prev => ({ ...prev, checked: !prev.checked }))
            }
          />
          <Chip
            propObj={chipObj2}
            onClick={() =>
              setChipObj2(prev => ({ ...prev, checked: !prev.checked }))
            }
            icon="/images/icons/time.svg"
          />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐭 Tabs</h1>
        <div className="flex gap-2">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐻 Label</h1>
        <div className="flex gap-2">
          <Label.Text content="text label" />
          <Label.Icon>❤️</Label.Icon>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐰 Badge</h1>
        <div className="flex gap-2">
          <Badge type="default" bgColor="bg-pr-500" />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦊 Profile</h1>
        <div className="flex h-[50px] gap-2">
          <Profile
            items={[
              {
                id: 1,
                imageUrl: 'https://github.com/shadcn.png',
                style: 'w-10 h-10'
              }
            ]}
            lastLeft="left-[100px]"
          />
        </div>
        <div className="flex h-[50px] gap-2">
          <Profile items={profiles} lastLeft="left-[100px]" />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐯 Carousel</h1>
        <div className="flex h-[300px] gap-2">
          <Carousel
            images={[
              'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=350',
              'http://www.catster.com/wp-content/uploads/2017/08/Pixiebob-cat.jpg',
              'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
              'https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
              'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Cat-eating-prey.jpg/220px-Cat-eating-prey.jpg',
              'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg',
              'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg'
            ]}
          />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐻 Topbar</h1>
        <div className="flex flex-col gap-2">
          <Topbar type="one">
            <Topbar.Title title="피드" />
          </Topbar>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐼 ActionButton</h1>
        <div className="flex flex-col gap-2">
          <ActionButton
            icon="/images/icons/edit.svg"
            content="수정하기"
            onClick={() => {}}
          />
          <ActionButton
            icon="/images/icons/delete.svg"
            content="삭제하기"
            onClick={() => {}}
          />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐻‍❄️ Textarea</h1>
        <Textarea
          propObj={{
            placeholder: 'Placeholder',
            content: textareaContent,
            maxLength: 500
          }}
          onChange={e => setTextareaContent(e)}
        />
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐨 FloatingActionButton</h1>
        <FloatingActionButton onClick={() => {}} />
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦦 Toast</h1>
        <div className="flex flex-col gap-2">
          <Toaster />
          <Button
            onClick={() => {
              toast({
                title: 'Toast Title',
                description: '🦦 This is Toaster Text.'
              });
            }}
          >
            Show Toast
          </Button>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦤 Input</h1>
        <div className="flex flex-col gap-2">
          <h1>default</h1>
          <Input helperText="Helper Text" />
        </div>
        <div className="flex flex-col gap-2">
          <h1>inactive</h1>
          <Input disabled />
        </div>
        <div className="flex flex-col gap-2">
          <h1>error state</h1>
          <Input helperText="Error Message" error />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦤 BottomSheet</h1>
        <button
          onClick={toggleBottomSheet}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
          Toggle Bottom Sheet
        </button>
        <BottomSheet
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          topBar={<div>Drag Bar</div>}
          heightPercent={['70%', '50%']}
        >
          <div>Your Content Here</div>
        </BottomSheet>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐣 Checkbox</h1>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasBg"
            kind="hasBg"
            isChecked={false}
            onClick={() => {}}
          />
          <label
            htmlFor="noBg"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            hasBg : checkbox label
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="noBg"
            kind="noBg"
            isChecked={false}
            onClick={() => {}}
          />
          <label
            htmlFor="noBg"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            noBg : checkbox label
          </label>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐝 Tooltip</h1>
        <div className="relative flex items-center space-x-2">
          <Tooltip
            content="이것은 툴팁입니다."
            trigger={
              <Button
                onClick={() => console.log('Tooltip Btn1')}
                className="h-8 w-full rounded-md bg-pr-500"
              >
                <Button.Text
                  text="Tooltip Btn1"
                  className="text-body-3 text-gr-white"
                />
              </Button>
            }
          />
        </div>
        <div className="relative flex items-center justify-end">
          <Tooltip
            content="This is a Tooltip."
            trigger={
              <Button
                onClick={() => console.log('Tooltip Btn2')}
                className="h-8 w-full rounded-md bg-pr-500"
              >
                <Button.Text
                  text="Tooltip Btn2"
                  className="text-body-3 text-gr-white"
                />
              </Button>
            }
          />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦋 Modal</h1>
        <div className="relative flex items-center">
          <Button
            onClick={() => setOpenModal(true)}
            className="h-8 w-full rounded-md bg-pr-500"
          >
            <Button.Text text="primary" className="text-body-3 text-gr-white" />
          </Button>
        </div>
        {openModal && (
          <Modal
            contents={{ title: '알림', body: 'Text를 입력하세요.' }}
            scrim={true}
            buttons={[
              {
                content: 'Confirm',
                btnStyle: 'w-full rounded-16 px-4 py-2 bg-sm-error-500',
                textStyle: 'text-gr-white text-btn-1',
                onClick: () => setOpenModal(false)
              },
              {
                content: 'Cancel',
                btnStyle: 'w-full rounded-16 px-4 py-2 bg-gr-white',
                textStyle: 'text-gr-300 text-btn-1',
                onClick: () => setOpenModal(false)
              }
            ]}
          />
        )}
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐨 Calendar</h1>
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </section>
    </div>
  );
};

export default DemoPage;

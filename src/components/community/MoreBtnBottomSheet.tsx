import ActionButton from '@/components/ui/ActionButton';
import BottomSheet from '@/components/ui/BottomSheet';
import Modal from '@/components/ui/Modal';
import { getCookie } from '@/utils/common';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';

interface MoreBtnBottomSheetProps {
  type: 'feed' | 'zip' | 'diary' | 'comment';
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  heightPercent: string[];
  name?: string;
  memberId?: number;
  onDelete?: () => void;
  onEdit?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
  showWriteModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreBtnBottomSheet: React.FC<MoreBtnBottomSheetProps> = ({
  type,
  isVisible,
  setIsVisible,
  heightPercent,
  name,
  memberId,
  onDelete,
  onEdit,
  onBlock,
  onReport,
  showWriteModal
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    body?: string;
    primaryBtn: { content: string; onClick: () => void };
    secondaryBtn: { content: string };
  }>();

  const token = getCookie('Authorization');
  const decodedToken: { memberId: number } = jwtDecode(token);

  const openModalEdit = () => {
    setIsVisible(false);
    showWriteModal && showWriteModal(true);
    onEdit && onEdit();
  };
  const openModalDelete = () => {
    setIsVisible(false);
    setShowModal(true);
    setModalContent({
      title: '삭제하시겠습니까?',
      primaryBtn: {
        content: '삭제',
        onClick: () => {
          onDelete && onDelete(), setShowModal(false);
        }
      },
      secondaryBtn: {
        content: '나중에 할게요'
      }
    });
  };
  const openModalReport = () => {
    setIsVisible(false);
    setShowModal(true);
    setModalContent({
      title: `해당 ${type === 'comment' ? '댓글' : '게시글'}을 \n 신고하시겠습니까?`,
      primaryBtn: {
        content: '신고하기',
        onClick: () => {
          onReport && onReport(), setShowModal(false);
        }
      },
      secondaryBtn: {
        content: '취소'
      }
    });
  };
  const openModalBlock = () => {
    setIsVisible(false);
    setShowModal(true);
    setModalContent({
      title: `${name}님을 \n 차단하시겠습니까?`,
      body: '차단된 사용자의 게시글과 댓글을 회원님께 \n 더이상 표시하지 않습니다.',
      primaryBtn: {
        content: '차단하기',
        onClick: () => {
          onBlock && onBlock(), setShowModal(false);
        }
      },
      secondaryBtn: {
        content: '취소'
      }
    });
  };

  return (
    <>
      <BottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        topBar={true}
        heightPercent={heightPercent}
      >
        <div className="px-4">
          {(decodedToken?.memberId === memberId && type !== 'comment') ||
          type === 'zip' ? (
            <>
              <ActionButton
                icon="/images/icons/edit.svg"
                content="수정하기"
                onClick={() => openModalEdit()}
              />
              <ActionButton
                icon="/images/icons/delete.svg"
                content="삭제하기"
                onClick={() => openModalDelete()}
              />
            </>
          ) : (
            <>
              {decodedToken?.memberId === memberId && type === 'comment' ? (
                <ActionButton
                  icon="/images/icons/delete.svg"
                  content="삭제하기"
                  onClick={() => openModalDelete()}
                />
              ) : (
                <>
                  <ActionButton
                    icon="/images/icons/edit.svg"
                    content={
                      type === 'comment' ? '댓글 신고하기' : '게시물 신고하기'
                    }
                    onClick={() => openModalReport()}
                  />
                  <ActionButton
                    icon="/images/icons/delete.svg"
                    content="작성자 차단하기"
                    onClick={() => openModalBlock()}
                  />
                </>
              )}
            </>
          )}
        </div>
      </BottomSheet>

      {showModal && (
        <Modal
          contents={{ title: modalContent?.title, body: modalContent?.body }}
          scrim={true}
          buttons={[
            {
              content: modalContent?.primaryBtn.content || '',
              btnStyle: 'w-full rounded-16 px-4 py-2 bg-sm-error-500',
              textStyle: 'text-gr-white text-btn-1',
              onClick: modalContent?.primaryBtn.onClick
            },
            {
              content: modalContent?.secondaryBtn.content || '취소',
              btnStyle: 'w-full rounded-16 px-4 py-2 bg-gr-white',
              textStyle: 'text-gr-300 text-btn-1',
              onClick: () => setShowModal(false)
            }
          ]}
        />
      )}
    </>
  );
};

export default MoreBtnBottomSheet;

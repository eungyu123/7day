import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/FriendAddModal.css";

export default function FriendAddModal({
  isOpen,
  setIsOpen,
  updateUserFriend,
  refreshFriendList,
}) {
  const [friendId, setFriendId] = useState("");
  const [error, setError] = useState("");

  const handleAddFriend = async () => {
    if (!friendId.trim()) {
      setError("친구 ID를 입력하세요.");
      return;
    }

    try {
      await updateUserFriend({ friendid: friendId });
      refreshFriendList();
      resetForm();
      setIsOpen(false); // 모달 닫기
    } catch (error) {
      setError("친구 추가에 실패했습니다.");
      console.error("친구 추가 오류:", error.message);
    }
  };
  // 입력 필드와 에러 메시지를 초기화하는 함수
  const resetForm = () => {
    setFriendId("");
    setError("");
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) resetForm(); // 모달이 닫힐 때 초기화
        setIsOpen(open);
      }}
    >
      <Dialog.Content className="friend-modal-content">
        <div className="friend-modal-header">
          <div className="friend-modal-title">
            <p className="friend-modal-title-text">친구추가</p>
          </div>
          <Dialog.Close asChild>
            <div className="friend-modal-exit">
              <button className="friend-close-button">X</button>
            </div>
          </Dialog.Close>
        </div>
        <div className="friend-modal-body">
          <input
            type="text"
            className="friend-input"
            placeholder="친구 ID 입력"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button className="friend-add-button" onClick={handleAddFriend}>
            추가
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

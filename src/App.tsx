import { useState } from "react";

import FilterBar from "./components/FilterBar";
import Record from "./components/Record";
import RecordForm from "./components/RecordForm";
import { DEFAULT_RECORDS } from "./constants/record";
import { MEMBER_KEY } from "./constants/storageKey";
import { useArrayStorage } from "./hooks/useArrayStorage";
import { MemberRecord } from "./types/record";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Modal } from "./ui/Modal";

/**
 * 애플리케이션의 메인 컴포넌트
 * - 회원 목록을 관리하는 테이블을 제공
 * - 회원 추가, 필터링, 수정, 삭제 기능 포함
 */
function App() {
  // 로컬 스토리지에서 회원 목록 관리 (CRUD 기능 제공)
  const {
    value: records,
    add,
    remove,
    updateItem,
    setValue,
  } = useArrayStorage<MemberRecord>(MEMBER_KEY, DEFAULT_RECORDS);

  // 모달(회원 추가 폼) 열림/닫힘 상태
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full justify-center p-3">
      <div className="w-[81.063rem]">
        {/* 회원 추가 버튼 */}
        <div className="flex justify-end px-[0.875rem] py-2">
          <Modal open={modalIsOpen} onOpenChange={setModalIsOpen}>
            <Modal.Trigger asChild>
              <Button>
                <Icon name="Plus" size={16} />
                <span className="text-sm">추가</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content>
              {/* 회원 추가 폼 */}
              <RecordForm onOpenChange={setModalIsOpen} addRecord={add} />
            </Modal.Content>
          </Modal>
        </div>

        {/* 필터 바 (회원 목록 필터링) */}
        <FilterBar setRecords={setValue} />

        {/* 회원 목록 렌더링 */}
        {records?.map(({ name, address, memo, joinDate, job, emailConsent }) => (
          <Record
            key={name}
            name={name}
            address={address}
            memo={memo}
            joinDate={joinDate}
            job={job}
            emailConsent={emailConsent}
            removeRecord={remove}
            updateRecord={updateItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

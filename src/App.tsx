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

function App() {
  const {
    value: records,
    add,
    remove,
    updateItem,
    setValue,
  } = useArrayStorage<MemberRecord>(MEMBER_KEY, DEFAULT_RECORDS);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full justify-center p-3">
      <div className="w-[81.063rem]">
        <div className="flex justify-end px-[0.875rem] py-2">
          <Modal open={modalIsOpen} onOpenChange={setModalIsOpen}>
            <Modal.Trigger asChild>
              <Button>
                <Icon name="Plus" size={16} />
                <span className="text-sm">추가</span>
              </Button>
            </Modal.Trigger>
            <Modal.Content>
              <RecordForm onOpenChange={setModalIsOpen} addRecord={add} />
            </Modal.Content>
          </Modal>
        </div>
        <FilterBar setRecords={setValue} />
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

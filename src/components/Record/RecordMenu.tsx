import { Dropdown, MenuProps } from "antd";

import { Icon } from "@/ui/Icon";

interface RecordActionsProps {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

/** 테이블 레코드의 수정/삭제 메뉴 드롭다운 */
export default function RecordMenu({ onClickEdit, onClickDelete }: RecordActionsProps) {
  const menuItems: MenuProps["items"] = [
    {
      key: "edit",
      label: (
        <div className="h-8 rounded-md px-3 py-[0.313rem] text-sm" onClick={onClickEdit}>
          수정
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "delete",
      label: (
        <div
          className="h-8 rounded-md px-3 py-[0.313rem] text-sm text-[#FF4D4F]"
          onClick={onClickDelete}
        >
          삭제
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      overlayClassName="h-20 w-[11.563rem] rounded-[0.625rem] bg-white p-1"
      arrow={false}
    >
      <Icon name="EllipsisVertical" size={16} className="cursor-pointer text-black/65" />
    </Dropdown>
  );
}

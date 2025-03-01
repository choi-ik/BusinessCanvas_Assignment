import { Checkbox } from "@/ui/CheckBox";

interface FilterMenuItemProps {
  label: string;
  checked?: boolean;
  onChangeFilter: () => void;
}

export default function FilterItem({ label, checked, onChangeFilter }: FilterMenuItemProps) {
  return (
    <div
      className={`flex h-8 w-full cursor-pointer items-center gap-[0.313rem] rounded-md px-4 py-[0.313rem] ${
        checked ? "bg-blue-500 text-white" : "hover:bg-black/[.04]"
      }`}
      onClick={onChangeFilter}
    >
      <Checkbox checked={checked} onChangeChecked={() => onChangeFilter()} />
      <span>{label}</span>
    </div>
  );
}

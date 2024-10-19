import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ILabel {
  label: string;
}

export default function LabelInput({ label }: ILabel) {
  return (
    <div>
      <Label>{label}</Label>
      <Input />
    </div>
  );
}

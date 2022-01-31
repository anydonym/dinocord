import Emoji from "./emoji.ts";
import SelectOption from "./selectoption.ts";

export default interface MessageComponent {
  type: ComponentType;
  custom_id?: string;
  disabled?: boolean;
  style?: number;
  label?: string;
  emoji?: Partial<Emoji>;
  url?: string;
  options?: SelectOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  components: MessageComponent[];
}

export enum ComponentType {
  ACTION_ROW = 1,
  BUTTON = 2,
  SELECT_MENU = 3,
}

import Emoji from './emoji.ts';

export default interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Partial<Emoji>;
  default?: boolean;
}
import Emoji from './emoji.ts';

export default interface SelectMenu {
	label: string;
	value: string;
	description?: string;
	emoji?: Partial<Emoji>;
	default?: boolean;
}

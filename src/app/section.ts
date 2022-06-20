export interface Section {
	id?: string;
	name: string;
	section: string;
	grade: 1 | 2 | 3 | 4 | 5 | 6;
	level: 'elementary' | 'high-school';
	teacher: string;
}

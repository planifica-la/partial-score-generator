import { DocumentReference } from '@angular/fire/firestore';
import { Section } from './section';

export interface Student {
	id?: string;
	firstname: string;
	lastname: string;
	section: DocumentReference<Section>;
	teacher: string;
}

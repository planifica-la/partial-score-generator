import { DocumentReference } from '@angular/fire/firestore';
import { Subject } from './subject';
import { Section } from './section';
import { Student } from './student';

export interface Score {
	id?: string;
	subject: DocumentReference<Subject>;
	section: DocumentReference<Section>;
	student: DocumentReference<Student>;
	teacher: string;
	value: number;
}

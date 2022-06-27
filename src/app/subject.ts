import { DocumentReference } from '@angular/fire/firestore';
import { Section } from './section';

export interface Subject {
  id?: string;
  name: string;
  section: DocumentReference<Section>;
}

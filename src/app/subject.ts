import { DocumentReference } from '@angular/fire/firestore';
import { Section } from './section';
import { UserProfile } from './user-profile';

export interface Subject {
  id?: string;
  name: string;
  section: DocumentReference<Section>;
  teacher: DocumentReference<UserProfile>;
}

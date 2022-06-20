import { DocumentReference, Timestamp } from '@angular/fire/firestore';
import { Plan } from './plan';

export interface UserProfile {
	plan: DocumentReference<Plan>;
	status: 'active' | 'inactive' | 'restricted';
	expiration: Timestamp;
	phone: string;
	schoolName: string;
}

// Types
import { User } from './interfaces';

export interface InvitationInterface {
	_id?: string;
	sender: User;
	receiver: User;
}

import { User } from 'types/users';

import { usersBd } from 'data-base/data-base';

export const getUserById = (id: User.Entity['id']) => usersBd.get(id);

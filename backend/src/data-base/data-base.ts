import { User } from 'types/users';

const testUsers: Array<[number, User.Entity]> = [
  [
    1,
    {
      id: 1,
      login: 'test',
      email: 'test@mail.ru',
      gmail: 'vashurosh033@gmail.com',
      password: '123456',
      avatar:
        'https://i.pinimg.com/736x/28/50/bc/2850bcda883b5c0aa511ea3b02a04391.jpg',
    },
  ],
  [
    2,
    {
      id: 2,
      login: 'HUFHu Down',
      email: 'test1@mail.ru',
      gmail: null,
      password: '123456',
      avatar: null,
    },
  ],
  [
    3,
    {
      id: 3,
      login: 'test2',
      email: 'test2@mail.ru',
      gmail: null,
      password: '123456',
      avatar: null,
    },
  ],
];

export const usersBd: Map<number, User.Entity> = new Map([...testUsers]);

export let id = usersBd.size;
export const increaseId = () => id++;

import { Nullable } from 'types';

export namespace User {
  export type Entity = {
    id: number;
    login: string;
    email: string;
    gmail: Nullable<string>;
    avatar: Nullable<string>;
  };

  export namespace Methods {
    export namespace EditUser {
      export type Request = Omit<Entity, 'gmail'>;
      export type Response = string;
    }
  }
}

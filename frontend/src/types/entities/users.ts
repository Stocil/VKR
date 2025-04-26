import { Nullable } from 'types';

export namespace Users {
  export type Entity = {
    id: number;
    login: string;
    email: string;
    gmail: Nullable<string>;
    avatar: Nullable<string>;
  };

  export namespace Methods {
    export namespace GetUser {
      export type Request = { id: string | number };
      export type Response = Entity;
    }
  }
}

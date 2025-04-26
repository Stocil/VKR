export namespace User {
  export type Entity = {
    id: number;
    login: string;
    email: string;
    gmail: string | null;
    password: string;
    avatar: string | null;
  };

  export type TokenData = Omit<Entity, 'password'>;

  export namespace Methods {
    export namespace RegisterUser {
      export type Request = Pick<Entity, 'login' | 'email' | 'password'>;
      export type Response = TokenData;
    }

    export namespace LoginUser {
      export type Request = Pick<Entity, 'login' | 'password'>;
      export type Response = TokenData;
    }

    export namespace EditUser {
      export type Request = Omit<TokenData, 'gmail'>; // TODO: Присылать потом с беком
      export type Response = TokenData;
    }

    export namespace GetUser {
      export type Request = void;
      export type Response = TokenData;
    }

    export namespace CheckUserGoogleLink {
      export type Request = Pick<Entity, 'gmail'>;
      export type Response = string;
    }

    export namespace RegisterUserByGoogle {
      export type Request = Omit<Entity, 'id' | 'email'>;
    }
  }
}

export namespace Auth {
  export type Entity = {
    login: string;
    email: string;
    password: string;
  };

  export type GoogleEntity = {
    login: string;
    gmail: string;
    avatar: string;
    password: string;
  };

  export namespace Methods {
    export namespace RegisterUser {
      export type Request = Entity;
      export type Response = string;
    }

    export namespace LoginUser {
      export type Request = Omit<Entity, 'email'>;
      export type Response = string;
    }

    export namespace CheckUserGoogleLink {
      export type Request = { gmail: string };
      export type Response = string;
    }

    export namespace RegisterUserByGoogle {
      export type Request = GoogleEntity;
      export type Response = string;
    }
  }
}

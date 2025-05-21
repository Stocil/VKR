export namespace Sensors {
  export type Entity = {
    current: number;
    voltage: number;
    power: number;
    temperature: number;
  };

  export namespace Methods {
    export namespace FetchSensorsData {
      export type Request = void;
      export type Response = Entity;
    }
  }
}

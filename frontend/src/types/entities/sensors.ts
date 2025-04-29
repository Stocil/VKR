export namespace Sensors {
  export type Entity = {
    current: number;
    voltage: number;
    temperature: number;
    resistance: number;
  };

  export namespace Methods {
    export namespace FetchSensorsData {
      export type Request = void;
      export type Response = Entity;
    }
  }
}

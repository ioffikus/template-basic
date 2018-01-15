interface Window {
  // tslint:disable-line:interface-name
  _: object;
  Perf: object;
  REDUX_INITIAL_STATE: object;
  localStorage: {
    setItem(key: string, data: string): void;
    getItem(key: string): string;
    removeItem(key: string): void;
    length: number;
    clear(): void;
    key(key: number): string;
  };
}

declare module '*.json' {
  const value: any;
  export default value;
}

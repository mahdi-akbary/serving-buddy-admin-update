export interface IEnvironment {
  appName: string;
  production?: boolean;
  baseUrl: {
    backend: string;
  }

}

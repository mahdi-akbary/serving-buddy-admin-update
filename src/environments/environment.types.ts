export interface IEnvironment {
  appName: string;
  production?: boolean;
  baseUrl: {
    backend: string;
  }
  userCredentials?: {
    username: string;
    password: string;
  }

}

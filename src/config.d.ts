declare module '../../config.js' {
  interface Entity {
    entityName: string;
    key: string;
    fileName: string;
  }

  interface Config {
    apiBaseUrl: string;
    siteTitle: string;
    logoImg: string;
    endpoints: Record<string, string>;
  }

  const Config: () => Config;
  export default Config;
}

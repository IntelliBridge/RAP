import { entities, Entity } from '../json-server-files/entities';

const typedEntities = entities.map((entity: Entity) => ({
  entityName: entity.entityName,
  key: entity.key,
  fileName: entity.fileName,
}));

function getJsonServerEndpoint(entity: string): string {
  return `${import.meta.env.VITE_JSON_SERVER}/${entity}`;
}

const endpoints = typedEntities.reduce((map: Record<string, string>, { entityName }: Entity) => {
  map[entityName] = getJsonServerEndpoint(entityName);
  return map;
}, {});

const Config = () => ({
  apiBaseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  siteTitle: "Keystone Hello World",
  logoImg: "img/logo.svg",
  endpoints,
});

export default Config;

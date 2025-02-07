# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Local JSON Database

Our project uses `json-server` to simulate a local database for development purposes.

### Overview

As discussed during the team's initial planning meetings, The `json-server` package is a development tool that creates a full fake REST API using a simple JSON file, allowing quick setup for CRUD operations without the need for a backend server. We use to serve data from the `json_server_db.json` file, which is excluded from version control to prevent unintentional changes made through API operations from being committed.


### Getting Started

To start json-server, follow these steps:

1. **Copy Initial Database**: Run `npm run db-copy`. This command copies `json_server_db_init.json` into `json_server_db.json`, ensuring you start with the initial database contents. Skip this step if you already have a working database.
2. **Start the Server**: Run `npm run db-start`. This command launches `json-server` to serve the data from `json_server_db.json`.

These steps set up a local JSON database that can be used for testing and development without affecting the version-controlled initial state.

### Database structure

The JSON database structure consists of an object that holds arrays
representing various entities. Each entity array, such as "companies", includes
multiple objects where each object represents a specific entity. Every entity
object must include an "id" attribute. Other attributes may vary but often
include essential details and nested objects. For example, a typical entity
object could have fields like "Name", "Description", and other additional sub-objects
if needed.


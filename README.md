# Boilerplate

To start in dev mode:
 

```bash
$ yarn install    # Install project dependencies
$ yarn dev      # Compile and launch (same as `npm start`)
Run localhost:3000
```

To start in prod mode:
1. You need install the node.js (recommended for must users) version on the server
2. Change config in /config/environments.config.js for production mode
 - change api param
 - change googleMapKey
 - change server_host_name
 - server_port

3. Run:

```bash
$ bash builder.sh
Run localhost:8081
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/project.config.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|

### Project map

```
.
├── build                              # All build-related code
├── public                             # Static public assets (not imported anywhere in source code)
├── server                             # Express application that provides webpack middleware
│   └── main.js                        # Server application entry point
├── src                                # Application source code
│   ├── index.html                     # Main HTML page container for app
│   ├── main.js                        # Application bootstrap and rendering
│   ├── components                     # It's all reusable components (Checkbox, Inputs, Breadcrumbs ...)
│   │     └──ExampleComponent          # Component folder
│   │          ├──ExampComponent.js    # Component js file
│   │          ├──ExampComponent.scss  # Style component file
│   ├── containers                     # Global Reusable Container Components
│   ├── layouts                        # Components that dictate major page structure
│   │   └─ PageLayout                 # Global application layout in which to render routes
│   ├── routes                         # Main route definitions and async split points
│   │   ├── index.js                   # Bootstrap main application routes with store
│   │   ├── dashboard                  # Fractal route
│   │      ├── index.js                # Route definitions and async split points
│   │      ├── assets                  # Assets required to render components
│   │      ├── components              # Presentational React Components (With js and scss files)
│   │
│   │
│   ├── store                          # Redux-specific pieces
│   │   ├── createStore.js             # Create and instrument redux store
│   │   └── reducers.js                # Reducer registry and injection
│   └── styles                         # Global styles
│         ├──_base.scss                # Base styles for all app (Body,HTML,Error)
│         ├──_btns.scss                # Btns styles
│         ├──_colors.scss              # Color variables
│         ├──_material-fields.scss     # Meterial styles for elements(Checkbox, Input)
│         ├──_responsive.scss          # Responsive styles
│         ├──_typography.scss          # Fonts styles
│         ├──_variables.scss           # Other variables for all project
│         ├──core.scss                 # Import all listed above scss files
│
│
└── tests                              # Unit tests
```

### Styles

Both `.scss` and `.css` file extensions are supported out of the box. After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

Every component directory have .scss file and .js file.
Js file imports .scss file with styles for this component.
```
├── src
│   ├── components
│   │     └──ExampleComponent          # Component folder
│   │          ├──ExampComponent.js    # Component js file
│   │          ├──ExampComponent.scss  # Style component file

```
Also we have global styles in the app. Where you can use sass variables
and create global style classes
```
├── src
│   │
│   └── styles                         # Global styles
│         ├──_base.scss                # Base styles for all app (Body,HTML,Error)
│         ├──_btns.scss                # Btns styles
│         ├──_colors.scss              # Color variables
│         ├──_material-fields.scss     # Meterial styles for elements(Checkbox, Input)
│         ├──_responsive.scss          # Responsive styles
│         ├──_typography.scss          # Fonts styles
│         ├──_variables.scss           # Other variables for all project
│         ├──core.scss                 # Import all listed above scss files

```
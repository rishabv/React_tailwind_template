/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path');
const debug = require('debug')('app:config:project');
const argv = require('yargs').argv;
const ip = require('ip');

debug('Creating default configuration.');
// ========================================================
// Default Configuration
// ========================================================
debug(`Environment is : "${process.env.NODE_ENV}"`);
const config = {
    env : process.env.NODE_ENV || 'development',

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base  : path.resolve(__dirname, '..'),
    dir_client : 'src',
    dir_dist   : 'dist',
    dir_public : 'public',
    dir_server : 'server',
    dir_test   : 'tests',
    source_maps : true,
    // ----------------------------------
    // Server Configuration
    // ----------------------------------
    server_host : ip.address(), // use string 'localhost' to prevent exposure on local network
    server_host_name: 'localhost',
    server_port :  process.env.PORT || 3000,

    // ----------------------------------
    // Compiler Configuration
    // ----------------------------------
    compiler_babel : {
        cacheDirectory: true,
        babelrc: false,
        plugins: [
            'transform-class-properties',
            [
                'transform-runtime',
                {
                    helpers: true,
                    polyfill: true,
                    regenerator: true
                }
            ],
            [ 'transform-object-rest-spread' ]
        ],
        presets: [
            'react',
            ['env', {
                uglify: false,
                modules: false,
                targets: {
                    'browsers': ['last 2 versions', 'safari >= 7', 'ie 10', 'chrome 47']
                }
            }]
        ]
    },
    compiler_devtool         : 'cheap-module-inline-source-map',
    compiler_hash_type       : 'hash',
    compiler_fail_on_warning : false,
    compiler_quiet           : false,
    compiler_public_path     : '/',
    compiler_stats           : {
        chunks : false,
        chunkModules : false,
        colors : true
    },
    compiler_vendors : [
        'react',
        'redux',
        'react-redux',
        'react-router',
        'react-router-dom',
        'redux-thunk',
        'react-select',
        'react-google-maps',
        'react-dropzone',
        'react-datepicker',
        'react-rater',
        'react-bootstrap-table',
        'react-jobs',
        'isomorphic-fetch',
        'babel-polyfill'
    ],

    // ----------------------------------
    // dashboard Configuration
    // ----------------------------------
    coverage_reporters : [
        { type : 'text-summary' },
        { type : 'lcov', dir : 'coverage' }
    ]
};

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/
const pkg = require('../package.json');

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.env)
    },
    'NODE_ENV'     : config.env,
    '__DEV__'      : config.env === 'development',
    '__PROD__'     : config.env === 'production',
    '__STAG__'     : config.env === 'staging',
    '__COVERAGE__' : !argv.watch && config.env === 'test',
    '__TEST__'     : config.env === 'test',
    '__VERSION__'  : JSON.stringify(pkg.version),
    '__SETTINGS__' : JSON.stringify('1') // setup an setting id, can be changed for different env and different admin panel settings

};
// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------

config.compiler_vendors = config.compiler_vendors
    .filter((dep) => {
        if (pkg.dependencies[dep]) return true;
        debug(
            `Package "${dep}" was not found as an npm dependency in package.json; ` +
            `it won't be included in the webpack vendor bundle.
            Consider removing it from \`compiler_vendors\` in ~/config/index.js`
        );
    });

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
    const args = [config.path_base].concat([].slice.call(arguments));
    return path.resolve.apply(path, args);
}

config.paths = {
    base   : base,
    client : base.bind(null, config.dir_client),
    public : base.bind(null, config.dir_public),
    dist   : base.bind(null, config.dir_dist),
    server : base.bind(null, config.dir_server)
};

// ========================================================
// Environment Configuration
// ========================================================
const environments = require('./environments.config');
const overrides = environments[config.env];
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);

if (overrides) {
    debug('Found overrides, applying to default configuration.');
    const envGlobalConfig = {
        '__API__' : JSON.stringify(overrides(config).api),
        '__GOOGLE_MAP_KEY__' : JSON.stringify(overrides(config).googleMapKey)
    };
    config.globals = Object.assign(config.globals, envGlobalConfig);
} else {
    debug('No environment overrides found, defaults will be used.');
}

module.exports = config;

const argv = require('yargs').argv;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config');
const debug = require('debug')('app:config:webpack');
const WebpackAutoInject = require('webpack-auto-inject-version');
const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __STAG__ = project.globals.__STAG__;
const __TEST__ = project.globals.__TEST__;
debug('Creating configuration.');
const webpackConfig = {
    name: 'client',
    target: 'web',
    devtool: project.compiler_devtool,
    resolve: {
        modules: [
            project.paths.client(),
            'node_modules'
        ],
        extensions: ['*', '.js', '.jsx', '.json'],
        alias: {
            '@allenfang/react-toastr$': project.paths.client('noop.js')
        }
    },
    module: {
        rules: []
    }
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js');

webpackConfig.entry = {
    app : __DEV__
        ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
        : [APP_ENTRY],
    vendor : project.compiler_vendors
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
    filename   : `[name].[${project.compiler_hash_type}].js`,
    path       : project.paths.dist(),
    publicPath : project.compiler_public_path
};

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
    new webpack.DefinePlugin(project.globals),
    new HtmlWebpackPlugin({
        template : project.paths.client('index.html'),
        hash     : false,
        favicon  : project.paths.public('favicon.ico'),
        filename : 'index.html',
        inject   : 'body',
        minify   : {
            collapseWhitespace : true
        }
    })
];
if (!__TEST__) {
    webpackConfig.plugins.push(
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(en)$/) // eslint-disable-line no-useless-escape
    );
}

if (!__TEST__ && !__PROD__ && !__STAG__) {
    webpackConfig.plugins.push(
        /* eslint-disable */
        new WebpackAutoInject({
            PACKAGE_JSON_PATH: './package.json',
            components: {
                InjectAsComment: false
            }
        })
    )
}

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
    webpackConfig.plugins.push(function () {
        this.plugin('done', function (stats) {
            if (stats.compilation.errors.length) {
                // Pretend no assets were generated. This prevents the tests
                // from running making it clear that there were warnings.
                throw new Error(
                    stats.compilation.errors.map(err => err.message || err)
                );
            }
        });
    });
}

if (__DEV__) {
    debug('Enabling plugins for live development (HMR, NamedModulesPlugin, NoEmitOnErrors, WRA).');
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
} else if (__PROD__ || __STAG__) {
    debug('Enabling plugins for production (LoaderOptionsPlugin, UglifyJsPlugin, AggressiveMergingPlugin).');
    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            comments: false,
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    );
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
    webpackConfig.plugins.push(
        new webpack.HashedModuleIdsPlugin()
    );
}
if (__DEV__) {
    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "manifest"], // vendor libs + extracted manifest
            minChunks: Infinity
        })
    )
}
if (__PROD__ || __STAG__) {
    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"]
        })
    )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            query: project.compiler_babel
        }]
    },
    {
        test   : /\.json$/,
        loader : 'json-loader'
    }
];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.

const extractStyles = new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash].css',
    allChunks: true,
    disable: __DEV__
});

webpackConfig.module.rules.push({
    test: /\.(sass|scss)$/,
    loader: extractStyles.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: project.source_maps,
                    minimize: {
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions']
                        },
                        discardComments: {
                            removeAll : true
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: project.source_maps
                    }
                }
            },
            {
                loader : 'resolve-url-loader'
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: project.source_maps,
                    includePaths: [
                        project.paths.client('styles')
                    ]
                }
            }
        ]
    })
});
webpackConfig.module.rules.push({
    test: /\.(css)$/,
    loader: extractStyles.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: project.source_maps,
                    minimize: {
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions']
                        },
                        discardComments: {
                            removeAll : true
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: project.source_maps
                    }
                }
            },
            {
                loader : 'resolve-url-loader'
            }
        ]
    })
});
webpackConfig.plugins.push(extractStyles);

// Images
// ------------------------------------
webpackConfig.module.rules.push({
    test    : /\.(png|jpg|gif)$/,
    loader  : 'url-loader',
    options : {
        limit : 8192
    }
});
// HTML
// ------------------------------------
webpackConfig.module.rules.push({
    test: /\.html$/,
    use: [ {
        loader: 'html-loader',
        options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false
        }
    }]
});

// Fonts
// ------------------------------------
[
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml']
].forEach((font) => {
    const extension = font[0];
    const mimetype = font[1];

    webpackConfig.module.rules.push({
        test    : new RegExp(`\\.${extension}$`),
        loader  : 'url-loader',
        options : {
            name  : 'fonts/[name].[ext]',
            limit : 10000,
            mimetype
        }
    });
});

webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
        options : {
            sassLoader : {
                includePaths : [ project.paths.client('styles'), project.paths.public() ]
            },
            resolveUrlLoader: {
                sourceMap: true
            }
        }
    })
);

// ------------------------------------
// Finalize Configuration
// ------------------------------------

if (__DEV__) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 8888
    }));
}

module.exports = webpackConfig;

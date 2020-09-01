import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './../config/webpack.config';
import project from './../config/project.config';
import compress from 'compression';
import fs from 'fs';
const app = express();

// Apply important middleware
app.use(compress());

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
    const compiler = webpack(webpackConfig);
    app.use((req, res, next) => {
        res.set({
            'Allow-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Origin': '*'
        });
        next();
    });
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath  : webpackConfig.output.publicPath,
        contentBase : project.paths.client(),
        hot         : true,
        quiet       : project.compiler_quiet,
        noInfo      : project.compiler_quiet,
        lazy        : false,
        stats       : project.compiler_stats
    }));
    app.use(require('webpack-hot-middleware')(compiler, {
        path: '/__webpack_hmr'
    }));

    // Serve static assets from ~/public since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
    app.use(express.static(project.paths.public()));
    // This rewrites all routes requests to the root /index.html file
    // (ignoring file requests). If you want to implement universal
    // rendering, you'll want to remove this middleware.
    // Handler
    app.use('*', (req, res, next) => {
        const filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
} else {
    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use(express.static(project.paths.dist()));
    app.use('*', (req, res, next) => {
        const filename = path.join('./dist/', 'index.html');
        fs.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
}

export default app;
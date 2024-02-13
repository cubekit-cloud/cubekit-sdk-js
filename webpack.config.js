const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = ({ development }) => ({
    entry: './src/index.ts',
    devtool: development ? 'inline-source-map' : false,
    mode:  development ? 'development' : 'production',
    output: {
        filename: 'cubekit-client-sdk.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'cubekit_client_sdk',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: 'typeof self === \'undefinded\' ? this : self',
    },
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            },
        ],
    },
    plugins: [new ESLintPlugin({ extensions: ['ts']})],
});
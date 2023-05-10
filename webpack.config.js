import nodePath from 'path';
import webpack from 'webpack';

const options = {
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ],
    },
    output: {
      path: nodePath.resolve('/dev/js'),
      filename: 'app.min.js'
    },
    plugins: [
        // fix "process is not defined" error:
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
    ]
};

export default options;
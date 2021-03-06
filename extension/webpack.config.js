const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: {
        popup:'./src/popup.jsx',
        //background: './src/backround.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), //defining the path of our build ..which will be dist folder?
        filename:'[name].js', //any file we define in the entry section will be copied with the exact name but it will be js instead of jsx
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
        },
        extensions: ['.js', '.jsx', '.css'],
    },
    module: {
        rules: [{ 
            test: /\.(js|jsx)$/, //loader will be executed with js and jsx file extensions 
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader', //tool that we use to understand react code and transpile it into plain js that our webpack builder can understand
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }, 
            },
            {
                test: /\.css$/i,      //for index.css, in order to understand googlefont@ syntax and such                                                                                                    
                use: ["style-loader", "css-loader"],                                                                                                                          
            },  
    
    ],
    },
    plugins: [new HtmlWebpackPlugin({ //update copied code and send an object to the function which will contain the template
            template:'./src/popup.html',    //with the path to our popup.html file and then we will define the file name field to keep the same popup.html name
            filename:'popup.html', //npm run build will then now produce the popup.html, we also need to do this for manifest.json
        }),
        new CopyPlugin({
            patterns: [
                {from: "public"}, //for manifest.json
            ]
        })
    
    ]

};
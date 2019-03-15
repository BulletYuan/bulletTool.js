const path = require('path');

module.exports = {
    entry:"./src/index.js",
    output:{
        filename:"BulletTool-1.2.1.min.js",
        path:path.resolve(__dirname,"dist")
    }
};
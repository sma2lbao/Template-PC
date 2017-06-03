const fs = require('fs');
const path = require('path');

const util = {
    getProjName: function () {
        let stylesDir = path.resolve(__dirname, '../src/styles');
        let childDir = fs.readdirSync(stylesDir);
        let name = !childDir[0] ? '' : childDir[0];
        return name;
    },
    getStyles: function () {
        let projectName = this.getProjName();
        let projStyleDir = path.resolve(__dirname, '../src/styles/' + projectName);
        let projStyle = fs.readdirSync(projStyleDir);
        let styleDir = [];
        for (let i = 0; i < projStyle.length; i++) {
            styleDir.push(path.join(projStyleDir, projStyle[i]));
        }
        return styleDir;
    },
    getPages: function () {
        let projectName = this.getProjName();
        let projPageDir = path.resolve(__dirname, '../src/pages/' + projectName);
        let projPage = fs.readdirSync(projPageDir);
        return projPage;
    },
}
module.exports = util;

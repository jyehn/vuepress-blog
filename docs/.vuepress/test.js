// var fs = require('fs');
// var path = require('path');
// function genSidebarConfig() {
//     var pagesDir = '../pages/';
//     if (!fs.existsSync(pagesDir)) return {};
//     var siderbarConfig = {};
//     siderbarConfig['/'] = {
//         title: "xwuis "
//     }
//     fs.readdirSync(pagesDir).forEach(dir => {
//         const pth = path.resolve(pagesDir, dir);
//         const stat = fs.statSync(pth);
//         if (stat.isDirectory()) {
//             siderbarConfig[`/pages/${dir}/`] = {
//                 title: dir,   // 一级菜单名称
//                 collapsable: false, // false为默认展开菜单, 默认值true是折叠,
//                 sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
//                 children: fs.readdirSync(pth).map(mdFile => {
//                     return mdFile;
//                 })
//             };
//         }
//     })
//     console.log(siderbarConfig)
//     return siderbarConfig;
// }
var fs = require('fs');
var path = require('path');
function genSidebarConfig() {
    var pagesDir = '../pages/';
    if (!fs.existsSync(pagesDir)) return {};
    var siderbarConfig = {};
    fs.readdirSync(pagesDir).forEach(dir => {
        const pth = path.resolve(pagesDir, dir);
        const stat = fs.statSync(pth);
        if (stat.isDirectory()) {
            siderbarConfig[`/${dir}/`] = fs.readdirSync(pth).filter(file=>file.endsWith('.md'));
        }
    })
    console.log(siderbarConfig)
    return siderbarConfig;
}
genSidebarConfig();
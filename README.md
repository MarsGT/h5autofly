h5autofly
=========

这是一个用在 H5 项目上的 Gulp 自动化脚本，主要用于对 H5 源码进行自动化处理及输出.


安装及使用
---------

1. 首先安装好 node.js 环境;
2. 将文件夹拷贝到本地, 然后将源码及相关资源文件放入其中的 src 文件夹;
3. 在命令行进入 test 目录, 首先需要执行[npm install]来安装所有依赖的包, 然后直接执行[gulp];
4. 这时系统会自动执行所有的文件压缩及转化流程, 最后开启服务器(浏览器会自动打开 http://localhost:3000 ), 并监控改动(如有文件改动则自动刷新);
5. 服务器后台地址为: http://localhost:3001
6. 命令行使用 Ctrl+C 退出.


命令行指令
---------


- `gulp`
    执行默认任务, 依次运行[压缩js]、[压缩CSS]、[编译SASS]、[压缩图片]、[复制HTML文件]、[建立调试服务器]等任务后, 自动开启监视刷新任务;
- `gulp script`
    单独执行[压缩js]任务, 压缩后的文件将移至 dist 内的相应文件夹;
- `gulp css`
    单独执行[压缩CSS]任务, 压缩后的文件将移至 dist 内的相应文件夹;
- `gulp sass`
    单独执行[编译SASS]任务, 压缩后的文件将移至 dist 内的相应文件夹;
- `gulp imgmin`
    单独执行[压缩图片]任务, 压缩后的文件将移至 dist 内的相应文件夹;
- `gulp server`
    单独执行[建立调试服务器]任务, 注意执行此任务前须确保 dist 内存在相应文件;


友情提示
-------

在 Windows 平台下，想删除 node_modules 文件夹请先全局安装 rimraf，如：
`npm install -g rimraf`
然后再用：
`rimraf node_modules`
删除即可。
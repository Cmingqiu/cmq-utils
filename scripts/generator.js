const render = require('json-templater/string');
const fs = require('fs');
const path = require('path');
const endLine = require('os').EOL;
const resolve = p => path.resolve(__dirname, p);
const baseResolve = p => path.join(resolve('../src'), p);

const IMPORTTEMPLATE = "import {{pkg}} from './{{pkg}}';";
const EXPORT = 'export { {{pkg}} };';
const template = `
{{imports}}
 
export default {\r {{pkgs}} \r};

`;
// {{exports}}

/**
 * 生成index文件
 */
function generateIndex() {
  fs.readdir(resolve('../src'), (err, files) => {
    if (!err) {
      if (files.includes('index.ts')) {
        fs.unlinkSync(baseResolve('index.ts'));
      }
      const targets = files.filter(
        file =>
          !file.includes('index') && fs.statSync(baseResolve(file)).isFile()
      );

      const importList = [];
      const pkgList = [];
      const exportList = [];
      targets.forEach(target => {
        const pkg = target.split('.')[0];
        pkgList.push(pkg);
        importList.push(render(IMPORTTEMPLATE, { pkg }));
        exportList.push(render(EXPORT, { pkg }));
      });

      fs.writeFileSync(
        path.resolve(__dirname, '../src/index.ts'),
        render(template, {
          imports: importList.join(endLine),
          pkgs: pkgList.join(',' + endLine),
          exports: exportList.join(endLine)
        })
      );
    }
  });
}

generateIndex();

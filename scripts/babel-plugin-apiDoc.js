// 自动生成api文档
const path = require('path');
const t = require('@babel/types');
const fs = require('fs');
const resolve = pathname => path.resolve(__dirname, pathname);

const mdFile = path.join(process.cwd(), 'apiDoc.md');
if (fs.existsSync(mdFile)) {
  fs.unlinkSync(mdFile);
}

module.exports = {
  pre(file) {
    file.set('docs', []);
  },
  visitor: {
    'ExportDefaultDeclaration|ExportNamedDeclaration|VariableDeclarator'(
      path,
      state
    ) {
      const docs = state.file.get('docs');
      const { node } = path;
      const comment = node.leadingComments?.[0].value
        .replaceAll('*', '')
        .replaceAll('\n\r', '');
      let params = [],
        name = '';
      path.traverse({
        'FunctionDeclaration|ArrowFunctionExpression'(path) {
          const { node } = path;
          name = node?.id?.name;
          params = getParams(path);
        }
      });
      // TODO
      // let returnValue = '';
      //  if(t.isBlockStatement( node.body )){
      //    node.body.body.
      //  }
      if (name) {
        docs.push({
          name, //等价于 path.get('id').name;
          params,
          returnValue: '',
          comment
        });
        state.file.set('docs', docs);
      }
    },
    'FunctionDeclaration|ArrowFunctionExpression'(path, state) {
      const docs = state.file.get('docs');
      const { node } = path;
      const name = node?.id?.name;
      const comment = node.leadingComments?.[0].value
        .replaceAll('*', '')
        .replaceAll('\n\r', '');
      const params = getParams(path);
      docs.push({
        name,
        params,
        returnValue: '',
        comment
      });
      state.file.set('docs', docs);
    }
  },
  post(file) {
    const docs = file.get('docs');
    // 去重
    const res = docs.filter(
      (doc, i) => i === docs.findIndex(v => v.name === doc.name)
    );
    generationApiDoc(res?.[0]);
  }
};

/**
 * 获取当前节点下的params
 * @param {*} path
 */
function getParams(path) {
  return path.get('params').map(paramPath => {
    const { node } = paramPath;
    let name = '';
    if (t.isIdentifier(node)) {
      name = node.name;
    } else if (t.isAssignmentPattern(node)) {
      name = node.left.name;
    }
    return {
      name // 可用 paramPath.toString()
    };
  });
}

/**
 * 生成对应md格式的文档
 * @param {*} doc
 */
function generationApiDoc(doc) {
  if (doc !== undefined) {
    let str = '';
    str += `## ${doc.name}\n参数：${
      doc.params.length ? doc.params.map(param => param.name + ' ') : '无'
    }\n${doc.comment}\n\r`;

    fs.appendFileSync(mdFile, str);
  }
}

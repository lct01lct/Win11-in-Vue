const directiveFiles = import.meta.globEager('./**/*.js');

export default (app) => {
  for (const key in directiveFiles) {
    const item = directiveFiles[key];
    app.directive(item.directiveName, item.default);
  }
};

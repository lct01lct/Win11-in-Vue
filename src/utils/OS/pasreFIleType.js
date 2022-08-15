export default (Node) => {
  const extension = Node ? Node.extension : new Error('参数应为文件或者文件夹');

  return extension || 'folder';
};

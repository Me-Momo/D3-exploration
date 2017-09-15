
function debug(namespace: string) {
  return (msg: string|any, ...args: any[]) => {
      // TODO: 判断是否为生产环境
      const debugPermit = localStorage.getItem('debug').split(':').slice(0, -1).join(':');
      if (debugPermit === '*') {
        // tslint:disable-next-line:no-console
        console.log(msg, ...args);
      } else if (new RegExp(`^(${debugPermit})`).test(namespace)) {
        // tslint:disable-next-line:no-console
        console.log(msg, ...args);
      }
  };
}

export {
  debug,
};

function debug(namespace: string) {
  return (msg: string, ...args: any[]) => {
      // TODO: 判断是否为生产环境
      console.log(msg, ...args);
  }
}

export {
  debug,
}
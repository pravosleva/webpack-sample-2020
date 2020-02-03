async function start() {
  return await Promise.resolve();
}

start().then(() => console.log('aync is working'));

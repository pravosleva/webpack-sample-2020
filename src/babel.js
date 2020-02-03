async function start() {
  return await Promise.resolve();
}

start().then(() => console.log('aync is working'));

// Poroposal sample:
class Util {
  static id = Date.now();
}

console.log('Util Id:', Util.id);

const unused = 42; // eslint warning sample

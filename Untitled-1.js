function immutable(obj) {
  // already immutable!
  if (obj && obj.hasOwnProperty('__immutable')) {
    return obj;
  }

  let newObj;

  if (Array.isArray(obj)) {
    newObj = [];

    // first make all elements immutable
    for (let i in obj) {
      newObj[i] = immutable(obj[i]);
    }

    // then DISABLE all mutating methods of the array itself
    let unsafe = [
      'push',
      'pop',
      'sort',
      'splice',
      'shift',
      'unshift',
      'reverse'
    ];
    let fail = function() {
      throw new Error('Cannot modify immutable object');
    };
    unsafe.forEach(function(fn) {
      Object.defineProperty(newObj, fn, { value: fail });
    });
  } else if (obj && typeof obj == 'object') {
    // make all values in the object immutable
    newObj = {};
    for (let i in obj) {
      newObj[i] = immutable(obj[i]);
    }
  } else {
    // primitive
    return obj;
  }
  // add 'already immutable' property
  Object.defineProperty(
    newObj,
    '__immutable',
    {
      /*defaults*/
    }
  );
  // prevent any more edits of any kind 🐱
  return Object.freeze(newObj);
}
function update(obj, updates) {
  // commands we know how to perform
  const COMMANDS = ['$push', '$unshift', '$splice', '$merge', '$set', '$unset'];

  // check if we're attempting a command right now
  // passing more than one command is not allowed
  // and the last one will simply be taken!
  let command, changes;
  Object.keys(updates).forEach(function(cmd) {
    if (COMMANDS.indexOf(cmd) != -1) {
      command = cmd;
      changes = updates[command];
    }
  });

  // prepare the new object
  // shallow copy suffices here due to each
  // nested object being handled recursively
  // (each will be shallow copied)
  let next;
  if (Array.isArray(obj)) {
    next = [].concat(obj);
  } else if (obj && typeof obj == 'object') {
    next = {};
    for (let k in obj) {
      next[k] = obj[k];
    }
  } else {
    next = obj;
  }

  if (command) {
    switch (command) {
    case '$merge':
      for (const k in changes) {
        next[k] = changes[k];
      }
      break;
    case '$splice':
      next.splice.apply(next, changes);
      break;
    case '$push':
      next.push.apply(next, changes);
      break;
    case '$unshift':
      next.unshift.apply(next, changes);
      break;
    case '$set':
      return changes;
    case '$unset':
      delete next[changes];
      break;
    default:
      throw new Error('Unknown command: ' + command);
    }
  }

  for (const key in updates) {
    if (COMMANDS.indexOf(key) == -1) {
      next[key] = update(next[key], updates[key]);
    }
  }

  return immutable(next);
}

function pure( componentFn, immutableProp ) {
  // keep track of props and render results
  const memoizedRenders = {};

  return function( props ) {
    // the prop we are considering ourselves pure 'against'
    const prop = props[immutableProp];

    // attempt to find a memoized render
    // for this prop and id
    const memoized = memoizedRenders[prop.id];

    // if we found one and the memoized value is
    // the exact same object as the new prop
    // then we don't need to render because the
    // result would be the same!
    if( memoized && memoized.value === prop ) {
      return memoized.result;
    }
    // otherwise, render and store the results
    // for later lookup
    else {
      const result = componentFn( props );
      memoizedRenders[prop.id] = { value: prop, result: result };
      return result;
    }
  };
}
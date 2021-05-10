const fs = require('fs').promises;
const utf8 = require('utf8');
const path = require('path');

const readAnagram = (leafs) => {
  const branches = [];
  if (leafs.length == 1) return leafs;
  for (let k in leafs) {
    let leaf = leafs[k];
    readAnagram(leafs.join('').replace(leaf, '').split(''))
      .concat('')
      .map((subtree) => {
        branches.push([leaf].concat(subtree));
      });
  }
  return branches;
};

const readDictionary = async () => {
  const ruta = path.join(__dirname, './dictionary_es-ES.txt');
  const data = await fs.readFile(ruta, 'binary');

  return utf8
    .decode(new Buffer.from(data).toString())
    .toLowerCase()
    .split('\n')
    .map((e) => {
      return e.split('/')[0];
    });
};

const anagramResolve = async (word) => {
  const result = [];

  const anagramResult = await readAnagram(word.split(''))
    .map((str) => {
      return str.join('').length === word.length ? str.join('') : '';
    })
    .filter((x) => {
      return x !== '';
    });

  const dictionaryResult = await readDictionary().then((e) => {
    return e;
  });

  await anagramResult.map((e) => {
    if (dictionaryResult.includes(e)) {
      if (!result.includes(e)) {
        result.push(e);
      }
    }
  });

  return result;
};

module.exports = { anagramResolve };

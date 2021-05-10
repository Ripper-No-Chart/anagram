#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const program = require('commander');
const { anagramResolve } = require('./anagram');

const getDictionary = async () => {
  const file = fs.createWriteStream('dictionary_es-ES.txt');
  return https.get('https://raw.githubusercontent.com/titoBouzout/Dictionaries/master/Spanish.dic', (res) => {
    res.pipe(file);
  });
};

const init = () => {
  program
    .version('1.0.0')
    .name('anagram')
    .description('Anagram resolver by dictionary - by RipperNoChart')
    .command('word <type>')
    .description('Word to resolve')
    .alias('w')
    .action(async (word, args) => {
      console.log('Your word is %s', word);
      await getDictionary().then(() => {
        console.log('Dictionary download successful');
      });
      const result = await anagramResolve(word);
      console.log({ result, total: result.length });
    });

  program.parse(process.argv);
};

init();

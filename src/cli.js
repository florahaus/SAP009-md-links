#! /usr/bin/env node
import chalk from 'chalk';
import { mdLinks } from './index.js';

const caminho = process.argv[2];
const valida = process.argv.includes('--validate');
let icon;


mdLinks(caminho, valida)
  .then((links) => {
    links.forEach(link => {
      if(valida){
        console.log(link.text, link.href, link.file, link.status, link.ok);
      } else {
        console.log(link.text, link.href, link.file);
      }
    });
  });
 

import fs from 'fs';

function extrairLinks(resultado, caminhoDoArquivo){
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturarRegex = [...resultado.matchAll(regex)];
  const result = capturarRegex.map((capture) => ({
    text: capture[1],
    href: capture[2],
    file: caminhoDoArquivo
  }));
  return result;
}


function mdLinks(caminhoDoArquivo, valida) {
  return new Promise((resolve, reject) => {
    fs.promises.readFile(caminhoDoArquivo, 'utf-8')
      .then((resultado) => {
        const links = extrairLinks(resultado, caminhoDoArquivo);
        if(valida) {
          validarLinks(links, resolve);
        } else {
          resolve(links);
        }
      })
      .catch((erro) =>{
        reject(erro)
      });
  });
}

function validarLinks(links, resolve) {
const promessasValidacao = links.map(async(link) => {
  return fetch(link.href)
  .then((response) => {
    link.status = response.status;
    link.ok = 'ok';
    if(link.status >= 400){
      link.ok = 'fail';
    }
    return link;
  })
  .catch((erro) => {
    link.status = 'erro';
    link.ok = 'fail';
    return link;
  })
  })
  Promise.all(promessasValidacao)
  .then((result) => {
   resolve(result);
  })
} 

export { mdLinks, extrairLinks };

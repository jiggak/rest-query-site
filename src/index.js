import './styles.scss';

import CodeFlask from 'codeflask';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import Handlebars from 'handlebars/dist/handlebars';

import { execQuery } from 'rest-query';


const templateSrc = document.querySelector('#results-template').innerHTML;
const template = Handlebars.compile(templateSrc);

document.querySelector('.exec-button').addEventListener('click', onExecClick);

function onExecClick() {
   const query = flask.getCode();
   execQuery(query, { breeds: 'https://catfact.ninja/breeds' })
      .then(data => renderData(data));
}

function renderData(data) {
   const results = document.querySelector('.results');

   let row;
   if (Array.isArray(data)) {
      row = data[0];
   } else {
      row = data;
      data = [data];
   }

   console.table(data);

   results.innerHTML = template({data: data, col: Object.keys(row)});
}

const flask = new CodeFlask('.query-editor', {
   language: 'sql',
   lineNumbers: true
});

flask.addLanguage('sql', Prism.languages['sql']);

flask.updateCode(`select data.breed, data.origin, data.coat, data.pattern
from breeds
where limit = 20 and page = 2`);

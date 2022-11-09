import './styles.scss';

import CodeFlask from 'codeflask';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

import { execQuery } from 'rest-query';


document.querySelector('.exec-button').addEventListener('click', onExecClick);

function onExecClick() {
   execQuery(
      `select data.breed, data.origin, data.coat, data.pattern
      from breeds
      where limit = 20 and page = 2`,
      { breeds: 'https://catfact.ninja/breeds' }
   ).then(data => console.table(data));
}

const flask = new CodeFlask('.query-editor', {
   language: 'sql',
   lineNumbers: true
});

flask.addLanguage('sql', Prism.languages['sql']);

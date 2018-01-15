const CIRCLE_BRANCH = process.env.CIRCLE_BRANCH || 'other';
const suffixes = {
  master: '_PROD',
  develop: '_DEV',
  other: '',
};
const suffix = suffixes[CIRCLE_BRANCH];
const API_PROTOCOL = process.env[`API_PROTOCOL${suffix}`] || 'http';
const API_HOST = process.env[`API_HOST${suffix}`] || 'api.agg.loc';
const API_PORT = process.env[`API_PORT${suffix}`] || 8000;
const APP_CONFIGURATIONS_PATH =
  process.env[`APP_CONFIGURATIONS_PATH${suffix}`] || '/internal-api/v1/app-configurations/';
const url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}${APP_CONFIGURATIONS_PATH}`;
const login = process.env[`INTERNAL_API_LOGIN${suffix}`] || 'test_login';
const password = process.env[`INTERNAL_API_PASSWORD${suffix}`] || 'Te$tPasSw0rD';
const fs = require('fs');
const file = fs.readFileSync(`${__dirname}/../src/configs/global.yml`, 'utf8');
const yaml = require('js-yaml');
const doc = yaml.safeLoad(file);
const s = yaml.safeDump(doc);
const md5 = require('md5');
const config = `version: ${md5(s)}\n${s}`;
const axios = require('axios');
let asyncTask = () =>
  axios
    .post(url, { login, password, config })
    .then(() => 'updateconf.js - OK')
    .catch(response => {
      const CircularJSON = require('circular-json');
      return Promise.reject(`updateconf.js - ERROR\n` + CircularJSON.stringify(response));
    });
let makeMeLookSync = fn => {
  let iterator = fn();
  let loop = result => {
    !result.done && result.value.then(res => loop(iterator.next(res)), err => loop(iterator.throw(err)));
  };
  loop(iterator.next());
};
makeMeLookSync(function*() {
  try {
    let result = yield asyncTask();
    console.log(result);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

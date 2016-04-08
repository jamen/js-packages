'use strict';

const plugin = require('hmu-plugin')('github');
const c = plugin.c;
const https = require('https');
const routine = require('promise-routine');

module.exports = function gh(searches) {
  return routine(
    plugin.status,
    searches.map(search => ([
      {
        host: 'api.github.com',
        path: `/users/${search}`,
        headers: { 'User-Agent': 'hmu-gh - github.com/jamen/hmu-gh' },
      },
      404,
      https,
    ])),
    plugin
  ).then(statuses => {
    searches.forEach((search, i) => {
      const free = statuses[i];
      plugin.log(`${search} ${free ? c.green('free') : c.red('taken')}`);
    });
  }, plugin.error);
};

'use strict';

const plugin = require('hmu-plugin')('github');
const c = plugin.c;
const https = require('https');

module.exports = function gh(searches) {
  searches.forEach(search => {
    plugin.status({
      host: 'api.github.com',
      path: `/users/${search}`,
      headers: { 'User-Agent': 'hmu-gh - github.com/jamen/hmu-gh' },
    }, 404, https).then(
      free => plugin.log(`${search} ${free ? c.green('free') : c.red('taken')}`),
      console.error
    );
  });
};

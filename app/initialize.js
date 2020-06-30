import $ from 'jquery';
import buildSnowflake from 'snowflake-renderer';
import queryString from 'query-string';
require('buffer').Buffer;

document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  const query = queryString.parse(window.location.search);
  // console.log(query.p);
  // const params = JSON.parse(query.p.toString('utf8'));
 const params = {}
  buildSnowflake($('#snowflake_holder'), params);
  console.log('Initialized app');
});

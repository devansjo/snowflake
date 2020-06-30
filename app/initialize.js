import $ from 'jquery';
import buildSnowflake from 'snowflake-renderer';
import queryString from 'query-string';
require('buffer').Buffer;

document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  const query = queryString.parse(window.location.search);
  const params = query.name ? {name: query.name} : {};
  buildSnowflake($('#snowflake_holder'), params);

  const input = document.getElementById('enter-name');
  input.addEventListener("keyup", () => {
    console.log(input.value);
    buildSnowflake($('#snowflake_holder'), {name: input.value});
  });

});

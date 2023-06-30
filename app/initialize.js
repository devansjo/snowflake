import $ from 'jquery';
import _ from 'lodash';
import buildSnowflake from 'snowflake-renderer';
import queryString from 'query-string';
require('buffer').Buffer;


const defaultOptions = {
  name: 'Your Name',
  arms: 7,
  max_font: 125,
  min_font: 6,
  arm_length: 256,
  font_family: 'Pinyon Script',
  font_weight: 450
};

const omitEmptyString = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      return value != ""
    })
  )


document.addEventListener('DOMContentLoaded', () => {
  const params = omitEmptyString(queryString.parse(window.location.search));

  _.defaults(params, defaultOptions);

  let url = `https://fonts.googleapis.com/css?family=${params.font_family}:wght@100;200;300;400;500;600;700;800&display=swap`

  document.getElementById('config').innerText = JSON.stringify(_.omit(params, 'name'))

  $.ajax({
    url: url,
    dataType: 'text',
    statusCode: {
      200: function () {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
        document.getElementById('example').innerText = params.font_family
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
      document.getElementById('example').innerText = "Invalid font name - Using cursive as default"
    }
  });


  buildSnowflake($('#snowflake_holder'), params);

  const input = document.getElementById('enter-name');
  input.addEventListener("keyup", () => {
    _.merge(params, { name: input.value });
    buildSnowflake($('#snowflake_holder'), params);
  });

});

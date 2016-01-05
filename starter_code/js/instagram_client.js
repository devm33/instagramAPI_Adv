// WRITE YOUR CODE IN script.js, NOT HERE

/* This file provides this global IG object which enables interaction with the 
 * Instagram rest API
 */

function searchInstagram(clientID, query, count, callback) {
  // first we make the search query into a tag
  var tag = query.toLowerCase()
                 .replace('#', '') // we don't want to send #
                 .replace(' ', ''); // no spaces in tags

  // see https://instagram.com/developer/endpoints/tags/
  var endpoint = '/tags/' + tag + '/media/recent';

  callInstagramAPI(clientID, endpoint, {'count':count}, callback);
}

// This function is used by the searchInstagram() function
// to actually call the API. It's broken out here to make
// that function easier to read, but also in case we
// want to eventually call other endpoints.
function callInstagramAPI(clientID, endpoint, params, callback) {
  endpoint = 'https://api.instagram.com/v1' + endpoint;
  params = $.extend({'client_id':clientID}, params);
  $.ajax(endpoint, {'data':params, 'dataType':'jsonp'})
   .done(
      // this block gets called if the API call works or fails!
      function(response) {
        if (response.meta.error_message) {
          console.error(response.meta.error_message);
        } else if (response.data) {
          callback(response.data);
        }
      }
    );
}

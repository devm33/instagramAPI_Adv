// Keep your application's code in script.js, but feel free to modify this
// library to suit your needs. Let us know if you add anything cool!

/* This file provides this global IG object which enables interaction with the 
 * Instagram API. More details here: https://www.instagram.com/developer/
 *
 * The IG object provides the following methods:
 *
 * IG.init(client_idi, redirect)
 *
 * IG.getMedia(tag, count)
 *
 * IG.searchForTags(query)
 */
/*global jQuery*/

(function($, window) {
    'use strict';

    function init(client_id, redirect_uri) {
        // TODO make a call to insta auth
    }

    function getMedia(tag, count) {
        // TODO hit https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN
    }

    function searchForTags(query) {
        // TODO hit https://api.instagram.com/v1/tags/search/{tag-name}/media/recent?access_token=ACCESS-TOKEN

    }

    // Here is where we put the functions we created on the IG object and make
    // them publicly available so you can reference them in script.js
    window.IG = {
        init: init,
        get: get,
    };
}(jQuery, window));


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

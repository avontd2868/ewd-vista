// Uncomment this line in production
var EWD    = require('ewd-client').EWD;
// Uncomment this line for testing
// EWD    = require('ewd-client').EWD;
var io     = require('socket.io-client');
var jQuery = require('jquery');
window.$   = window.jQuery = jQuery;
require('jquery-ui');
require('bootstrap');
toastr = require('toastr');
// Uncomment this line in production
// toastr.options.preventDuplicates = true;
var login    = require('ewd-vista-login/client/vista-login');
// var bedboard = require('ewd-vista-bedboard/client/vista-bedboard');

/*
  This section starts everything. If you are following
  the code, start here.
  Rob's changes to what I thought:
   * Set EWD.log to true here
   * Call EWD.start here.
*/
$(document).ready(function() {
  /* .on needs to come first so that we know what we need
     to do after we start. Otherwise, maybe race condition */
  EWD.on('ewd-registered', function() {
    // Uncomment this line for testing
    testEWD = EWD;
    
    EWD.log = true;
    console.log('**** Got the ewd-register event!!');
    
    EWD.on('socketDisconnected', function() {
      location.reload();
    });
    
    /* This is good for testing, but I don't want it normally.
    EWD.on('error', function(responseObj) {
      // automatically display all returned errors using toastr
      var error = responseObj.message.error || responseObj.message;
      toastr.error(error);
    });
    */
    
    login.preLogin1(EWD);
  });
  
  EWD.on('setContextStatus', function(responseObj) {
    if (responseObj.message.value == 1) {
      bedboard.showWards(EWD);
    }
  });
  
  EWD.start('ewd-vista', $, io);
});

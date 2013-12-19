'use strict';

/* Services */

// Simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

myApp.factory('cordovaReady', function() {
  return function (fn) {

    var queue = [];

    var impl = function () {
      queue.push(Array.prototype.slice.call(arguments));
    };

    document.addEventListener('deviceready', function () {
      queue.forEach(function (args) {
        fn.apply(this, args);
      });
      impl = fn;
    }, false);

    return function () {
      return impl.apply(this, arguments);
    };
  };
});

myApp.factory('geolocation', function ($rootScope, cordovaReady) {
  return {
    getCurrentPosition: cordovaReady(function (onSuccess, onError, options) {
        navigator.geolocation.getCurrentPosition(function () {
               var that = this,
               args = arguments;

               if (onSuccess) {
                   $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                   });
                   }
               }, function () {
                    var that = this,
                    args = arguments;

                   if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                   }
               },
            options);
        })
    };
});

myApp.factory('networkConnection', function (cordovaReady) {
  return {
    getConnectionType: cordovaReady(function () {
          var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            return states[networkState];
        }),
    hasConnection: cordovaReady(function () {
        if(navigator.connection.type == Connection.NONE){
            return false;

        }
        return true;        
    })
    };
});


myApp.factory('accelerometer', function ($rootScope, cordovaReady) {
    return {
        getCurrentAcceleration: cordovaReady(function (onSuccess, onError) {
            navigator.accelerometer.getCurrentAcceleration(function () {
                var that = this,
                    args = arguments;

                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                args = arguments;

                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            });
        })
    };
});

myApp.factory('notification', function ($rootScope, cordovaReady) {
    return {
        alert: cordovaReady(function (message, alertCallback, title, buttonName) {
            navigator.notification.alert(message, function () {
                var that = this,
                    args = arguments;

                $rootScope.$apply(function () {
                    alertCallback.apply(that, args);
                });
            }, title, buttonName);
        }),
        confirm: cordovaReady(function (message, confirmCallback, title, buttonLabels) {
            navigator.notification.confirm(message, function () {
                var that = this,
                    args = arguments;

                $rootScope.$apply(function () {
                    confirmCallback.apply(that, args);
                });
            }, title, buttonLabels);
        }),
        beep: cordovaReady(function (times) {
            navigator.notification.beep(times);
        }),
        vibrate: cordovaReady(function (milliseconds) {
            navigator.notification.vibrate(milliseconds);
        })
    };
});

myApp.factory('navSvc', function($navigate) {
    return {
        slidePage: function (path,type) {
            $navigate.go(path,type);
        },
        back: function () {
            $navigate.back();
        }
    }
});

myApp.factory('compass', function ($rootScope, cordovaReady) {
    return {
        getCurrentHeading: cordovaReady(function (onSuccess, onError) {
            navigator.compass.getCurrentHeading(function () {
                var that = this,
                    args = arguments;

                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                    args = arguments;

                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            });
        })
    };
});

myApp.factory('contacts', function ($rootScope, cordovaReady) {
    return {
        findContacts: cordovaReady(function (onSuccess, onError) {
            var options = new ContactFindOptions();
            options.filter="";
            options.multiple=true;
            var fields = ["displayName", "name"];
            navigator.contacts.find(fields, function(r){console.log("Success" +r.length);var that = this,
                args = arguments;
                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                    args = arguments;

                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            }, options)
        })
    }
});




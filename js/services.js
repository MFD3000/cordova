'use strict';

/* Services */

// Simple value service.
angular.module('arvak.services', []).
  value('version', '0.1');

angular.module('cordova.services', []);

 angular.module('cordova.services').factory('cordovaReady', function() {
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

angular.module('cordova.services').factory('geolocation', function ($rootScope, cordovaReady) {
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

angular.module('cordova.services').factory('camera', function ($rootScope, cordovaReady) {
  return {
    getPicture: cordovaReady(function (onSuccess, onError, options) {
        navigator.camera.getPicture(function () {
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

angular.module('cordova.services').factory('networkConnection', function (cordovaReady) {
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

angular.module('cordova.services').service('device', function (cordovaReady) {
  return cordovaReady(window.device);
        
        
  
 
});

angular.module('cordova.services').factory('accelerometer', function ($rootScope, cordovaReady) {
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

angular.module('cordova.services').factory('notification', function ($rootScope, cordovaReady) {
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

angular.module('arvak.services').factory('navSvc', function($navigate) {
    return {
        slidePage: function (path,type) {
            $navigate.go(path,type);
        },
        back: function () {
            $navigate.back();
        }
    }
});

angular.module('cordova.services').factory('compass', function ($rootScope, cordovaReady) {
    return {
        getCurrentHeading: cordovaReady(function (onSuccess, onError, options) {
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
               },
            options);
        })
    };
});

angular.module('cordova.services').factory('contactsSvc', function ($rootScope, cordovaReady) {
    return {
        findContacts: cordovaReady(function (fields, onSuccess, onError, options) {
        navigator.contacts.find(fields, function () {
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



    }
});




angular.module('arvak.services').service('templateCache', function ($http, $q, $angularCacheFactory) {

    $angularCacheFactory('dataCache', {
        maxAge: 900000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 3600000, // This cache will clear itself every hour.
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
        storageMode: 'localStorage'
    });
 $http.defaults.cache = $angularCacheFactory.get('dataCache');
    return {
        getDataById: function (id) {
            var deferred = $q.defer(),
                start = new Date().getTime(),
                dataCache = $angularCacheFactory.get('dataCache');

            // Now that control of inserting/removing from the cache is in our hands,
            // we can interact with the data in "dataCache" outside of this context,
            // e.g. Modify the data after it has been returned from the server and
            // save those modifications to the cache.
            if (dataCache.get(id)) {
                alert('loaded from localstorage');
                deferred.resolve(dataCache.get(id));
            } else {
                $http.get('http://10.0.1.21:9000/basic.html').success(function (data) {
                //$http.get('partials/basic.html').success(function (data) {
                        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
                        //alert('loaded from web' + data);

                        deferred.resolve(data);
                        console.log('bla');
                    });
            }
            return deferred.promise;
        }
    };
});







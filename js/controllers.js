'use strict';
angular.module('arvak.controllers', []);
/* Controllers */
angular.module('arvak.controllers').controller('HomeCtrl', ['$scope','navSvc','$rootScope', function($scope,navSvc,$rootScope) {
    console.log('initialized');
    $rootScope.showSettings = false;
    $scope.slidePage = function (path,type) {
        navSvc.slidePage(path,type);
    };
    $scope.back = function () {
        navSvc.back();
    };
    $scope.changeSettings = function () {
        $rootScope.showSettings = true;
    };
    $scope.closeOverlay = function () {
        $rootScope.showSettings = false;
    };
}]);

angular.module('arvak.controllers').controller('NotificationCtrl', ['$scope', 'notification', function($scope, notification) {
    $scope.alertNotify = function() {
        notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
    };
    
    $scope.beepNotify = function() {
        notification.beep(1);
    };
    
    $scope.vibrateNotify = function() {
        notification.vibrate(1000);
    };
    
    $scope.confirmNotify = function() {
        notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
    };
}]);

angular.module('arvak.controllers').controller('GeolocationCtrl', ['$scope', 'navSvc','geolocation', function($scope,navSvc, geolocation) {

    geolocation.getCurrentPosition(function(position) {
       
        $scope.position=position;
        $scope.$apply();
        },function(e) { alert("Error retrieving position " + e.code + " " + e.message) });

    $scope.back = function () {
        navSvc.back();
    };
}]);

angular.module('arvak.controllers').controller('NetworkConnectionCtrl',['$scope', 'navSvc','networkConnection', function($scope,navSvc, networkConnection) {

    $scope.connectionType = networkConnection.getConnectionType(); 
       
    $scope.hasConnection = networkConnection.hasConnection();
        
    $scope.back = function () {
        navSvc.back();
    };
}]);

angular.module('arvak.controllers').controller('AccelerCtrl',['$scope', 'accelerometer', function($scope, accelerometer) {
    accelerometer.getCurrentAcceleration(function (acceleration) {
        $scope.acceleration  = acceleration;
        },function(e) { console.log("Error finding acceleration " + e) });
}]);

angular.module('arvak.controllers').controller('DeviceCtrl', ['$scope', 'device', function($scope, device) {
    //Not properly integrated with service
    $scope.device = window.device;
}]);

angular.module('arvak.controllers').controller('CompassCtrl', ['$scope', 'compass', function($scope, compass) {
    compass.getCurrentHeading(function (heading) {
        $scope.heading  = heading;
       
    },function(e) { console.log("Error finding compass " + e.code) });
}]);

angular.module('arvak.controllers').controller('HackerNewsCtrl', ['$scope', '$rootscope', 'notification', function($scope, $rootScope, notification) {

    // load in data from hacker news unless we already have
    if (!$rootScope.items) {     

        jx.load('http://api.ihackernews.com/page',function(data){
            console.log(JSON.stringify(data));
            $rootScope.items = data.items;
            $scope.$apply();
        },'json');

    } else {
        console.log('data already loaded');
    }

    $scope.loadItem = function(item) {
        notification.alert(item.url,function() {console.log("Alert success")},"My Alert","Close");
    };
}]);


angular.module('arvak.controllers').controller('ContactsCtrl',['$scope', 'contactsSvc', function($scope, contactsSvc) {
    //Not properly integrated with service

    $scope.find = function() {
        $scope.contacts = [];
        var options = new ContactFindOptions();
        //options.filter=""; //returns all results
        options.filter=$scope.searchTxt;
        options.multiple=true;
        var fields = ["displayName", "name", "phoneNumbers"];
        contactsSvc.findContacts(fields,function(contacts) {
            $scope.contacts=contacts;
           
        },function(e){console.log("Error finding contacts " + e.code)},options);
    }
}]);

angular.module('arvak.controllers').controller('CameraCtrl', ['$scope', 'camera', function($scope, camera) {
    $scope.takePic = function() {
        var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        // Take picture using device camera and retrieve image as base64-encoded string
        camera.getPicture(onSuccess,onFail,options);
    }
    var onSuccess = function(imageData) {
        console.log("On Success! ");
        $scope.picData = "data:image/jpeg;base64," +imageData;
        //$scope.$apply();
    };
    var onFail = function(e) {
        console.log("On fail " + e);
    };
}]);



                     
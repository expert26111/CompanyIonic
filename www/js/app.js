// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }).factory('Camera', ['$q', function ($q) {

  return {
    getPicture: function (options) {
      var q = $q.defer();

      navigator.camera.getPicture(function (result) {
        // Do any magic you need
        q.resolve(result);
      }, function (err) {

        q.reject(err);
      }, options);

      return q.promise;
    },
  };
}]).controller('Controller', ['$scope', '$http', '$state', function ($scope, $http, $state, Camera, $cordovaCamera) {
  $http.get('js/data.json').success(function (data) {
    $scope.artists = data.artists;

    $scope.whichartist = $state.params.aId;

    // $scope.takeImage = function () {
    //
    //   $cordovaCamera.getPicture({})
    //       .then(function (data) {
    //         console.log('camera data: ' + angular.toJson(data));
    //       }, function (error) {
    //         console.log('camera data: ' + angular.toJson(data));
    //       });
    //
    //   };

    $scope.getPhoto = function () {
      Camera.getPicture().then(function (imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
      }, function (err) {

        console.err(err);
      }, {

        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false,
      });
    };

    $scope.onTouch = function () {
        console.log('I touched you');
    };

//$scope.takeImage = function () {
//
//   if (typeof  $cordovaCamera  == 'undefined') {
//
//     console.log('Camera not found');
//
//   } else {
//
//
//     var options = {
//       quality: 80,
//       destinationType: Camera.DestinationType.DATA_URL,
//       sourceType: Camera.PictureSourceType.CAMERA,
//       allowEdit: true,
//       encodingType: Camera.EncodingType.JPEG,
//       targetWidth: 250,
//       targetHeight: 250,
//       popoverOptions: CameraPopoverOptions,
//       saveToPhotoAlbum: false,
//     };
//
//     console.log('Inside function taking pictures!!!');
//
//     $cordovaCamera.getPicture(options).then(function (imageData) {
//       $scope.srcImage = 'data:image/jpeg;base64,' + imageData;
//     }, function (err) {
//       // error
//     });
//   }
});

}]).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('stream', {
      url: '/stream',
      abstract: true,
      templateUrl: 'templates/stream.html',
      controller: 'Controller',
    })
    .state('stream.person', {
      url: '/person',
      views: {
        'person-stream': {
          templateUrl: 'templates/person.html',
          controller: 'Controller',
        },
      },
    }).state('stream.bell', {
    url: '/bell',
    views: {
      'bell-stream': {
        templateUrl: 'templates/bell.html',
        controller: 'Controller',
      },
    },
  }).state('stream.default', {
    url: '/default',
    views: {
      'default-stream': {
        templateUrl: 'templates/default.html',
        controller: 'Controller',
      },
    },
  });
  $urlRouterProvider.otherwise('/stream/default');
});


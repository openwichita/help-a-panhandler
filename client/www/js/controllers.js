angular.module('panhandlerHelp.controllers', [])

.controller('MainCtrl', function($scope, $http, $cordovaGeolocation) {

  $scope.recordLocation = () => {
    $cordovaGeolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((position) => {
      $http.post('http://localhost:3927/reports', {
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }).success(() => {
        document.write('Did it!');
      }).error((err) => {
        console.log(err);
      });
    }).catch((err) => {
    });
  };

  function getLocation() {
  }

})

.controller('AboutCtrl', function($scope) {});

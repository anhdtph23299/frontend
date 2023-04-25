window.detailController = function ($scope, $http, $location) {
  var url = $location.absUrl().split("/");
  var id = url[url.length - 1];
  $http.get(sanPhamAPI + "/" + id).then(function (response) {
    $scope.spDetail = response.data;
    if ($scope.spDetail.soLuong < 1) {
      $scope.soLuong = 0;
    } else {
      $scope.soLuong = 1;
    }
  });
  $http.get(sanPhamAPI).then(function (response) {
    $scope.spTuongTu = response.data;
  });
};

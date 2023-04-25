window.loaiController = function ($scope, $http) {
  $scope.viTri = -1;
  var api = loaiSanPhamAPI;
  $http.get(api).then(function (response) {
    $scope.loai = response.data;
  });
  $scope.getLoai = {
    id: "",
    name: "",
  };

  $scope.addLoai = function (event) {
    event.preventDefault();
    $http.post(api, $scope.getLoai).then(
      function (response) {},
      function (error) {
        alert("Trùng ID");
      }
    );
  };
  $scope.detailLoai = function (event, index) {
    event.preventDefault();
    var loai = $scope.loai[index];
    var url = api + "/" + loai.id;
    $http.get(url).then(function (response) {
      $scope.getLoai = response.data;
    });
    $scope.viTri = index;
  };
  $scope.deleteLoai = function (event, index) {
    event.preventDefault();
    var loai = $scope.loai[index];
    var url = api + "/" + loai.id;
    $http.delete(url).then(function (response) {});
  };
  $scope.updateLoai = function (event) {
    event.preventDefault();
    var loai = $scope.loai[$scope.viTri];
    var url = api + "/" + loai.id;
    $http.put(url, $scope.getLoai).then(function (response) {});
  };
};

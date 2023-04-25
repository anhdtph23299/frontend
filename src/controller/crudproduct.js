window.crudProduct = function ($scope, $http, $location) {
  $scope.viTri = -1;
  var api = sanPhamAPI;
  $http.get(api).then(function (response) {
    $scope.sanPham = response.data;
  });

  $scope.product = {
    id: "",
    tenSanPham: "",
    giaTien: 0,
    soLuong: 0,
    loai: "",
    moTa: "",
    anh: "",
  };
  //
  $scope.onFileSelect = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (event) {
        $scope.$apply(function () {
          $scope.product.anh = event.target.result;
        });
      };
    }
  };
  //
  $http.get(loaiSanPhamAPI).then(function (response) {
    $scope.loai = response.data;
    $scope.product.loai = $scope.loai[0];
  });
  $scope.onFileSelect = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.product.anh = e.target.result;
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  $scope.addProduct = function (event) {
    event.preventDefault();
    console.log($scope.product);
    $http.post(api, $scope.product).then(
      function (response) {
        $scope.sanPham.push(response.data);
        alert("Thêm thành công");
      },
      function (error) {
        alert("Trùng ID hoặc ảnh quá lớn");
      }
    );
  };
  $scope.detailProduct = function (event, index) {
    event.preventDefault();
    var sp = $scope.sanPham[index];
    var url = api + "/" + sp.id;
    $http.get(url).then(function (response) {
      $scope.sp = response.data;
    });
    $scope.viTri = index;
  };
  $scope.ctProduct = function (event, index) {
    event.preventDefault();
    var sp = $scope.sanPham[index];
    var url = api + "/" + sp.id;
    $http.get(url).then(function (response) {
      $scope.product = response.data;
    });
    $scope.viTri = index;
  };

  $scope.deleteProduct = function (event, index) {
    // event.preventDefault();
    var sp = $scope.sanPham[index];
    var url = api + "/" + sp.id;
    $http.delete(url).then(function (response) {
      $scope.sanPham.splice(index, 1);
      alert("Xoá thành công");
    });
  };
  $scope.updateProduct = function (event) {
    event.preventDefault();
    var sp = $scope.sanPham[$scope.viTri];
    var url = api + "/" + sp.id;
    $http.put(url, $scope.product).then(function (response) {
      $scope.sanPham[$scope.viTri] = response.data;
      alert("Sửa thành công");
    });
  };
};

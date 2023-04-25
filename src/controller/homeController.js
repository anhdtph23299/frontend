window.homeController = function ($scope, $http, $rootScope) {
  $scope.gh = {
    maNguoiDung: $rootScope.taiKhoan.id,
    maSanPham: "",
    soLuong: 1,
    id: "",
  };
  $scope.sanPhamNguoiDung = [];
  $http.get(sanPhamAPI).then(function (response) {
    $scope.spBanChay = response.data.slice(0, 8);
  });
  $http.get(sanPhamAPI).then(function (response) {
    $scope.getAll = response.data;
  });
  $scope.tongTien = 0;
  var getProductByID = function (id, soLuong) {
    var url = sanPhamAPI + "/" + id;
    $http.get(url).then(function (response) {
      $scope.sanPhamNguoiDung.push(response.data);
      console.log(Number(response.data.giaTien) * Number(soLuong));
      $scope.tongTien =
        $scope.tongTien + Number(response.data.giaTien) * Number(soLuong);
    });
  };
  $http.get(loaiSanPhamAPI).then(function (response) {
    $scope.loaiSanPham = response.data;
  });
  $scope.fil = "";
  $scope.locSP = function (name) {
    $scope.fil = name;
  };
  $scope.detailProductbc = function (event, index) {
    event.preventDefault();
    $scope.spDetail = $scope.spBanChay[index];
  };
  $scope.detailProductmn = function (event, index) {
    event.preventDefault();
    $scope.spDetail = $scope.spBanChay[index];
  };
  $scope.clickGioHang = function () {
    $http.get(gioHangAPI).then(function (response) {
      $scope.gioHang = response.data;
      for (let index = 0; index < $scope.gioHang.length; index++) {
        if ($scope.gioHang[index].maNguoiDung == $rootScope.taiKhoan.id) {
          var id = $scope.gioHang[index].maSanPham;
          var soLuongMua = $scope.gioHang[index].soLuongMua;
          // console.log(getProductByID(id));
          getProductByID(id, soLuongMua);
        }
      }
    });
    $rootScope.soLuongGioHang = $scope.sanPhamNguoiDung.soLuongMua;
  };
  $scope.clickGioHang();
  $scope.themVaoGio = function (event, index) {
    event.preventDefault();
    $scope.gh.maSanPham = $scope.getAll[index].id;
    $http.post(gioHangAPI, $scope.gh).then(function (response) {
      $scope.gioHang.push(response.data);
    });
  };
};

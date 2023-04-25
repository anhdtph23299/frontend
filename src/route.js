var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/dangnhap", {
      templateUrl: "./pages/login.html",
      controller: loginController,
    })
    .when("/", {
      templateUrl: "./pages/trangchu.html",
      controller: homeController,
    })
    .when("/gioiThieu", {
      templateUrl: "./pages/gioiThieu.html",
      // controller: gioiThieuController,
    })
    .when("/damua", {
      templateUrl: "./pages/damua.html",
      controller: homeController,
    })
    .when("/tintuc", {
      templateUrl: "./pages/tintuc.html",
      // controller: lienheController,
    })
    .when("/loai", {
      templateUrl: "./pages/loai.html",
      controller: loaiController,
    })

    .when("/dangky", {
      templateUrl: "./pages/dangky.html",
      controller: loginController,
    })
    .when("/quenmatkhau", {
      templateUrl: "./pages/quenmatkhau.html",
    })
    .when("/admin", {
      templateUrl: "./pages/formadmin.html",
    })
    .when("/doimatkhau", {
      templateUrl: "./pages/doimatkhau.html",
      controller: loginController,
    })
    .when("/sanpham", {
      templateUrl: "./pages/sanpham.html",
      controller: homeController,
    })
    .when("/cart", {
      templateUrl: "./pages/giohang.html",
      controller: homeController,
    })
    .when("/crudproduct", {
      templateUrl: "./pages/crudproduct.html",
      controller: crudProduct,
    })
    .when("/detail/product/:id", {
      templateUrl: "./pages/detailProduct.html",
      controller: detailController,
    })
    .otherwise({
      redirectTo: "/dangnhap",
    });
});
app.controller("headerController", function ($scope, $rootScope) {
  $scope.soLuongGioHang = $rootScope.soLuongGioHang;
});
app.run(function ($rootScope, $window) {
  // $window.onpopstate = function (event) {
  // };
  $rootScope.taiKhoan = {
    role: false,
    email: "",
    soDienThoai: "",
    ten: "",
    ngaySinh: "",
    password: "",
    diaChi: "",
    id: "",
  };
  $rootScope.soLuongGiohang = 0;
  $rootScope.index = -1;
});

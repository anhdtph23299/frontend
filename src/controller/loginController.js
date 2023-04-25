window.loginController = function ($scope, $http, $location, $rootScope) {
  $http.get(nguoiDungAPI).then(function (response) {
    $scope.nguoiDung = response.data;
  });
  $scope.user = {
    taikhoan: "",
    password: "",
  };
  $scope.mk = {
    matKhauCu: "",
    matKhauMoi: "",
    matKhauXacNhan: "",
  };
  $scope.form = {
    role: false,
    email: "",
    soDienThoai: "",
    ten: "",
    ngaySinh: "",
    password: "",
    diaChi: "",
    id: "",
  };

  $scope.doiMatKhau = function () {
    console.log($rootScope.index);
    if ($rootScope.taiKhoan.password !== $scope.mk.matKhauCu) {
      alert("Bạn nhập sai mật khẩu");
    } else {
      if ($scope.mk.matKhauMoi == $scope.mk.matKhauXacNhan) {
        $scope.nguoiDung[$rootScope.index].password = $scope.mk.matKhauMoi;
        $http
          .put(
            nguoiDungAPI + "/" + $scope.nguoiDung[$rootScope.index].id,
            $scope.nguoiDung[$rootScope.index]
          )
          .then(function (response) {
            $scope.nguoiDung[$scope.index] = response.data;
          });
      }
      alert("Bạn đổi mật khẩu thành công");
      $location.path("/");
    }
  };

  $scope.login = function () {
    for (var i = 0; i < $scope.nguoiDung.length; i++) {
      if (
        $scope.nguoiDung[i].email === $scope.user.taikhoan &&
        $scope.nguoiDung[i].password === $scope.user.password
      ) {
        $rootScope.taiKhoan = $scope.nguoiDung[i];
        $rootScope.index = i;
        alert("Đăng nhập thành công");
        $location.path("/");
        return;
      }
    }
    alert("Sai tài khoản hoặc mật khẩu");
  };
  $scope.dangKy = function () {
    var x = $scope.form;
    if (
      x.email.length == 0 ||
      x.soDienThoai.length == 0 ||
      x.ngaySinh == "" ||
      x.ten.length == 0 ||
      x.password.length == 0 ||
      x.diaChi.length == 0
    ) {
      alert("Bạn phải nhập đủ thông tin");
      return;
    }
    let regex_sdt = /^(0|\+84)[1-9][0-9]{8,9}$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ($scope.form.email.match(mailformat)) {
      alert("Sai định dạng email");
      return;
    }
    if (!regex_sdt.test($scope.form.soDienThoai)) {
      alert("Sai định dạng email");
      return;
    }
    $http.post(nguoiDungAPI, $scope.form).then(function (response) {
      alert("Đăng ký thành công");
      $scope.nguoiDung.push(response.data);
    });
  };
};

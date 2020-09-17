var NguoiDungService = new nguoiDungService();
renderListUser();


function renderListUser() {
    NguoiDungService
        .getListUserService()
        .then(function(result) {
            //Lời hứa thực hiện được (resolve)
            renderTable(result.data);
        })
        .catch(function(error) {
            //Lời hứa bị thất hứa (reject)
            console.log(error);
        });
    // renderTable(NguoiDungService.arr);

}
/**
 * Tạo bảng 
 */
function renderTable(arr) {
    var contentHTML = "";
    arr.forEach(function(item, index) {
        contentHTML += `
            <tr>
                <td>${index++}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.hoTen}</td>
                <td>${item.matKhau}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>${item.maLoaiNguoiDung}</td>
                <td>
                    <button class ="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editUser(${item.id})">Edit</button>
                    <button class = "btn btn-danger" onclick="deleteUser(${item.id})">Delete</button>
                </td>
            </tr>
        `
    });
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}
/**
 * Thêm Người Dùng
 */
getEle("btnThemNguoiDung").addEventListener("click", function() {
    var footer = `
        <button class="btn btn-success" onclick="addUser()">Add User</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = "Add User";
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});
/**
 * Edit User
 */
function addUser() {
    /**
     * Lấy value từ các ô input
     */
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var NguoiDung = new nguoiDung("",
        taiKhoan,
        hoTen,
        matKhau,
        email,
        soDT,
        loaiNguoiDung
    );
    NguoiDungService.addUserService(NguoiDung)
        .then(function(result) {
            alert("add success");
            renderListUser();
            document.querySelector(".close").click();
        })
        .catch(function(err) {
            console.log(err);
        })
    console.log(NguoiDung);
}

function editUser(id) {
    var footer = `
    <button id="btnUpdateUser" class="btn btn-success" onclick="updateUser(${id})">Update User</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = "Update User";
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    NguoiDungService
        .getUserById(id)
        .then(function(result) {
            console.log(result.data);
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("SoDienThoai").value = result.data.soDT;
            getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        })
        .catch(function(err) {
            console.log(err);
        });
}


/**
 * Delete User
 */
function deleteUser(id) {
    console.log(id);
    NguoiDungService.deleteUserService(id)
        .then(function(result) {
            console.log(result);
            alert("Xóa Thành Công !");
            renderListUser();
        })
        .catch(function(err) {
            console.log(err);
        });
}
/**
 * Update User
 */
function updateUser(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var NguoiDung = new nguoiDung(id,
        taiKhoan,
        hoTen,
        matKhau,
        email,
        soDT,
        loaiNguoiDung
    );
    NguoiDungService.updateUserService(NguoiDung)
        .then(function(result) {
            console.log(result.data);
            alert("Update Thành Công !");
            renderListUser();
            document.querySelector(".close").click();
        })
        .catch(function(err) {
            console.log(err);
        });
}

function getEle(id) {
    return document.getElementById(id);
}
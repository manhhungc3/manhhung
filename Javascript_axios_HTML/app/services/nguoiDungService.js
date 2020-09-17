function nguoiDungService() {
    this.arr = [];
    this.getListUserService = function() {
        /**
         * axios trả về promises (lời hứa)
         *  - Thời gian thực hiện lời hứa (pending)
         *  - Lời hứa thực hiện được (resolve)
         *  - Lời hứa bị thất hứa (reject)
         */
        return axios({
            url: "https://5f5c7a255e3a4d001624940f.mockapi.io/api/NguoiDung",
            method: "GET",
        });
    };

    this.deleteUserService = function(id) {
        return axios({
            url: `https://5f5c7a255e3a4d001624940f.mockapi.io/api/NguoiDung/${id}`,
            method: "DELETE",
        });
    };
    this.addUserService = function(user) {
        return axios({
            url: "https://5f5c7a255e3a4d001624940f.mockapi.io/api/NguoiDung",
            method: "POST",
            data: user,
        });
    };

    this.getUserById = function(id) {
        return axios({
            url: `https://5f5c7a255e3a4d001624940f.mockapi.io/api/NguoiDung/${id}`,
            method: "GET",
        });
    };
    this.updateUserService = function(user) {
        return axios({
            url: `https://5f5c7a255e3a4d001624940f.mockapi.io/api/NguoiDung/${user.id}`,
            method: "PUT",
            data: user,
        });
    };
}
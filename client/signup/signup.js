// alert("noi dung muon thong bao")
document.getElementById("btnSignUp").addEventListener('click', function () {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let retypepassword = document.getElementById("retypepassword").value;

    if (username.length < 6) {
        alert("Tên phải chứa tối đa 6 ký tự")
        return
    }

    if (!email.includes("@")) {
        alert("Sai định dạng email!");
        return;
    }
    if (password.length < 6) {
        alert("Mật khẩu phải chứa tối thiểu 6 kí tự!");
        return;
    }
    if (retypepassword == password) {
        if (!localStorage.getItem('users')) {
        localStorage.setItem('users', '[]');
        }
        let users = JSON.parse(localStorage.getItem('users'));
        users.push({
            email: email,
            username: username,
            password: password,
            retypepassword: retypepassword
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        alert("Đăng ký tài khoản thành công!")
        window.location.href = '../login/index.html'
    } else {
        alert("Mật khẩu không khớp!")
    }
});


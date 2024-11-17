// alert("noi dung muon thong bao")
document.getElementById("btnSignUp").addEventListener('click', function () {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let retypepassword = document.getElementById("retypepassword").value;

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
        window.location.href = '../login/login.html'
    } else {
        alert("Mật khẩu không khớp!")
    }

    
});


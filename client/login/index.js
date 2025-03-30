document.getElementById("btnLogin").addEventListener('click', function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!localStorage.getItem('users')) {
        alert("Đăng nhập thất bại!")
    } 
    let users = JSON.parse(localStorage.getItem('users'));
    let dem = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            alert("Đăng nhập thành công!");
            window.location.href = '../home/home.html'; 
        } else {
            dem = dem + 1;
        }
    }
    if (dem == users.length) {
        alert("Đăng nhập thất bại!")
    }
});

document.getElementById("home").addEventListener('click', function() {
    alert('Hãy đăng nhập để về trang chủ!')
});
document.getElementById("contact").addEventListener('click', function() {
    alert('Hãy đăng nhập để liên hệ!')
});
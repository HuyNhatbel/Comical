import { handleSignIn } from '../../firebase-config.js';

document.getElementById("btnLogin").addEventListener('click', async function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const user = await handleSignIn(email, password);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        if (user.permission === 'admin') {
            alert("Đăng nhập thành công!");
            window.location.href = '../../admin/dashboard/';
        } else {
            alert("Đăng nhập thành công!");
            window.location.href = '../home/home.html';
        }
    } else {
        alert("Đăng nhập thất bại!");
    }
    
});

document.getElementById("home").addEventListener('click', function() {
    alert('Hãy đăng nhập để về trang chủ!')
});
document.getElementById("contact").addEventListener('click', function() {
    alert('Hãy đăng nhập để liên hệ!')
});
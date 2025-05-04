const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '../../client/login/index.html';
    });
}

const user = JSON.parse(localStorage.getItem('user'));
const auth = ["login", "signup"];
const client = ["home", "aboutus", "contact", "demo", "demo2", "word"];
const index = window.location.pathname.split('/')[2];
console.log(index);

if (user && auth.includes(index)) {
    if (user.permission === 'admin') {
        window.location.href = '../../admin/dashboard/index.html';
    } else {
        window.location.href = '../../client/home/home.html';
    }
} else if (!user && client.includes(index)) {
    window.location.href = '../../client/login/index.html';
}



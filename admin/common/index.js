const logout = document.getElementById('logout');

logout.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = '../../client/login/index.html';
});

const userName = document.getElementById('user-name');
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    userName.textContent = user.fullName;
} else {
    window.location.href = '../../client/login/index.html';
}
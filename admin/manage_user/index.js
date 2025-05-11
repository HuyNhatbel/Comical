import { addUserToFirestore, getUsersFromFirestore, updateUserToFirestore } from '../../firebase-config.js';

// Khởi tạo DataTable
$(document).ready(async function () {
    const users = await getUsersFromFirestore();
    console.log("users", users);

    $('#userTable').DataTable({
        data: users,
        columns: [
            {
                data: null,
                render: function () {
                    return `
                    <div class="avatar-container">
                        <img src="../../Images/avatar.png" class="avatar" alt="Avatar">
                        <span class="status-dot"></span>
                    </div>
            `;
                },
                orderable: false
            },
            { data: "fullName" },
            { data: "email" },
            { data: "createdAt",
                render: function (data) {
                    return new Date(data.seconds * 1000).toLocaleString();
                }
             },
            {
                data: "permission",
                render: function (data) {
                    let badgeClass = '';
                    if (data === "Admin") {
                        badgeClass = "permission-admin";
                    } else if (data === "Contributor") {
                        badgeClass = "permission-contributor";
                    } else if (data === "Viewer") {
                        badgeClass = "permission-viewer";
                    }
                    return `<span class="permission-badge ${badgeClass}">${data}</span>`;
                }
            },
            {
                data: null,
                render: function (data) {
                    return `<button type="button" class="btn btn-primary open-update-modal" data-bs-toggle="modal" data-bs-target="#updateModal"
                    data-id="${data.id}"
                    data-fullname="${data.fullName}"
                    data-email="${data.email}"
                    data-day-joined="${data.createdAt}"
                    data-permission="${data.permission}"
                    >Edit</button>`;
                },
                orderable: false
            }
        ],
        pageLength: 10,
        language: {
            search: "",
            searchPlaceholder: "Search items..."
        }
    });

    $('#searchInput').on('keyup', function () {
        $('#userTable').DataTable().search(this.value).draw();
    });
    $(document).on('click', '.open-update-modal', function () {
        const id = $(this).data('id');
        const fullName = $(this).data('fullname');
        const email = $(this).data('email');
        const dayJoined = $(this).data('day-joined');
        const permission = $(this).data('permission');
        $('#update-id').val(id);
        $('#fullname-update').val(fullName);
        $('#email-update').val(email);
        $('#day-joined-update').val(dayJoined);
        $('#permission-update').val(permission);
    });
});

const btnCreate = document.getElementById('create');
btnCreate.addEventListener('click', async () => {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const permission = document.getElementById('permission').value;
    const password = document.getElementById('password').value;
    const user = await addUserToFirestore({
        fullName,
        email: `${email}@gmail.com`,
        permission,
        password
    });
    alert('Tạo tài khoản thành công!');
    window.location.reload();
});

$('#updateModal').on('show.bs.modal', function (e) {
    const user = e;
    console.log(user);
});

const btnUpdate = document.getElementById('update-btn');
btnUpdate.addEventListener('click', async () => {
    const id = document.getElementById('update-id').value;
    const fullName = document.getElementById('fullname-update').value;
    const email = document.getElementById('email-update').value;
    const permission = document.getElementById('permission-update').value;
    const user = await updateUserToFirestore(id, {
        fullName,
        email: `${email}@gmail.com`,
        permission
    });
    alert('Cập nhật thành công!');
    window.location.reload();
});
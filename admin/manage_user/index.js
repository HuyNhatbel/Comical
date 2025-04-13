import { addUserToFirestore, getUsersFromFirestore } from '../../firebase-config.js';

// Khởi tạo DataTable
$(document).ready(async function () {
    const users = await getUsersFromFirestore();
    $('#userTable').DataTable({
        data: users,
        columns: [
            {
                data: null,
                render: function () {
                    return `
                <div class="avatar-container">
                    <img src="https://via.placeholder.com/30" class="avatar" alt="Avatar">
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
                render: function () {
                    return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">Edit</button>`;
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

    // Di chuyển ô tìm kiếm vào vị trí mong muốn
    $('#searchInput').on('keyup', function () {
        $('#userTable').DataTable().search(this.value).draw();
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
});

$('#updateModal').on('show.bs.modal', function (e) {
    const user = e;
    console.log(user);
});
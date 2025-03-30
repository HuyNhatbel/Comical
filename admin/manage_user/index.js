const userData = [
    { fullName: "Leslie Maya", email: "leslie@gmail.com", location: "Los Angeles, CA", joined: "October 2, 2010", permission: "Admin" },
    { fullName: "Josie Deck", email: "josie@gmail.com", location: "Cheyenne, WY", joined: "October 3, 2011", permission: "Admin" },
    { fullName: "Alex Pfeiffer", email: "alex@gmail.com", location: "Cheyenne, WY", joined: "May 20, 2015", permission: "Admin" },
    { fullName: "Mike Dean", email: "mike@gmail.com", location: "Syracuse, NY", joined: "July 14, 2015", permission: "Contributor" },
    { fullName: "Mateus Cunha", email: "cunha@gmail.com", location: "Luanda, AN", joined: "October, 2016", permission: "Contributor" },
    { fullName: "Nzola Uemo", email: "nzola@gmail.com", location: "Lagos, NG", joined: "June 5, 2016", permission: "Viewer" },
    { fullName: "Antony Mack", email: "mack@gmail.com", location: "London, ENG", joined: "June 15, 2015", permission: "Contributor" },
    { fullName: "André da Silva", email: "andre@gmail.com", location: "São Paulo, BR", joined: "March 13, 2018", permission: "Contributor" },
    { fullName: "Jorge Ferreira", email: "jorge@gmail.com", location: "Huambo, Angola", joined: "March 14, 2018", permission: "Contributor" }
];

// Khởi tạo DataTable
$(document).ready(function () {
    $('#userTable').DataTable({
        data: userData,
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
            {
                data: "location",
                render: function (data) {
                    return `<span class="me-2">📍</span>${data}`;
                }
            },
            { data: "joined" },
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
                    return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">...</button>`;
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
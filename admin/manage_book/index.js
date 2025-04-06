const userData = [
    { title: "Năm Thứ Hai Sau Khi Kết Hôn", chapters: "86", image: "../../Images/nam-thu-hai.jpg", content: "Em có thể ly hôn với anh được không?” Hạ Vy bình tĩnh nói, đôi mắt trong trẻo không hề gợn sóng nhìn Trần Hạo.</h4> <h4>Trần Hạo sững sờ nhìn người phụ nữ trước mặt, không thể tin được những gì mình vừa nghe.</h4> <h4>Hạ Vy là vợ của anh suốt hai năm qua. Cô luôn dịu dàng, chăm sóc anh từng chút một, nhưng chưa bao giờ anh nghĩ rằng cô lại nói ra lời này.</h4> <h4>“Tại sao?” Trần Hạo nghẹn giọng hỏi, đôi mắt ánh lên sự hoảng loạn.</h4> <h4>Hạ Vy mỉm cười, nụ cười ấy dịu dàng nhưng lại mang theo một chút cay đắng: “Chúng ta không hợp nhau. Anh biết điều đó mà, đúng không?”</h4> <h4>Trần Hạo siết chặt bàn tay, sự đau đớn hiện rõ trên gương mặt: “Hạ Vy, em không thể rời đi. Anh cần em, anh không thể sống thiếu em…”</h4> <h4>Hạ Vy ngẩng đầu nhìn người đàn ông mà cô từng yêu sâu đậm, nhưng giờ đây tình cảm ấy chỉ còn là một mảnh ký ức.</h4> <h4>Cô bước tới, nhẹ nhàng đặt bàn tay lên vai anh: “Hạo, anh sẽ sống tốt mà. Em cũng vậy. Chúng ta hãy buông tay để bắt đầu lại từ đầu, được không?"
}];

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
            { data: "title" },
            { data: "chapters" },
            {
                data: "image",
                render: function (data) {
                    return `<span class="me-2">📍</span>${data}`;
                }
            },
            { data: "content" },
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
import { addBookToFirestore, getBooksFromFirestore, updateBookToFirestore } from '../../firebase-config.js';

const userData = [
    { title: "Năm Thứ Hai Sau Khi Kết Hôn", chapters: "86", image: "https://www.bgastore.ie/resource/u3NL/n5I/p4tYBuR12el/Posters/Bokstavs-posters/Poster_O.jpg", content: "Em có thể ly hôn với anh được không?” Hạ Vy bình tĩnh nói, đôi mắt trong trẻo không hề gợn sóng nhìn Trần Hạo.</h4> <h4>Trần Hạo sững sờ nhìn người phụ nữ trước mặt, không thể tin được những gì mình vừa nghe.</h4> <h4>Hạ Vy là vợ của anh suốt hai năm qua. Cô luôn dịu dàng, chăm sóc anh từng chút một, nhưng chưa bao giờ anh nghĩ rằng cô lại nói ra lời này.</h4> <h4>“Tại sao?” Trần Hạo nghẹn giọng hỏi, đôi mắt ánh lên sự hoảng loạn.</h4> <h4>Hạ Vy mỉm cười, nụ cười ấy dịu dàng nhưng lại mang theo một chút cay đắng: “Chúng ta không hợp nhau. Anh biết điều đó mà, đúng không?”</h4> <h4>Trần Hạo siết chặt bàn tay, sự đau đớn hiện rõ trên gương mặt: “Hạ Vy, em không thể rời đi. Anh cần em, anh không thể sống thiếu em…”</h4> <h4>Hạ Vy ngẩng đầu nhìn người đàn ông mà cô từng yêu sâu đậm, nhưng giờ đây tình cảm ấy chỉ còn là một mảnh ký ức.</h4> <h4>Cô bước tới, nhẹ nhàng đặt bàn tay lên vai anh: “Hạo, anh sẽ sống tốt mà. Em cũng vậy. Chúng ta hãy buông tay để bắt đầu lại từ đầu, được không?"
}];

// Khởi tạo DataTable
$(document).ready(async function () {
    const books = await getBooksFromFirestore();
    console.log(books);
    $('#userTable').DataTable({
        data: books,
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
                    return `<img src="${data}" class="img-container"/>`;
                }
            },
            { data: "content",
                render: function (data) {
                    return `<div class="content-text">${data}</div>`
                }
            },
            {
                data: null,
                render: function (data) {
                    return `<button type="button" class="btn btn-primary open-update-modal" data-bs-toggle="modal" data-bs-target="#updateModal"
                    data-id="${data.id}"
                    data-title="${data.title}"
                    data-chapters="${data.chapters}"
                    data-image="${data.image}"
                    data-content="${data.content}"
                    >...</button>`;
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
    $(document).on('click', '.open-update-modal', function () {
        const title = $(this).data('title');
        const chapters = $(this).data('chapters');
        const image = $(this).data('image');
        const content = $(this).data('content');
        const updateId = $(this).data('id');
        $('#update-id').val(updateId);
        $('#update-title').val(title);
        $('#update-chapters').val(chapters);
        $('#update-image').val(image);
        $('#update-content').val(content);
    });
});


const btnCreate = document.getElementById('create');
btnCreate.addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const chapters = document.getElementById('chapters').value;
    const image = document.getElementById('image').value;
    const content = document.getElementById('content').value;
    // const imageUrl = await uploadFile(image);
    const book = await addBookToFirestore({
        title,
        chapters,
        // image: imageUrl,
        content
    });
});

const btnUpdate = document.getElementById('update-btn');
btnUpdate.addEventListener('click', async () => {
    const id = document.getElementById('update-id').value;
    const title = document.getElementById('update-title').value;
    const chapters = document.getElementById('update-chapters').value;
    // const image = document.getElementById('update-image').src || null;
    const content = document.getElementById('update-content').value;
    await updateBookToFirestore(id, {
        title,
        chapters,
        // image,
        content
    });
});

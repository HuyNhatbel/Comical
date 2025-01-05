const fs = require('fs');

document.getElementById("btnFeedback").addEventListener('click', function() {
    let email = document.getElementById("email").value;
    let feedback = document.getElementById("feedback").value;
    
    if (feedback.length > 200) {
        alert("Ý kiến không được chứa quá 200 ký tự")
    }

    if (feedback.length < 3) {
        alert("Ý kiến không được dưới 3 ký tự")
    }
    if (!email.includes("@")) {
        alert("Sai định dạng email!");
        return;
    }
    localStorage.setItem('feedback', '[]');
    let users = JSON.parse(localStorage.getItem('feedback'));
        users.push({
            email: email,
            feedback: feedback,
        });
        
        localStorage.setItem('feedback', JSON.stringify(feedback));
        alert("Gửi thành công!")
        const filePath = 'feedback.txt';

        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log(`File '${filePath}' has been updated.`);
            }
        });
});
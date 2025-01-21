// script.js
window.onload = function () {
    // عرض شاشة التحميل
    const loadingScreen = document.getElementById("loadingScreen");
    const mainContent = document.getElementById("mainContent");

    // إخفاء شاشة التحميل بعد 3 ثوانٍ
    setTimeout(function () {
        loadingScreen.style.display = "none"; // إخفاء شاشة التحميل
        mainContent.style.display = "block"; // عرض المحتوى الرئيسي
    }, 3000); // 3000 مللي ثانية = 3 ثوانٍ

    // عرض بيانات الطلاب
    renderStudents();
};

// باقي الكود الخاص بعرض البيانات وإرسال الدرجات
const students = [
    {
        name: "أحمد محمد",
        grades: {
            islamic: 90,
            arabic: 95,
            english: 88,
            math: 92,
            science: 85,
            national: 87
        },
        parentPhone: "9647701259663" // رقم عراقي
    }
];

const tableBody = document.querySelector("#studentsTable tbody");
const messageElement = document.getElementById("message");

// عرض بيانات الطلاب في الجدول
function renderStudents() {
    tableBody.innerHTML = ""; // مسح المحتوى القديم
    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grades.arabic}</td>
            <td>${student.grades.english}</td>
            <td>${student.grades.math}</td>
            <td>${student.grades.science}</td>
            <td>${student.grades.islamic}</td>
            <td>${student.grades.national}</td>
            <td>${student.parentPhone}</td>
            <td><button onclick="sendGrades(${index})">إرسال الدرجات</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// إرسال الدرجات عبر واتساب
function sendGrades(index) {
    const student = students[index];
    const messageText = `
        درجات الطالب ${student.name}:
        - التربية الإسلامية: ${student.grades.islamic}
        - اللغة العربية: ${student.grades.arabic}
        - اللغة الإنجليزية: ${student.grades.english}
        - الرياضيات: ${student.grades.math}
        - العلوم: ${student.grades.science}
        - التربية الوطنية: ${student.grades.national}
                 مع تحيات مدير المدرسه 
    `;

    const whatsappLink = `https://wa.me/${student.parentPhone}?text=${encodeURIComponent(messageText)}`;

    // التحقق من صحة رقم الهاتف
    if (!student.parentPhone.startsWith('964') || student.parentPhone.length !== 13) {
        messageElement.textContent = `رقم الهاتف غير صالح: ${student.parentPhone}. يرجى إدخال رقم عراقي يبدأ بـ 964 ويتكون من 13 رقمًا.`;
        return;
    }

    // فتح الرابط في نافذة جديدة
    window.open(whatsappLink, "_blank");

}
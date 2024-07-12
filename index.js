document.addEventListener("DOMContentLoaded", (event) => {
  loadStudents();
});

function addStudent() {
  let name = document.getElementById("studentName").value;
  let id = document.getElementById("studentID").value;
  let email = document.getElementById("emailID").value;
  let contact = document.getElementById("contactNo").value;

  if (!name || !id || !email || !contact) {
    alert("All fields are required!");
    return;
  }

  let students = JSON.parse(localStorage.getItem("students")) || [];

  students.push({ name, id, email, contact });
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();

  document.getElementById("student-form").reset();
}

function loadStudents() {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  let studentList = document.getElementById("students");
  studentList.innerHTML = "";

  students.forEach((student, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
               <td >
                 <i class="fa-solid fa-pen-to-square" style="color: rgb(0, 120, 0); " onClick="editStudent('${i}')">
                 </i> <i class="fa-solid fa-trash" style="color: red;" onclick="deleteStudent('${i}')"></i>
                 </td>`;
    studentList.appendChild(row);
  });
}

function editStudent(i) {
  let students = JSON.parse(localStorage.getItem("students"));
  let student = students[i];

  document.getElementById("studentName").value = student.name;
  document.getElementById("studentID").value = student.id;
  document.getElementById("emailID").value = student.email;
  document.getElementById("contactNo").value = student.contact;

  deleteStudent(i);
}

function deleteStudent(i) {
  let students = JSON.parse(localStorage.getItem("students"));
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
}

// gsap animation
function Animation() {
  var timeline = gsap.timeline();

  gsap.from("header h1", {
    x: -500,
    duration: 1,
    opacity: 0,
  });
  gsap.from("header h2", {
    x: 500,
    duration: 1,
    opacity: 0,
  });
  gsap.from("form", {
    duration: 1,
    y: 110,
    opacity: 0,
  });
  timeline.from("label", {
    duration: 0.2,
    x: -11,
    opacity: 0,
    stagger: 1,
  });
  gsap.from("table", {
    duration: 1,

    y: 300,
    opacity: 0,
  });
  gsap.from(" #student-list h2", {
    opacity: 0,
    duration: 1,
    y: 100,
  });
}
Animation();

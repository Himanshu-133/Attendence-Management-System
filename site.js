// Tab switching logic
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(tabId).style.display = '';
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  const idx = ['dashboard','attendance','messages','documents','schedule'].indexOf(tabId);
  document.querySelectorAll('.tab-btn')[idx].classList.add('active');
}

// Data
const attendancePieData = {
  labels: ["Present", "Absent", "Late"],
  datasets: [{
    data: [84, 11, 5],
    backgroundColor: ["#27ae60", "#e74c3c", "#f39c12"]
  }]
};
const attendanceBarData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    { label: "Present", backgroundColor: "#27ae60", data: [42, 39, 41, 38, 40] },
    { label: "Absent", backgroundColor: "#e74c3c", data: [3, 5, 2, 5, 4] },
    { label: "Late", backgroundColor: "#f39c12", data: [0, 1, 2, 2, 1] }
  ]
};
const courses = [
  { name: "Intro to Programming", faculty: "Prof. Rajesh Kumar", students: 45, attendance: 84 },
  { name: "Advanced Calculus", faculty: "Dr. Priya Sharma", students: 38, attendance: 92 },
  { name: "Physics Fundamentals", faculty: "Dr. Vikram Malhotra", students: 42, attendance: 78 }
];
const students = [
  { id: "STU10023", name: "Aarav Patel", attendance: 95, status: "Present" },
  { id: "STU10024", name: "Diya Sharma", attendance: 88, status: "Present" },
  { id: "STU10025", name: "Arjun Singh", attendance: 76, status: "Late" },
  { id: "STU10026", name: "Aanya Reddy", attendance: 62, status: "Absent" }
];
const messages = [
  { from: "Aarav Patel", subject: "Assignment Question", time: "10:23 AM", preview: "Sir, I have a doubt regarding the last programming assignment..." },
  { from: "Diya Sharma", subject: "Leave Application", time: "Yesterday", preview: "Respected Sir, I would like to apply for leave for 2 days due to..." },
  { from: "Prof. Ananya Desai", subject: "Faculty Meeting", time: "May 14", preview: "Reminder: There is a faculty meeting scheduled tomorrow at 3 PM..." },
  { from: "Dr. Vikram Malhotra", subject: "Joint Research Proposal", time: "May 13", preview: "Dear Dr. Sharma, I would like to discuss a potential joint research..." }
];
const documents = [
  { name: "CS101_Syllabus_2025.pdf", type: "PDF", size: "1.2 MB", uploaded: "May 10, 2025" },
  { name: "MATH202_Lecture_Notes.pdf", type: "PDF", size: "2.8 MB", uploaded: "May 12, 2025" },
  { name: "Attendance_Report_April.xlsx", type: "Excel", size: "0.9 MB", uploaded: "May 5, 2025" },
  { name: "Final_Exam_Schedule.docx", type: "Word", size: "0.5 MB", uploaded: "May 14, 2025" },
  { name: "Student_Performance_Analysis.pptx", type: "PowerPoint", size: "3.2 MB", uploaded: "May 8, 2025" }
];
const schedule = [
  { time: "09:00 - 10:30", monday: "CS101", tuesday: "MATH202", wednesday: "CS101", thursday: "PHY101", friday: "BIO303" },
  { time: "10:45 - 12:15", monday: "PHY101", tuesday: "ENG205", wednesday: "MATH202", thursday: "CS101", friday: "ENG205" },
  { time: "13:00 - 14:30", monday: "BIO303", tuesday: "CS101", wednesday: "PHY101", thursday: "MATH202", friday: "CS101" },
  { time: "14:45 - 16:15", monday: "ENG205", tuesday: "BIO303", wednesday: "ENG205", thursday: "BIO303", friday: "MATH202" }
];

// Fill Courses Table
const coursesTable = document.getElementById('coursesTable');
courses.forEach(c => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${c.name}</td><td>${c.faculty}</td><td>${c.students}</td><td>${c.attendance}</td>`;
  coursesTable.appendChild(tr);
});

// Fill Students Table
const studentsTable = document.getElementById('studentsTable');
students.forEach(s => {
  const statusClass = s.status === "Present" ? "status-present"
                    : s.status === "Absent" ? "status-absent"
                    : "status-late";
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>${s.attendance}</td><td class="${statusClass}">${s.status}</td>`;
  studentsTable.appendChild(tr);
});

// Fill Messages
const messagesList = document.getElementById('messagesList');
messages.forEach(m => {
  const div = document.createElement('div');
  div.className = "message";
  div.innerHTML = `<strong>${m.subject}</strong> <span style="color:#888;">(${m.time})</span>
    <div style="color:#1976d2;">From: ${m.from}</div>
    <div style="color:#444;">${m.preview}</div>`;
  messagesList.appendChild(div);
});

// Fill Documents
const documentsTable = document.getElementById('documentsTable');
documents.forEach(d => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${d.name}</td><td>${d.type}</td><td>${d.size}</td><td>${d.uploaded}</td>`;
  documentsTable.appendChild(tr);
});

// Fill Schedule
const scheduleTable = document.getElementById('scheduleTable');
schedule.forEach(row => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${row.time}</td><td>${row.monday}</td><td>${row.tuesday}</td><td>${row.wednesday}</td><td>${row.thursday}</td><td>${row.friday}</td>`;
  scheduleTable.appendChild(tr);
});

// Render Charts
new Chart(document.getElementById('attendancePie').getContext('2d'), {
  type: 'pie',
  data: attendancePieData,
  options: {
    plugins: { legend: { position: 'bottom' } }
  }
});
new Chart(document.getElementById('attendanceBar').getContext('2d'), {
  type: 'bar',
  data: attendanceBarData,
  options: {
    responsive: false,
    plugins: { legend: { position: 'bottom' } },
    scales: {
      y: { beginAtZero: true }
    }
  }
});
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var id = document.getElementById('teacherid').value;
  var pwd = document.getElementById('password').value;
  if(id === "Divyansh123" && pwd === "div123") {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = '';
    initDashboard();
  } else {
    alert("Invalid Teacher ID or Password!");
  }
});
// --- DASHBOARD TAB LOGIC ---
function setupDashboardControls() {
  const dashCourse = document.getElementById('dashboardCourse');
  const dashLecture = document.getElementById('dashboardLecture');
  if (dashCourse.options.length === 0) {
    courses.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      dashCourse.appendChild(opt);
    });
  }
  function populateLectures() {
    dashLecture.innerHTML = '';
    const selectedCourse = courses.find(c => c.id === dashCourse.value);
    selectedCourse.lectures.forEach(lec => {
      const opt = document.createElement('option');
      opt.value = lec;
      opt.textContent = lec;
      dashLecture.appendChild(opt);
    });
  }
  dashCourse.addEventListener('change', () => { populateLectures(); renderDashboard(); });
  dashLecture.addEventListener('change', renderDashboard);
  document.getElementById('dashboardDate').value = todayStr();
  document.getElementById('dashboardDate').addEventListener('change', renderDashboard);
  populateLectures();
}
let dashboardPie, dashboardBar;
function renderDashboard() {
  const date = document.getElementById('dashboardDate').value;
  const courseId = document.getElementById('dashboardCourse').value;
  const lecture = document.getElementById('dashboardLecture').value;
  const courseStudents = students.filter(s => s.course === courseId);
  const att = getAttendanceFor(date, courseId, lecture);
  let present = 0, late = 0, absent = 0;
  courseStudents.forEach(s => {
    const status = att[s.id];
    if(status === "Present") present++;
    else if(status === "Late") late++;
    else absent++;
  });
  document.getElementById('dashTotalEnrolled').textContent = courseStudents.length;
  document.getElementById('dashPresentCount').textContent = present;
  document.getElementById('dashLateCount').textContent = late;
  document.getElementById('dashAbsentCount').textContent = absent;
  // Pie
  if(dashboardPie) dashboardPie.destroy();
  dashboardPie = new Chart(document.getElementById('dashboardPie'), {
    type: 'pie',
    data: {
      labels: ['Present','Late','Absent'],
      datasets: [{ data: [present, late, absent], backgroundColor: ['#27ae60','#f39c12','#e74c3c'] }]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
  });
  // Bar
  if(dashboardBar) dashboardBar.destroy();
  dashboardBar = new Chart(document.getElementById('dashboardBar'), {
    type: 'bar',
    data: {
      labels: ['Present','Late','Absent'],
      datasets: [{ label: 'Count', data: [present, late, absent], backgroundColor: ['#27ae60','#f39c12','#e74c3c'] }]
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });
  // Course details table
  const dashboardCoursesTable = document.getElementById('dashboardCoursesTable');
  dashboardCoursesTable.innerHTML = '';
  courses.forEach(c => {
    const enrolled = students.filter(s => s.course === c.id).length;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.faculty}</td>
      <td>${c.lectures.join(', ')}</td>
      <td>${enrolled}</td>
      <td><span class="course-link" onclick="showCourseDetail('${c.id}')">View</span></td>
    `;
    dashboardCoursesTable.appendChild(tr);
  });
  // Recent attendance changes (simple demo: last 5 edits, you can expand this as needed)
  const dashboardRecent = document.getElementById('dashboardRecent');
  dashboardRecent.innerHTML = '';
  (window.recentAttendanceChanges||[]).slice(-5).reverse().forEach(change => {
    const li = document.createElement('li');
    li.textContent = `${change.date} | ${change.courseName} | ${change.lecture} | ${change.studentName}: ${change.status}`;
    dashboardRecent.appendChild(li);
  });
}

// --- Track recent changes for dashboard ---
window.recentAttendanceChanges = [];
const origEditAttendance = window.editAttendance;
window.editAttendance = function(date, courseId, lecture, studentId) {
  const att = getAttendanceFor(date, courseId, lecture);
  const current = att[studentId];
  const newStatus = prompt("Enter new status (Present, Absent, Late):", current);
  if (newStatus && ["Present", "Absent", "Late"].includes(newStatus)) {
    att[studentId] = newStatus;
    window.recentAttendanceChanges.push({
      date,
      courseName: courses.find(c=>c.id===courseId).name,
      lecture,
      studentName: students.find(s=>s.id===studentId).name,
      status: newStatus
    });
    renderDashboard();
    renderAttendanceTab();
    if(document.getElementById('courseDetailPanel').style.display !== 'none') renderCourseDetail();
  } else if (newStatus) {
    alert("Invalid status. Please enter Present, Absent, or Late.");
  }
};

// --- Update showTab to render dashboard ---
const origShowTab = showTab;
showTab = function(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(tabId).style.display = '';
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  const idx = ['dashboard','attendance','courses','messages','documents','schedule','logout'].indexOf(tabId);
  if(idx >= 0) document.querySelectorAll('.tab-btn')[idx].classList.add('active');
  if(tabId === 'dashboard') renderDashboard();
  if(tabId === 'attendance') renderAttendanceTab();
  if(tabId === 'courses') renderCoursesTab();
  if(tabId === 'messages') renderMessages();
  if(tabId === 'documents') renderDocuments();
  if(tabId === 'schedule') renderSchedule();
};

// --- Setup dashboard controls after login ---
const origLogin = document.getElementById('loginForm').onsubmit;
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('dashboardPage').style.display = '';
  setupAttendanceControls();
  setupDashboardControls();
  renderDashboard();
  renderAttendanceTab();
  renderCoursesTab();
};
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('teacherid').value.trim();
  const pwd = document.getElementById('password').value;
  const errorDiv = document.getElementById('loginError');

  // Demo credentials
  const validId = "T001";
  const validPwd = "password123";

  if (id === validId && pwd === validPwd) {
    errorDiv.style.display = "none";
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = '';
    setupAttendanceControls();
    setupDashboardControls && setupDashboardControls();
    renderDashboard && renderDashboard();
    renderAttendanceTab && renderAttendanceTab();
    renderCoursesTab && renderCoursesTab();
  } else {
    errorDiv.textContent = "Invalid username or password.";
    errorDiv.style.display = "block";
  }
});
function logout() {
  document.getElementById('dashboardPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('loginForm').reset();
  document.getElementById('loginError').style.display = "none";
}

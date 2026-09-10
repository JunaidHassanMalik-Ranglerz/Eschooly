export const buildIdCardHtml = data => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
    .card { border: 1px solid #e8e8e8; border-radius: 16px; overflow: hidden; max-width: 420px; }
    .header { background: #071A3D; color: #fff; padding: 16px; }
    .header h1 { margin: 0; font-size: 20px; }
    .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.85; }
    .body { padding: 16px; }
    .name { font-size: 18px; font-weight: 700; margin: 0 0 4px; }
    .role { color: #8e8e8e; font-size: 12px; margin: 0 0 12px; }
    .grid { display: flex; gap: 16px; margin-bottom: 12px; }
    .grid div { font-size: 12px; }
    .grid span { display: block; color: #8e8e8e; font-size: 10px; }
    .badge { display: inline-block; background: #f0f0f0; padding: 6px 12px; border-radius: 20px; font-size: 12px; margin-bottom: 8px; }
    .school { color: #8e8e8e; font-size: 11px; line-height: 1.5; }
    .details { margin-top: 20px; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e8e8e8; font-size: 12px; }
    .row strong { font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>${data.schoolName}</h1>
      <p>${data.schoolTagline} · ${data.academicYear}</p>
    </div>
    <div class="body">
      <p class="name">${data.name}</p>
      <p class="role">${data.role}</p>
      <div class="grid">
        <div><span>CLASS</span><strong>${data.class}</strong></div>
        <div><span>SECTION</span><strong>${data.section}</strong></div>
        <div><span>ROLL NO</span><strong>${data.rollNo}</strong></div>
      </div>
      <div class="badge">${data.studentId}</div>
      <div class="school">${data.schoolLine}<br/>${data.cityLine}</div>
    </div>
  </div>
  <div class="details">
    <div class="row"><span>Student Name</span><strong>${data.name}</strong></div>
    <div class="row"><span>Student ID</span><strong>${data.studentId}</strong></div>
    <div class="row"><span>Class & Section</span><strong>${data.classSectionValue}</strong></div>
    <div class="row"><span>Roll Number</span><strong>${data.rollNo}</strong></div>
    <div class="row"><span>Date of Issue</span><strong>${data.dateOfIssue}</strong></div>
    <div class="row"><span>Valid Until</span><strong>${data.validUntil}</strong></div>
  </div>
</body>
</html>
`;

# Flyer content approval checklist

Owner: product / school communications.  
Source: `COMPLETE_FUNCTIONALITY_AUDIT.md`.  
Backend in this workspace: **not verified**.

Mark `[x]` when signed off.

---

## 1. Confirmed for Student flyer (client implemented + API wired)

Safe to describe as Student app capabilities, unless runtime QA later fails.

- [ ] Student login (Student ID + password)  
- [ ] Home dashboard with school-enabled shortcuts  
- [ ] Timetable by day  
- [ ] Attendance summary and history  
- [ ] Assignments: view, notes, attachments, submit  
- [ ] Exams overview and history  
- [ ] Results and result card  
- [ ] Syllabus / subjects progress  
- [ ] Digital library search and file open  
- [ ] Online classes: join, remind, recordings when offered  
- [ ] Announcements  
- [ ] Notifications inbox (mark read)  
- [ ] Holidays list  
- [ ] Profile, password, sign out  

Optional if space (directory only, no live chat claim):

- [ ] Teachers list  

---

## 2. Confirmed for Parent flyer (client implemented + child API wired)

- [ ] Parent login (Family ID + password)  
- [ ] Parent home snapshot for the selected child  
- [ ] Switch linked children  
- [ ] Attendance for the selected child  
- [ ] Timetable  
- [ ] Syllabus  
- [ ] Results and result card download/open  
- [ ] Digital library for that child  
- [ ] Announcements  
- [ ] Upcoming exam schedule  
- [ ] Child journey: allocation and pickup/drop **steps** (not live GPS)  
- [ ] Parent profile, password, sign out  

---

## 3. Requires verification before stronger claims

Do not print “live”, “real-time”, or “available in every school” until QA against the production API.

- [ ] Module flags on student home actually enable the shortcuts for the launch school  
- [ ] Result PDF URLs open for both roles  
- [ ] Online class join URLs work (Zoom/Meet)  
- [ ] Parent child switch updates every academic screen  
- [ ] Transport trip steps match a real allocated bus  
- [ ] Login and session restore on both iOS and Android  

Until then, print **in-app capability** language, not uptime or coverage claims.

---

## 4. Must not be advertised as working

| Item | Why |
| --- | --- |
| In-app chat / teacher messaging | Local dummy thread; messages are not sent to a server |
| Online exam sitting / midterm | Dummy questions and timer only |
| Student fee pay / dues | Screen unused in student navigation; dummy amounts; no payment API |
| Parent fee pay, payment history, challan download | Dummy `PARENT_FEES`; Pay Now and download have no handlers |
| Parent diary | Dummy entries only |
| Parent teacher directory | Dummy names |
| Parent holidays list | Hardcoded sample holidays |
| Parent assignment management | Dummy list; submit disabled |
| Parent notification inbox | Fetch skipped for parent role |
| Live GPS bus map | Static `TransportMap.png` |
| Student self-registration | Login screen only |
| “Report card ready” menu alert | `screen: null` |
| Parent online classes | Not in parent menu; join blocked |

---

## 5. Open questions for the owner

1. May flyers say the data is “from your school”, or must they wait for a recorded demo on production?  
2. Should Teachers appear on the Student flyer without a messaging claim?  
3. Is Child journey in or out of the Parent flyer, given the static map?  
4. Are there schools where student home modules are all off? Copy should say “features your school enables”.  
5. Confirm Family ID / Student ID labels match what schools print on admission letters.  
6. Confirm whether the dedicated ID Card screen should ever be promoted (it is not the same as the profile ID download API).  

---

## 6. Flyer C — combined overview (optional)

**Headline:** Two portals. One school.

**Student bullets (max 3):** Timetable and attendance · Assignments and results · Library and online classes  

**Parent bullets (max 3):** Linked children · Attendance and results · Exam dates and child journey steps  

**Footer:** Student and Parent sign-in. Features depend on what the school has enabled.

Do not merge the two apps into a claim that every user gets fees, chat, and GPS.

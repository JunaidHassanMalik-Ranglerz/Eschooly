# Eschooly — Complete Functionality Audit

**Investigation date:** 10 November 2026  
**Scope:** Read-only source inspection of the React Native client.  
**Backend:** Not present in this workspace. Client calls `https://ranglerz.click/eschool/public/api`. Server behaviour, data quality, and school-specific module flags were **not independently executed**.

**Status vocabulary**

| Status | Meaning |
| --- | --- |
| WORKING | Client behaviour is fully local and observed in code without needing the backend |
| IMPLEMENTED — NOT RUNTIME VERIFIED | Screen, navigation, and API client exist; live server not tested here |
| PARTIAL | Mix of live wiring and dummy data, or incomplete actions |
| UI ONLY | Screen exists; content is hardcoded dummy data; no production API for this flow |
| NOT IMPLEMENTED | Referenced, registered, or labelled without a usable production path |
| UNKNOWN / BLOCKED | Cannot be confirmed from this project |

Dummy constants (`src/Constants/dummydata.js`, `parentData.js`, `OnlineExamData.js`, `OnlineClassData.js`, `StudentIdCardData.js`) are **not** treated as evidence of production functionality.

---

## 1. Application architecture (verified)

| Area | Finding | Evidence |
| --- | --- | --- |
| Stack | React Native 0.86, JS screens, Redux Toolkit, persist auth | `package.json`, `src/store/store.js` |
| Roles | Parent or Student chosen before login | `src/Screens/StartScreens/Role.js`, `src/context/RoleContext.js` |
| Auth UI | Single login screen named Register | `src/Navigations/AuthNavigation.js`, `src/Screens/Auth/Register.js` |
| Tabs | Home, Academics, Chat, Profile | `src/Navigations/EschoolBottomTab/BottomNavigation.js` |
| Home split | `AFN` renders `StudentHome` or `ParentHome` | `src/Screens/AppFlow/AFN.js` |
| Student API | `src/services/studentService.js` | Listed in §8 |
| Parent API | `src/services/parentService.js` | Listed in §8 |
| Auth API | `src/services/authService.js` | Login, logout, password, parent profile |

---

## 2. Shared start / account features

### 2.1 Role selection

| Field | Detail |
| --- | --- |
| Purpose | Choose Parent or Student before sign-in |
| User can | Tap Parent or Student; app stores role and opens login |
| API | None |
| Status | **WORKING** (purely local) |
| Evidence | `src/Screens/StartScreens/Role.js` (`setRole`, `navigation.replace('AuthNavigation')`) |
| Flyer line | Choose a Parent or Student portal before signing in. |

### 2.2 Splash and session restore

| Field | Detail |
| --- | --- |
| Purpose | Brand splash, then restore a saved session or send the user to Role |
| User can | Wait ~5 seconds; authenticated users go to tabs |
| API | Uses persisted token; `restoreParentSession` / `applySavedSession` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `src/Screens/StartScreens/SplashScreen.js`, `src/store/restoreSession.js` |

### 2.3 Login

| Field | Detail |
| --- | --- |
| Purpose | Authenticate Parent (Family ID + password) or Student (Student ID + password) |
| User can | Enter credentials, show/hide password, submit, return to role |
| API | `POST /parent/login`, `POST /student/login` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Register.js` `loginParent` / `loginStudent`; `authService.js` |
| Notes | Screen is named Register but is sign-in only. No self-registration flow. Demo fields are prefilled in code; that is not a product feature. |

### 2.4 Logout and password change

| Field | Detail |
| --- | --- |
| Purpose | End session; change password |
| User can | Confirm logout; submit current + new password with local complexity checks |
| API | `/parent/logout`, `/student/logout`, `/parent/password`, `/student/password` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `MyProfile.js`, `UpdatePassword.js`, `authSlice.js` |

---

## 3. Student features

Access path unless noted: Student login → Home and/or Academics tab (`MENU_LIST` without Fees / Track Child).

### 3.1 Student Home dashboard

| Field | Detail |
| --- | --- |
| Purpose | Greeting, identity, module shortcuts, upcoming class, unread badge |
| Student can | See name/class from API; open enabled modules; open upcoming class; open notifications |
| Important | Hub items appear only when `modules[key] === true` from `/student/home` |
| API | `GET /student/home` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `StudentHome.js`, `fetchStudentHome`, `studentService.mapStudentHome` |
| Flyer | A personal home screen with shortcuts the school has enabled. |

### 3.2 Academics menu

| Field | Detail |
| --- | --- |
| Purpose | List of academic destinations |
| Student can | Open Syllabus, Assignments, Teachers, Attendance, Timetable, Holidays, Exams, Results |
| API | None for the list itself; destinations have their own APIs |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** (navigation is real; Fees hidden for students) |
| Evidence | `Menu.js`, `dummydata.js` `MENU_LIST` (route table, not content) |

### 3.3 Attendance

| Field | Detail |
| --- | --- |
| Purpose | Monthly attendance summary and day history |
| Student can | View present/absent/late/leave counts, rate, month filter, history list |
| API | `GET /student/attendance` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Attendance.js` `fetchStudentAttendance` |

### 3.4 Timetable

| Field | Detail |
| --- | --- |
| Purpose | Weekly class schedule |
| Student can | Pick a day; see period, subject, time, teacher |
| API | `GET /student/timetable?day=` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Timetable.js` `fetchStudentTimetable` |

### 3.5 Syllabus / subjects

| Field | Detail |
| --- | --- |
| Purpose | Subject units, topics, completion |
| Student can | Filter subjects; expand chapters; see topic status and progress |
| API | `GET /student/syllabus` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Syllabus.js` `fetchStudentSyllabus` |
| Note | There is no separate “Subjects” screen; syllabus is the subject catalogue. |

### 3.6 Assignments

| Field | Detail |
| --- | --- |
| Purpose | Overview, subject groups, detail, submit, attachments |
| Student can | View counts; expand assignments; add notes; attach files; submit/update; download attachments |
| API | `/student/assignments`, `/overview`, `/graded`, `/:id`, `/:id/submission`, submit POST, attachment download |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Assignment.js`, `studentHomeSlice` assignment thunks |

### 3.7 Examinations (results overview)

| Field | Detail |
| --- | --- |
| Purpose | Exam totals, next exam, history with date range |
| Student can | View overview stats, next exam, filter history, open an exam row for extra detail |
| API | `/student/exams/overview`, `/student/exams`, `/student/exams/history`, `/student/exams/:id` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Exam.js` (student branch only uses API) |

### 3.8 Results / report card

| Field | Detail |
| --- | --- |
| Purpose | Subject grades by monthly/year card; open PDF |
| Student can | Toggle term; view grades; open result PDF when `pdfUrl` exists |
| API | `/student/results`, `/summary`, `/card` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `StudentResults.js` `fetchStudentResults` |
| Note | Profile menu item “Report card ready” has `screen: null` — **NOT IMPLEMENTED** as a separate alert. |

### 3.9 Digital Library

| Field | Detail |
| --- | --- |
| Purpose | Search and download class resources |
| Student can | Search, filter category, download PDF, open in viewer |
| API | `GET /student/library`, download URL |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `DigitalLibrary.js` `fetchStudentLibrary` |

### 3.10 Online classes

| Field | Detail |
| --- | --- |
| Purpose | Live, upcoming, and recorded sessions |
| Student can | Join meeting URL, set reminder, watch/download recording |
| API | `/student/online-classes`, `/:id/join`, `/:id/reminder`, `/:id/recording` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `OnlineClass.js` (student branch); parent branch uses dummy and is not on the student path |

### 3.11 Announcements

| Field | Detail |
| --- | --- |
| Purpose | School notices |
| Student can | List announcements; open one for detail |
| API | `GET /student/announcements`, `GET /student/announcements/:id` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Announcements.js` student branch |

### 3.12 Notifications

| Field | Detail |
| --- | --- |
| Purpose | In-app notification inbox |
| Student can | All/Unread tabs, pull to refresh, mark one read, mark all read |
| API | `/student/notifications`, unread-count, `/:id/read`, `/read-all` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Notification.js` — parent branch **skips** fetch |

### 3.13 Teachers

| Field | Detail |
| --- | --- |
| Purpose | Class teacher and subject teachers |
| Student can | View list; tap to load teacher detail; open Chat with that teacher (local chat only) |
| API | `GET /student/teachers`, `GET /student/teachers/:id` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** for directory; chat handoff is **UI ONLY** |
| Evidence | `Teacher.js` student branch |

### 3.14 Holidays

| Field | Detail |
| --- | --- |
| Purpose | School holiday list |
| Student can | View title, dates, type, duration from API |
| API | `GET /student/holidays` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Holidays.js` student branch |

### 3.15 Profile and identity

| Field | Detail |
| --- | --- |
| Purpose | Student card details, password, logout, ID download |
| Student can | View API profile card/details; change password; logout; open ID PDF URL |
| API | `GET /student/profile`; ID download URL `/student/id-card/download` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `MyProfile.js` `fetchStudentProfile`, `studentIdCardDownloadUrl` |

### 3.16 Dedicated Student ID Card screen

| Field | Detail |
| --- | --- |
| Purpose | Flip preview, print, generate PDF |
| Student can | Flip card; print/download HTML built locally from `getIdCardData(student)` |
| API | Screen does **not** call `/student/id-card`; uses `StudentIdCardData` + `useProfileStudent` |
| Status | **PARTIAL** (local preview/print; not the live ID-card API used from Profile) |
| Evidence | `StudentIdCard.js`, `src/utils/idCardActions.js` |

### 3.17 Chat

| Field | Detail |
| --- | --- |
| Purpose | Message school admin / teacher |
| Student can | View dummy thread; type a message that is appended only in component state |
| API | None |
| Status | **UI ONLY** |
| Evidence | `Chat.js` `CHAT_MESSAGES`, `sendMessage` local `setMessages` |

### 3.18 Online exam sitting (Midterm)

| Field | Detail |
| --- | --- |
| Purpose | Take an online exam |
| Student can | Switch dummy tabs; answer dummy questions; timer is local |
| API | None (`OnlineExamData.js`, `MidtermExamData.js`) |
| Status | **UI ONLY** |
| Evidence | `OnlineExam.js`, `MidtermMathematics.js` |
| Access | Student profile menu list includes Online Exams |

### 3.19 Student fees / dues / receipts

| Field | Detail |
| --- | --- |
| Purpose | Pending dues and pay |
| Student can | `Dues` screen exists with dummy `STUDENT_DUES`; **not linked** from student menu. `PendingDuesCard` is unused. Pay button has no gateway. |
| API | None |
| Status | **NOT IMPLEMENTED** as a student product feature |
| Evidence | `Dues.js`; no `navigate('Dues')` from active screens; `MENU_LIST` hides `fee` for students |

### 3.20 Student transport

| Field | Detail |
| --- | --- |
| Status | **NOT IMPLEMENTED** for students (parent-only Track Child / Transport) |

### 3.21 PDF viewer

| Field | Detail |
| --- | --- |
| Purpose | Open downloaded/result PDFs |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** as a helper, not a flyer feature |
| Evidence | `PdfViewer.js` |

---

## 4. Parent features

Access path: Parent login → Home and Academics. Fees and Track Child appear only for parent (`MENU_LIST` `parentOnly` / unfiltered `fee`).

### 4.1 Parent Home dashboard

| Field | Detail |
| --- | --- |
| Purpose | Parent greeting, selected child, snapshot stats, shortcuts |
| Parent can | See attendance %, library count, exam count, announcement count; open Attendance, Library, Announcements; open Timetable, Syllabus, Results, Track Child. **Exams stat tile has `onPress` commented out.** |
| Child switch | Modal calls `fetchChildDashboard` |
| API | `GET /parent/home`, `GET /parent/children/:id/dashboard` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `ParentHome.js` |

### 4.2 Linked children and switching

| Field | Detail |
| --- | --- |
| Purpose | Monitor more than one child |
| Parent can | Switch child on Home, Menu, Attendance, Results, Syllabus, Library, Announcements, Exam schedule, Child Track when Redux `children.length > 1` |
| API | Children come from `/parent/home` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** on those screens |
| Caveat | `ChildProfile.js` and some identity hooks still use `useRoleData` dummy `ATTENDANCE_STUDENTS` — **PARTIAL** on Child Profile |

### 4.3 Attendance monitoring

| Field | Detail |
| --- | --- |
| Purpose | Selected child’s monthly attendance |
| Parent can | Same UI as student; loads `fetchChildAttendance` |
| API | `GET /parent/children/:id/attendance` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Attendance.js` parent branch |

### 4.4 Timetable

| Field | Detail |
| --- | --- |
| API | `GET /parent/children/:id/timetable` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Timetable.js` `fetchChildTimetable` |

### 4.5 Syllabus

| Field | Detail |
| --- | --- |
| API | `GET /parent/children/:id/syllabus` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Syllabus.js` `fetchChildSyllabus` |

### 4.6 Results

| Field | Detail |
| --- | --- |
| Parent can | View selected child’s card; download/print PDF via `downloadChildResultCard` |
| API | `GET /parent/children/:id/results/card` and print URL |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `StudentResults.js` parent branch |

### 4.7 Digital Library

| Field | Detail |
| --- | --- |
| API | `GET /parent/children/:id/library` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `DigitalLibrary.js` `fetchChildLibrary` |

### 4.8 Announcements

| Field | Detail |
| --- | --- |
| API | `GET /parent/children/:id/announcements` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `Announcements.js` parent branch |

### 4.9 Exam schedule

| Field | Detail |
| --- | --- |
| Purpose | Upcoming exams for the selected child (date, time, venue, syllabus outline) |
| API | `GET /parent/children/:id/exams` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `ExamSchedule.js` `fetchChildExams` |
| Contrast | Academics “Exams” for parent goes here (`parentScreen: 'ExamSchedule'`). The shared `Exam.js` history screen uses **dummy** data for parents (`EXAM_HISTORY`) if opened as `ParentResults`. |

### 4.10 Child tracking / live transport trip

| Field | Detail |
| --- | --- |
| Purpose | Bus allocation and morning/evening trip steps |
| Parent can | See allocated vs not; trip step completion flags; switch child |
| API | `GET /parent/children/:id/transport` |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** |
| Evidence | `ChildTrack.js` `fetchChildTransport` |
| Note | Map image is a static PNG (`TransportMap.png`), not live GPS pins. Do not advertise real-time map tracking. |

### 4.11 Parent profile

| Field | Detail |
| --- | --- |
| API | `GET /parent/profile` merged over dummy labels |
| Status | **IMPLEMENTED — NOT RUNTIME VERIFIED** (contact values prefer API when present) |
| Evidence | `MyProfile.js` `fetchParentProfile`; fallback keys in `useProfileStudent.js` from `PARENT_DATA` |

### 4.12 Assignments (parent)

| Field | Detail |
| --- | --- |
| Parent can | See dummy assignment overview from `useRoleData`; **cannot** open detail or submit (`if (isParent) return`) |
| API | No parent assignment endpoint in `parentService.js` |
| Status | **PARTIAL** (UI with dummy lists) |
| Evidence | `Assignment.js` |

### 4.13 Teachers (parent)

| Field | Detail |
| --- | --- |
| Data | `getTeachersForChild` dummy; API fetch skipped when `isParent` |
| Status | **UI ONLY** |
| Evidence | `Teacher.js` |

### 4.14 Holidays (parent)

| Field | Detail |
| --- | --- |
| Data | `HOLIDAY_LIST` dummy; student API skipped |
| Status | **UI ONLY** |
| Evidence | `Holidays.js` `holidays = isParent ? HOLIDAY_LIST : studentHolidays` |

### 4.15 Notifications (parent)

| Field | Detail |
| --- | --- |
| Dashboard | Unread count from parent dashboard mapper |
| Inbox | `Notification.js` does not fetch when `isParent` |
| Status | **PARTIAL** (badge/count possible; inbox not live) |
| Evidence | `Notification.js` lines 75–78; `mapDashboard` `unreadNotifications` |

### 4.16 Chat (parent)

| Status | **UI ONLY** — same dummy `Chat.js` |
| --- | --- |

### 4.17 Fees, payment history, receipts / challans

| Field | Detail |
| --- | --- |
| Parent can | Open Fees from Academics; switch school/transport tabs; open details, history, receipts **views** filled from `PARENT_FEES` dummy |
| Pay Now | `TouchableOpacity` with **no `onPress`** |
| Receipt download | `TouchableOpacity` with **no `onPress`** |
| API | None in `parentService.js` |
| Status | **UI ONLY** for browsing dummy amounts; **NOT IMPLEMENTED** for payment or downloads |
| Evidence | `Fee.js`, `useRoleData` `feeDetails: PARENT_FEES` |

### 4.18 Transport details screen

| Field | Detail |
| --- | --- |
| Purpose | Driver, pickup/drop, static map |
| Data | `useRoleData().transportDetails` dummy `PARENT_TRANSPORT` |
| API | Not used on this screen (live transport is Child Track) |
| Status | **UI ONLY** |
| Evidence | `Transport.js` |
| Access | From Fee action “transport”, not from Academics list |

### 4.19 Parent diary

| Field | Detail |
| --- | --- |
| Data | `PARENT_DIARY` via `useRoleData` |
| API | None |
| Status | **UI ONLY** |
| Evidence | `ParentDiary.js` |
| Access | Child Profile menu, not Academics `MENU_LIST` |

### 4.20 Child Profile hub

| Field | Detail |
| --- | --- |
| Purpose | Shortcut sheet for one child |
| Data | Dummy `activeStudent` from `useRoleData`, not Redux children |
| Destinations | Mix of live (attendance, timetable, results…) and dummy (diary, assignments, teachers) |
| Status | **PARTIAL** |
| Evidence | `ChildProfile.js` |

### 4.21 Online classes (parent)

| Field | Detail |
| --- | --- |
| Access | Not on parent Academics menu or parent profile menu |
| If opened | Dummy `useRoleData` classes; join disabled (`if (isParent) return`) |
| Status | **NOT IMPLEMENTED** as a parent product feature |

---

## 5. Permission matrix (actual)

| Capability | Student | Parent |
| --- | --- | --- |
| Own home modules from API | Yes | Child dashboard from API |
| Switch linked children | No | Yes (Redux) |
| Attendance / timetable / syllabus / library / announcements / results | Own APIs | Child APIs |
| Assignment submit | Yes (API) | View dummy only |
| Exam history overview | Yes (API) | Dummy if `Exam.js`; live schedule on `ExamSchedule` |
| Online class join | Yes (API) | No |
| Notification inbox | Yes (API) | Count only |
| Chat to server | No | No |
| Fees / pay | No | Dummy UI, no pay |
| Transport trip steps | No | Child Track API; static map |
| Diary | No | Dummy UI |
| Password / logout | Yes | Yes |

---

## 6. Count summary

Counts are **distinct product features**, not files. Splash, PDF viewer, and role selection are shared start-up, not listed in the role totals.

### Student — 20 features

| Status | Count | Features |
| --- | --- | --- |
| IMPLEMENTED — NOT RUNTIME VERIFIED | 14 | Home, Academics menu, Attendance, Timetable, Syllabus, Assignments, Examinations, Results, Digital library, Online classes, Announcements, Notifications, Holidays, Profile (incl. password) |
| PARTIAL | 2 | Teachers (live directory, dummy chat); dedicated ID Card screen (local HTML, not ID-card API) |
| UI ONLY | 2 | Chat; online exam sitting |
| NOT IMPLEMENTED | 2 | Student fees/dues; student transport |

Login/session is **IMPLEMENTED — NOT RUNTIME VERIFIED** and shared with Parent (not double-counted above). Role selection is **WORKING** (local).

### Parent — 20 features

| Status | Count | Features |
| --- | --- | --- |
| IMPLEMENTED — NOT RUNTIME VERIFIED | 11 | Home, linked-child switch, Attendance, Timetable, Syllabus, Results, Digital library, Announcements, Exam schedule, Child Track, Profile |
| PARTIAL | 3 | Assignments (dummy list); notification inbox (count only); Child Profile hub (dummy identity) |
| UI ONLY | 6 | Teachers, Holidays, Chat, Fees screens, Transport details, Diary |

Pay Now / challan download and parent online classes are **NOT IMPLEMENTED** (do not add them to the 20; they are gaps inside Fees and access, not extra advertised modules).

---

## 7. Backend limitation (mandatory)

No API server, Postman collection, or live credentials were executed in this investigation. “IMPLEMENTED — NOT RUNTIME VERIFIED” means the **mobile client is wired**. It does not prove the production school server returns data for every tenant or that every module flag is enabled.

---

## 8. API catalogue (client)

**Auth:** `/parent/login`, `/student/login`, `/parent/logout`, `/student/logout`, `/parent/password`, `/student/password`, `/parent/profile`, `/student/profile`

**Student:** `/student/home`, `/timetable`, `/attendance`, `/assignments` (+ overview, graded, submit, attachments), `/library`, `/announcements`, `/notifications` (+ read), `/syllabus`, `/results` (+ summary, card), `/teachers`, `/holidays`, `/exams` (+ overview, history), `/online-classes` (+ join, reminder, recording), `/id-card` (+ download)

**Parent:** `/parent/home`, `/parent/children/:id/dashboard|timetable|results/card|announcements|syllabus|library|exams|attendance|transport`

No client methods for fees, chat, diary, or parent notifications list.

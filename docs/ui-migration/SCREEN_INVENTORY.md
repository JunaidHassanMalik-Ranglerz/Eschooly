# Eschooly — Complete Screen Inventory

**Status:** Planning only.  
**Authority:** Subordinate to [`MASTER_EXECUTION_PLAN.md`](./MASTER_EXECUTION_PLAN.md)

Counts below are from source, not assumptions.

| Count | What |
| --- | --- |
| 35 | Screen files under `src/Screens/` |
| 3 | Navigators (`MainNavigation`, `AuthNavigation`, `BottomNavigation`) |
| 30 | Main-stack route names |
| 7 | Bottom-tab route names (4 visible) |
| 1 | Auth route (`Register`) |
| 33 | Unique visual surfaces to restyle (see §2) |
| 104 | Component files under `src/Component/` |

---

## 1. How to read this inventory

- **Role:** `student`, `parent`, `both`, or `start` (pre-auth).
- **Parent navigator:** where the route is registered.
- **Complexity:** Low / Medium / High based on layout density, variants, and shared-component count — not business-logic size.
- **Data:** Live API, dummy constants, or mixed. Presentation work must not change this.
- **Redesign approach:** how the approved Home language maps onto this screen.

Hidden tab routes (`Attends`, `Exam`, `Teachers`) still render the same components as stack aliases (`ParentAttendance`, `ParentResults`, `ParentTeachers`). Each component is listed **once**.

---

## 2. Unique visual surfaces (33)

Start: SplashScreen, Role, Register  
Home: StudentHome, ParentHome  
Tabs: Menu, Chat, MyProfile (via Profile wrapper)  
Shared stack: Attendance, Exam, Teacher, Syllabus, Assignment, DigitalLibrary, StudentIdCard, PdfViewer, OnlineExam, OnlineClass, MidtermMathematics, Notification, StudentResults, Holidays, UpdatePassword, Dues  
Parent stack: ChildProfile, Announcements, ExamSchedule, Timetable, ParentDiary, Fee, Transport, ChildTrack  

Not visual (do not restyle as screens): `AFN.js` (role router), `Profile.js` (StatusBar + `MyProfile isTab`), `PlaceholderScreen.js` (unregistered empty view).

---

## 3. Screen-by-screen inventory

### 3.1 Start and authentication

| Screen | Path | Role | Navigator | Shared UI | Theme | Data | Complexity | Redesign approach |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Splash | `src/Screens/StartScreens/SplashScreen.js` | start | Main | `PortalBrand`, `EnterView` | Navy splash gradient | Session restore (`restoreSession`) | Low | Keep 5s timing and routing. Restyle brand block to approved logo + `#071A3D`. No new data. |
| Role | `src/Screens/StartScreens/Role.js` | start | Main | `EnterView`, LinearGradient, SVG waves, Ionicons | `CARD_GRADIENTS.royal`, splash colors | `RoleContext.setRole` then `AuthNavigation` | Medium | Lighten cards toward glass-on-navy. Preserve Parent/Student press handlers. Do not add roles. |
| Register (Login) | `src/Screens/Auth/Register.js` | start | Auth stack | `PortalBrand`, `CustomTextInput`, `Btn`, `EnterView` | Syllabus math gradient + identity shadow | `loginParent` / `loginStudent` | High | Apply light card on navy header. Do not change fields, validation, demo defaults, or success `reset` to BottomTab. |

### 3.2 Home

| Screen | Path | Role | Navigator | Shared UI | Theme | Data | Complexity | Redesign approach |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AFN | `src/Screens/AppFlow/AFN.js` | both | Tab `Home` | none | n/a | `useRoleData().isParent` | — | **No visual work.** Keep back-handler that resets to Auth. |
| Student Home | `src/Screens/AppFlow/StudentHome.js` | student | Tab `Home` via AFN | `NotificationBell`, `AttendanceStudentDropdown`, `StudentHubCard`, `DepthIcon`, `CardWave`, `AnimatedCard` | Navy header shell + navy hub tiles + sapphire upcoming card | `fetchStudentHome` → modules, student, upcomingClass, unreadNotifications | High | **Reference implementation.** Rebuild presentation to approved Home: navy branded header, student chip (read-only), search (navigates to existing DigitalLibrary), welcome banner, Quick Access from `HUB_ITEMS` filtered by `modules`, glance rows from existing fields only. |
| Parent Home | `src/Screens/AppFlow/ParentHome.js` | parent | Tab `Home` via AFN | `NotificationBell`, `SelectedChildBanner`, `ChildSwitchModal`, `ParentStatCard`, `ScheduleItem` | Same navy shell + stat tiles + schedule gradients | `fetchParentHome`, `fetchChildDashboard` | High | Same shell as Student Home. Chip becomes switchable child (`ChildSwitchModal` unchanged). Quick Access / glance bind to existing dashboard stats and schedule. No new parent endpoints. |

### 3.3 Visible tabs

| Screen | Path | Role | Navigator | Shared UI | Theme | Data | Complexity | Redesign approach |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Menu (Academics) | `src/Screens/CommonScreens/Menu.js` | both | Tab `Menu` + stack `Menu` | `MainHeaderComponent`, `AcademicMenuCard`, `AttendanceStudentDropdown`, `ParentChildCard`, `ChildSwitchModal` | `parentBg` + navy gradient rows | `MENU_LIST` routes; parent child from Redux | Medium | Replace gradient rows with light list cards + 3D/standard icons. Keep filter (`fee` / `parentOnly`) and `handlePress` routing. Header uses shared restyled `MainHeaderComponent`. |
| Chat | `src/Screens/CommonScreens/Chat.js` | both | Tab `Chat` | `ChatHeader`, `ChatBubble`, `ChatInputBar`, `ChatAnnouncementCard` | `chatScreenBg` `#F7F8FD` | Dummy `CHAT_*`; parent overlay from `useRoleData` | Medium | Light bubbles, navy accents. Keep local `sendMessage` state. Do not invent a chat API. |
| Profile (wrapper) | `src/Screens/CommonScreens/Profile.js` | both | Tab `Profile` | `MyProfile` | StatusBar only | n/a | — | StatusBar only after Home token change. |
| My Profile | `src/Screens/CommonScreens/MyProfile.js` | both | Tab via wrapper; also stack `MyProfile` | Profile cards, `PersonAvatar`, `Btn`, identity shadow | Navy identity card + menu rows | `fetchParentProfile` / `fetchStudentProfile`; logout thunks | High | Identity card → glass/light with navy header strip. Keep logout, password, ID card actions. |

### 3.4 Shared academic / student stack

| Screen | Path | Role | Navigator | Shared UI | Theme | Data | Complexity | Redesign approach |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Attendance | `src/Screens/CommonScreens/Attendance.js` | both | Tab `Attends` (hidden) + stack `ParentAttendance` | Header, dropdowns, `AttendanceStatCard`, `AttendanceRateCard`, `AttendanceHistoryItem`, `SegmentTabs`, `Btn` | Navy/ice + hardcoded status hex | `fetchStudentAttendance` / `fetchChildAttendance` | High | Stat tiles → light cards with colored 3D/vector status. Keep month filter, history toggle, child switch. |
| Exam | `src/Screens/CommonScreens/Exam.js` | both | Tab `Exam` (hidden) + stack `ParentResults` | `ExamOverviewCard`, `ExamNextExamCard`, `ExamHistoryItem`, date range | Navy cards, green/red score hex | `fetchStudentExams*` | High | Overview as glass stats; history as light rows. Keep date-range modal behavior. |
| Teacher | `src/Screens/CommonScreens/Teacher.js` | both | Tab `Teachers` (hidden) + stack `ParentTeachers` | `ClassTeacherCard`, `SubjectTeacherItem` | Navy/light mix | `fetchStudentTeachers` (+ dummy fallback import) | Medium | Light teacher cards, keep message navigation into Chat with params. |
| Syllabus | `src/Screens/CommonScreens/Syllabus.js` | both | Stack `Syllabus` | `SyllabusFilter`, `ChapterCard`, `TopicItem`, `OverallProgressCard` | Subject `BLUE_THEMES` gradients | `fetchStudentSyllabus` / `fetchChildSyllabus` | High | Move chapter cards to light surfaces; keep subject filter and expand/collapse. |
| Assignment | `src/Screens/CommonScreens/Assignment.js` | student (also reachable parent via Menu) | Stack `Assignment` | Overview + subject + item cards, submit UI | Navy/status colors | `fetchStudentAssignments*` + submit | High | Light subject groups, status chips. Keep submit, attachments, notes. |
| Digital Library | `src/Screens/CommonScreens/DigitalLibrary.js` | both | Stack `DigitalLibrary` | Search, category, resource cards, profile card | Navy/light | `fetchStudentLibrary` / `fetchChildLibrary` + download | High | Search field matches Home search chrome. Resource rows as light cards. Keep PDF download → PdfViewer. |
| Student Results | `src/Screens/CommonScreens/StudentResults.js` | both | Stack `StudentResults` | `OverallGradeCard`, subject rows, hardcoded `NAVY`/`SCREEN_BG` | Ice `#DCEBFD` + navy gradients | `fetchStudentResults` / `fetchChildResultCard` | High | Align screen bg to token `background.canvas`. Keep monthly/year toggle and PDF. |
| Holidays | `src/Screens/CommonScreens/Holidays.js` | both | Stack `Holidays` | Gradient holiday rows | Local holiday palettes | `fetchStudentHolidays` (+ `HOLIDAY_LIST` import) | Medium | Light list + type chips. Keep API list. |
| Notification | `src/Screens/CommonScreens/Notification.js` | both | Stack `Notification` | `NotificationCard`, local tabs | Hardcoded ice + navy | Student notifications thunks; parent still limited | High | Light list, unread accent. Keep mark-read / mark-all-read / pull-to-refresh. |
| Online Class | `src/Screens/CommonScreens/OnlineClass.js` | student | Stack `OnlineClass` | Live/upcoming/recording cards, `ClassTabBar` | Navy cards | `fetchStudentOnlineClasses`, join, reminder, recording | High | Light session cards; live badge stays semantic red/green. Keep join/remind/download. |
| Online Exam | `src/Screens/CommonScreens/OnlineExam.js` | student | Stack `OnlineExam` | Exam tab bar + dummy cards | parentBg | `OnlineExamData` dummy | Medium | Visual only. Keep tabs and navigation into MidtermMathematics. |
| Midterm Mathematics | `src/Screens/CommonScreens/MidtermMathematics.js` | student | Stack `MidtermMathematics` | Question card, navigator, footer | parentBg | `MidtermExamData` dummy | Medium | Visual only. Keep timer, answers, flag, jump. |
| Student ID Card | `src/Screens/CommonScreens/StudentIdCard.js` | student | Stack `StudentIdCard` | Preview, flip, actions | Identity card | `getIdCardData` + download/print utils | Medium | Keep flip/print/download. Surrounding chrome uses light screen + restyled header. |
| Pdf Viewer | `src/Screens/CommonScreens/PdfViewer.js` | both | Stack `PdfViewer` | `react-native-pdf` | parentBg | Route params URI | Low | Header + background tokens only. Do not restyle the PDF engine. |
| Update Password | `src/Screens/CommonScreens/UpdatePassword.js` | both | Stack `UpdatePassword` | `CustomTextInput`, `Btn` | Navy rules list | `changeParentPassword` / `changeStudentPassword` | Medium | Restyled inputs/button. Keep field names and validation. |
| Dues | `src/Screens/CommonScreens/Dues.js` | student | Stack `Dues` | `TotalPendingCard`, dues dropdown, `Btn`, `SecurePayments` | parentBg | `STUDENT_DUES` dummy | Low | Light dues cards. Keep dummy source. |

### 3.5 Parent-only stack

| Screen | Path | Role | Navigator | Shared UI | Theme | Data | Complexity | Redesign approach |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Child Profile | `src/Screens/ParentScreens/ChildProfile.js` | parent | Stack `ChildProfile` | Identity + menu items | Navy identity | `useRoleData` child | Medium | Same identity treatment as MyProfile. Keep menu targets. |
| Announcements | `src/Screens/ParentScreens/Announcements.js` | both | Stack `Announcements` | `AnnouncementCard`, child banner | Navy gradient cards | Student + child announcement thunks | Medium | Light announcement cards, category chips. Keep open/detail fetch. |
| Exam Schedule | `src/Screens/ParentScreens/ExamSchedule.js` | parent | Stack `ExamSchedule` | Schedule cards, child banner | Navy | `fetchChildExams` (+ dummy fallback) | Medium | Light schedule rows. Keep child context. |
| Timetable | `src/Screens/ParentScreens/Timetable.js` | both | Stack `Timetable` | Week strip, `ProfileGradientCard` slots | Hardcoded ice `#DCEBFD` + navy selected day | `fetchStudentTimetable` / `fetchChildTimetable` | High | Week chips like Home student chip (navy selected, glass idle). Periods as light rows. Keep day fetch. |
| Parent Diary | `src/Screens/ParentScreens/ParentDiary.js` | parent | Stack `ParentDiary` | `SelectedChildBanner`, gradient diary cards | Navy cards | Dummy `PARENT_DIARY` | Low | Light diary cards. Keep dummy list. |
| Fee | `src/Screens/ParentScreens/Fee.js` | parent | Stack `Fee` | Tabs, gradient hero, action rows | Ice + navy hero | Dummy `PARENT_FEES` via `useRoleData` | High | Hero → navy header strip + light body (Home pattern). Keep tab state and dummy amounts. |
| Transport | `src/Screens/ParentScreens/Transport.js` | parent | Stack `Transport` | Gradient info cards, `DepthIcon` | Ice `#DCEBFD` | Dummy `transportDetails` (API mapper exists but screen still dummy) | Medium | Light info cards. **Do not switch data source.** |
| Child Track | `src/Screens/ParentScreens/ChildTrack.js` | parent | Stack `ChildTrack` | Map PNG, trip steps | Ice bg | `fetchChildTransport` + dummy trip fallback | High | Light step list; map image stays. Keep allocated/not-allocated branches. |

### 3.6 Unregistered

| Screen | Path | Notes |
| --- | --- | --- |
| PlaceholderScreen | `src/Screens/BottomTabScreens/PlaceholderScreen.js` | Empty SafeArea. Not in any navigator. Out of migration scope unless later wired. |

---

## 4. Route alias map (do not duplicate work)

| Component | Tab route | Stack route | Restyle once |
| --- | --- | --- | --- |
| Attendance | `Attends` | `ParentAttendance` | Yes |
| Exam | `Exam` | `ParentResults` | Yes |
| Teacher | `Teachers` | `ParentTeachers` | Yes |
| Menu | `Menu` | `Menu` | Yes |
| MyProfile | `Profile` → wrapper | `MyProfile` | Yes (`isTab` prop only) |

Hidden tabs remain registered (`lazy: false` on Home/Attends/Menu). Do not remove them during UI work.

---

## 5. Cross-screen reusable UI (build / restyle first)

### 5.1 Must restyle before screen migration

1. Design tokens (`Colors.js` + new semantic aliases)
2. `MainHeaderComponent`
3. `EschoolTabBar` (chrome only; keep PNG sources)
4. `NotificationBell`
5. New: `AppScreen` layout, `WelcomeBanner`, `QuickAccessCard`, `GlanceRow`, `GlassCard`, `StudentChip`
6. `Btn`, `CustomTextInput`
7. Identity: `AttendanceStudentDropdown`, `SelectedChildBanner`, `ParentChildCard`, `PersonAvatar`
8. List/stat: `AcademicMenuCard`, `StudentHubCard`, `ParentStatCard`, `ScheduleItem`, `ProfileGradientCard`

### 5.2 Feature cards (restyle with owning screen, then reuse)

Assignment trio, library trio, exam trio, attendance trio, online-class trio, notification/announcement cards, chat trio, ID-card suite, syllabus chapter/topic, fee cards.

### 5.3 Motion wrappers — do not restyle visually

`AnimatedCard`, `ScrollEnterScrollView`, `ScrollEnterFlatList`, `PressableScale`, `useScreenEnterGate`, `useEnterMotion`.

---

## 6. Role matrix

| Surface | Student | Parent |
| --- | --- | --- |
| Home | StudentHome hub + upcoming class | ParentHome stats + schedule + child switch |
| Academics menu | No Fees, no Track Child | Full `MENU_LIST` |
| Attendance / Exam / Teachers | Via menu (and hidden tabs) | Via menu + parent stack names |
| Assignments, Online Class, Online Exam, ID card, Dues | Yes | Assignments reachable; some student-only exams remain dummy |
| Fee, Transport, Child Track, Diary, Child Profile, Exam Schedule | No | Yes |
| Chat, Profile, Notifications, Library, Syllabus, Results, Timetable, Holidays, Announcements | Yes | Yes |

AFN is the only runtime branch for Home. Other screens branch internally with `isParent` / `state.auth.role`.

---

## 7. Proposed redesign patterns (repeatable)

| Pattern ID | Approved Home element | Apply to |
| --- | --- | --- |
| P1 Navy header band | Branded navy top, light body | Home, Fee hero, Role/Splash remain full navy |
| P2 Glass chip | Student · Class pill | Student chip, timetable day, filter chips |
| P3 Search field | Frosted navy or light search | Home, DigitalLibrary, Chat search |
| P4 Welcome / hero illustration | 3D banner | Student Home; Parent Home equivalent (no fake student copy) |
| P5 Quick Access row | Horizontal 3D icon cards | Student Home modules; Parent shortcuts |
| P6 Glance row | Icon + title + meta + chevron | Home glance, Menu rows, Notifications, Teachers, Holidays |
| P7 Light elevated card | White, large radius, soft blue shadow | All inner cards currently using LinearGradient fill |
| P8 Bottom nav | 4 tabs, filled active, gray idle | `EschoolTabBar` only |

`ProfileGradientCard` / filled navy cards become **optional accent** (selected day, primary CTA, splash) rather than the default list treatment.

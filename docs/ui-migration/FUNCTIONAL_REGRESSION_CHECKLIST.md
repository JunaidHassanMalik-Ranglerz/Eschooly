# Eschooly — Functional Regression Checklist

**Status:** Planning only. Execute after each migration wave and again at the end.  
**Authority:** Subordinate to [`MASTER_EXECUTION_PLAN.md`](./MASTER_EXECUTION_PLAN.md)

UI work is presentation-only. If a checkbox fails, revert the visual change that caused it. Do not “fix” APIs, auth, or navigation structure.

Device matrix for each wave: **one small Android (≤5.5")**, **one large Android**, **one iOS**. Portrait only.

---

## 1. How to use

- `[ ]` pending · `[x]` pass · `[F]` fail (note file + wave)
- Run **smoke (section 2)** after every wave
- Run **the wave’s section** after that wave
- Run **this entire file** before calling the redesign done

---

## 2. Smoke (every wave)

- [ ] App launches to Splash, then Role or BottomTab if session exists
- [ ] Parent login still succeeds with a valid family id
- [ ] Student login still succeeds with a valid student id
- [ ] Invalid login still toasts and stays on Register
- [ ] Android hardware back on Home still resets to Auth (AFN back handler)
- [ ] Four tabs still: Home, Academics, Chat, Profile — same order
- [ ] Hidden tab routes still exist internally (no crash if `navigate('Attends')`)
- [ ] Toasts still appear (`react-native-toast-message`)
- [ ] No redbox / fatal after navigation through the four tabs

---

## 3. Authentication and session

- [ ] Splash 5s delay unchanged
- [ ] Saved parent session restores to BottomTab
- [ ] Saved student session restores to BottomTab
- [ ] Role → Parent → Register shows Family ID field
- [ ] Role → Student → Register shows Student ID field
- [ ] Password show/hide toggle
- [ ] Parent logout returns to auth and clears token
- [ ] Student logout returns to auth and clears token
- [ ] 401 on a non-login call still hits unauthorized handler

---

## 4. Student Home

- [ ] `fetchStudentHome` still runs on mount
- [ ] Loader shows while pending
- [ ] Error still toasts `Unable to load home.`
- [ ] Greeting still comes from `useGreeting()`
- [ ] Name is API `student.label`, not a hardcoded mock name
- [ ] Notification bell count uses `unreadNotifications`
- [ ] Bell navigates to `Notification`
- [ ] Hub/Quick Access only shows modules with `modules[key] === true`
- [ ] Each remaining hub target still navigates to the same screen name as today (`OnlineClass`, `Timetable`, `Assignment`, `DigitalLibrary`, `Announcements`, `StudentResults`, `Syllabus`)
- [ ] Upcoming class block only if `modules.online === true` and `upcomingClass` exists
- [ ] Join still navigates to `OnlineClass`
- [ ] Search (if shown) does not invent results; it only opens Digital Library
- [ ] Hamburger (if shown) only opens existing `Menu`
- [ ] Glance Assignment/Result rows are absent unless those fields already exist on the home payload

---

## 5. Parent Home

- [ ] `fetchParentHome` on mount
- [ ] No-children empty copy still appears
- [ ] Selected child banner/chip shows Redux selected child
- [ ] Multi-child switch still opens `ChildSwitchModal` and calls `fetchChildDashboard`
- [ ] Stale dashboard errors still ignored (`error?.stale`)
- [ ] Attendance tile → `ParentAttendance`
- [ ] Library tile → `DigitalLibrary`
- [ ] Announcements tile → `Announcements`
- [ ] Exams tile **does not navigate** (onPress remains commented)
- [ ] Timetable schedule row → `Timetable`
- [ ] Syllabus row → `Syllabus`
- [ ] Results row → `StudentResults`
- [ ] Track Child row → `ChildTrack`
- [ ] Unread bell uses `dashboard.unreadNotifications`

---

## 6. Academics menu

- [ ] Student does not see Fees or Track Child
- [ ] Parent sees Fees and Track Child
- [ ] Each enabled row still uses `item.screen` / `item.parentScreen` / `item.tab` as today
- [ ] Parent child switch on Menu still updates dashboard child
- [ ] Back on Menu header still `navigate('Home')`

---

## 7. Attendance

- [ ] Student fetches `fetchStudentAttendance(monthId)`
- [ ] Parent fetches child attendance for selected child
- [ ] Month dropdown changes refetch
- [ ] History show/hide toggle
- [ ] Parent child switch works
- [ ] Present / Absent / Late / Leave numbers match payload (not restyle artifacts)

---

## 8. Timetable

- [ ] Day change refetches student or child timetable
- [ ] Parent uses selected child id
- [ ] Empty day does not crash
- [ ] Period, subject, time, teacher still bind to mapper fields

---

## 9. Assignments

- [ ] Overview counts from API mapper
- [ ] Subject expand/collapse
- [ ] Detail fetch on open
- [ ] Submit notes + files still posts FormData `files[]`
- [ ] Update submission still PUT
- [ ] Attachment download still works
- [ ] Validation toast when submit empty (`assignmentSubmitRequired`)

---

## 10. Exams and results

- [ ] Student exams overview + history + date range
- [ ] Date range empty copy
- [ ] Parent exam schedule uses `fetchChildExams`
- [ ] Results monthly / year toggle
- [ ] Result PDF download (student and parent print URL) still works
- [ ] Online Exam tabs still switch dummy lists
- [ ] Midterm timer still counts down; answers still stick; jump/flag still work

---

## 11. Digital library, syllabus, holidays, teachers

- [ ] Library search still hits `fetchStudentLibrary` / child library
- [ ] Download → device + PdfViewer
- [ ] Syllabus subject filter and topic lists
- [ ] Holidays list from API
- [ ] Teachers class teacher + subject list
- [ ] Teacher message still `navigateToChat` with params

---

## 12. Online class

- [ ] Live / upcoming / recording tabs
- [ ] Join posts join endpoint and opens meeting URL if returned
- [ ] Reminder post still works
- [ ] Recording download still works
- [ ] Dummy fallback path unused when API returns sessions

---

## 13. Notifications and announcements

- [ ] All / Unread tabs
- [ ] Pull to refresh
- [ ] Mark one read
- [ ] Mark all read confirmation
- [ ] Parent vs student data path unchanged
- [ ] Announcement open still fetches detail for students

---

## 14. Profile, password, ID card

- [ ] Student profile from `fetchStudentProfile`
- [ ] Parent profile from `fetchParentProfile`
- [ ] Update password field names unchanged (parent vs student payloads)
- [ ] Success still navigates as today
- [ ] ID card flip
- [ ] ID card download PDF
- [ ] ID card print

---

## 15. Chat

- [ ] Dummy thread still loads
- [ ] Send appends local message only (no new API)
- [ ] Teacher chat params still override user
- [ ] Keyboard avoiding still works on iOS and Android

---

## 16. Parent fees, transport, track, diary, child profile

- [ ] Fee tabs school / transport still switch dummy objects
- [ ] Amounts unchanged (dummy)
- [ ] Transport unallocated copy
- [ ] Child Track map image still shows
- [ ] Track steps still reflect `fetchChildTransport` when used
- [ ] Diary still lists dummy entries for selected child
- [ ] Child profile menus still navigate

---

## 17. Dues and PDF

- [ ] Dues still dummy `STUDENT_DUES`
- [ ] Pay button still present (even if no gateway)
- [ ] PdfViewer opens route URI; back returns

---

## 18. Visual QA (not a claim of pixel-perfect)

Compare Student Home to `design-reference/approved-home.png` on a ~390dp-wide device:

- [ ] Navy header vs light body
- [ ] Brand navy `#071A3D` (eyedropper vs token)
- [ ] Welcome banner present (art optional if asset missing)
- [ ] Quick Access is a row of glass tiles, not navy gradient blocks
- [ ] Bottom tabs: four items, no new icons files unless approved
- [ ] Poppins in use (not system San Francisco/Roboto-only body)
- [ ] Card radius visually ~16–20pt
- [ ] Soft blue-tinted shadow, not harsh black
- [ ] Safe area: header not under notch/status; tab bar not under home indicator
- [ ] Small screen: Home scrolls; glance/search not clipped irretrievably
- [ ] Large screen: no broken stretch (images contain, chips don’t explode)
- [ ] Simulated glass acceptable (no requirement for true backdrop blur)
- [ ] Contrast: white text on navy; navy text on white
- [ ] Icon-only controls have accessibility labels (bell, hamburger, search)

Repeat a lighter visual pass on Parent Home and one inner screen (Timetable or Menu) for token consistency.

---

## 19. Accessibility and input

- [ ] Hit targets on tabs still easy to tap
- [ ] Disabled buttons still block press (`Btn` loading/disabled)
- [ ] Dropdowns / bottom sheets still open (`OptionPickerSheetModal`, child switch)
- [ ] Android back closes modals before leaving the screen (existing behavior)

---

## 20. Performance sanity

- [ ] Home enter animation still runs (not frozen)
- [ ] Scrolling long lists (notifications, assignments, timetable) remains usable
- [ ] No new dependency in `package.json`

---

## 21. Verification commands

```bash
# JS compile / lint (existing project scripts)
npm run lint
npm test

# Metro
npm start

# Devices
npx react-native run-android
npx react-native run-ios
```

There is no screenshot-diff CI. Visual comparison is manual against `design-reference/approved-home.png`.

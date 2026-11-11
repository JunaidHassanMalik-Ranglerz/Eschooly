# Eschooly — UI Migration Plan

**Status:** Planning only. Do not execute until the Master Execution Plan is approved.  
**Authority:** Subordinate to [`MASTER_EXECUTION_PLAN.md`](./MASTER_EXECUTION_PLAN.md)

This is the dependency-aware sequence. The Master plan copies the same order so there is a single schedule.

---

## 0. Preconditions (no app behavior change)

1. Place the client-approved PNG at `design-reference/approved-home.png`. **DONE** (client upload locked 2026-11-10).
2. Confirm it is the navy-header + welcome-banner + Quick Access composition (see Design System spec §1). **DONE**.
3. Collect 3D/illustration assets listed in `ICON_ASSET_MATRIX.md`. **DONE** — 21 PNGs in `src/Assets/3d/`. Ionicons/`DepthIcon` remain only for unmapped keys (diary, password, chrome). Do not crop the approved PNG.

---

## 1. Foundation (do first — unblocks everything)

**Goal:** tokens and registries exist; no screen look changes yet except unused exports.

| Step | Work | Files allowed | Files forbidden |
| --- | --- | --- | --- |
| 1.1 | Semantic color aliases | `src/Constants/Colors.js` (additive) | Screen files |
| 1.2 | Typography roles | **New** `src/Constants/Typography.js` | `Fonts.js` file names, font binaries |
| 1.3 | Spacing/radius/elevation helpers | **New** `src/Constants/Theme.js` re-export; optional keys on `ProfileTheme.js` | Services, store |
| 1.4 | 3D/illustration registry | `src/Assets/index.js` additive; files under `src/Assets/3d/` | Cropping the mock |
| 1.5 | `FEATURE_ICON_META` art field | `src/Constants/IconTheme.js` additive | Changing icon **names** used as API-independent keys |

**Why first:** every later component reads tokens. Changing colors later causes double restyle.

---

## 2. Shared primitives (do second — minimizes duplicated work)

Build in `src/Component/Glass/` (folder already empty and reserved).

Order:

1. `GlassCard`, `StateView` (loading/empty/error)
2. `SectionHeader`, `GlanceRow`
3. `NavyHeaderBand`, `StudentChip`, `HomeSearchField`, `WelcomeBanner`
4. `QuickAccessCard`
5. `AppScreen` (SafeArea + canvas + optional band)

Then **restyle in place** (same props, new StyleSheet):

6. `Btn`, `CustomTextInput`
7. `NotificationBell` (numeric badge from existing `count`)
8. `MainHeaderComponent`
9. `AttendanceStudentDropdown`, `SelectedChildBanner`, `ParentChildCard`
10. `StudentHubCard` (can become a thin wrapper around `QuickAccessCard` **or** adopt glass 2-col if horizontal row is Home-only)
11. `ParentStatCard`, `AcademicMenuCard`, `ScheduleItem`
12. `ProfileGradientCard` — add `variant="light" | "navy"` defaulting to light after Home ships; do not flip default until callers are migrated

**Do not** restyle `AnimatedCard` motion API.

---

## 3. Navigation chrome (do third)

| Step | Component | Allowed | Forbidden |
| --- | --- | --- | --- |
| 3.1 | `EschoolTabBar` | Colors, active slot shape, label weight, height | Adding/removing tabs; changing route names; replacing PNG `TAB_ICONS`; changing `handlePress` |
| 3.2 | Status bar helper | Home / tab routes use light-content when navy header is on screen | Changing navigator structure |
| 3.3 | `MainHeaderComponent` already restyled | Stack screens pick up chrome for free | Per-screen header forks |

Hamburger on Home: `navigation.navigate('Menu')`. No drawer.

---

## 4. Screen migration (do fourth — Home is the template)

Each screen: restyle JSX/styles only. Keep hooks, dispatch, mappers, alerts, downloads, and route params.

### Wave A — Home (source of truth)

1. `StudentHome.js` — full approved composition  
2. `ParentHome.js` — same shell, parent bindings  

Acceptance: side-by-side with `approved-home.png` on a ~390dp Android emulator.

### Wave B — Screens that inherit header + identity immediately

3. `Menu.js`  
4. `MyProfile.js` (+ `Profile.js` StatusBar)  
5. `Notification.js`  
6. `Chat.js`  

### Wave C — High-traffic academics (shared student/parent)

7. `Timetable.js`  
8. `Attendance.js`  
9. `Assignment.js`  
10. `Exam.js`  
11. `StudentResults.js`  
12. `DigitalLibrary.js`  
13. `Syllabus.js`  
14. `OnlineClass.js`  
15. `Announcements.js`  
16. `Teacher.js`  
17. `Holidays.js`  

### Wave D — Parent modules

18. `Fee.js`  
19. `ExamSchedule.js`  
20. `Transport.js`  
21. `ChildTrack.js`  
22. `ChildProfile.js`  
23. `ParentDiary.js`  

### Wave E — Remaining / lower traffic

24. `StudentIdCard.js` + ID card child components (chrome only)  
25. `OnlineExam.js`  
26. `MidtermMathematics.js`  
27. `UpdatePassword.js`  
28. `Dues.js`  
29. `PdfViewer.js` (header/background only)  

### Wave F — Start surfaces (after tokens are stable)

30. `SplashScreen.js` / `PortalBrand.js`  
31. `Role.js`  
32. `Register.js`  

Splash/Role already use `#071A3D`. They need alignment, not reinvention. Doing them last avoids churn if Home tokens shift during Wave A.

---

## 5. Per-screen presentation rules

### Student Home mapping (no dummy)

| Mock block | Bind to | If empty |
| --- | --- | --- |
| Greeting | existing `useGreeting()` | unchanged |
| Name | `student.label` | hide name line / keep loader |
| Chip | `student.className` / section | hide chip |
| Bell | `unreadNotifications` | hide badge when 0 |
| Search | `navigation.navigate('DigitalLibrary')` | always shown; no local fake results |
| Welcome title | `Welcome back, {firstName}` from `student.label` | generic “Welcome back” |
| Welcome art | `illu.welcomeCapBooks` | omit image, keep text card |
| Quick Access | `HUB_ITEMS.filter(modules[key])` | hide row if none |
| View All | `navigation.navigate('Menu')` | — |
| Glance Next Class | `upcomingClass` | hide row |
| Glance Assignments | **only if already on home payload** — it is not | **omit row** (do not fetch assignments solely for chrome) |
| Glance Latest Result | **not on home payload** | **omit row** |

Do not call new endpoints to fill mock rows. Two glance rows missing is correct until product asks for API work (out of UI scope).

### Parent Home mapping

| Block | Bind to |
| --- | --- |
| Greeting / name | `useGreeting()`, `parent.name` |
| Chip | `SelectedChildBanner` / chip + existing `ChildSwitchModal` |
| Quick Access or stats | existing four `ParentStatCard` actions (Attendance, Library, Exams, Announcements) — restyle to glass; Exams card currently has `onPress` commented — **leave commented** |
| Glance / schedule | existing `ScheduleItem` list + `todayLesson` | 

### Inner screens

Replace filled navy `LinearGradient` list faces with `GlassCard` / light `ProfileGradientCard variant="light"`. Keep status colors. Keep all `onPress` targets.

---

## 6. File modification boundaries

### Allowed

- `src/Screens/**` StyleSheet and presentational JSX
- `src/Component/**` visual components
- `src/Constants/Colors.js`, `IconTheme.js`, **new** `Typography.js` / `Theme.js`
- `src/Assets/index.js` additive + new image files
- `src/Constants/MyStyling.js` status bar colors for Home
- `src/Navigations/EschoolBottomTab/BottomNavigation.js` **styles and tab item layout only**
- `src/Constants/Strings.js` only if a visible label must match the mock (“Quick Access”, “Today at a glance”, “View All”, “Welcome back”). Do not rename existing functional strings used as logic keys (`Strings.monthly`, tab ids, etc.) without audit.

### Forbidden

- `src/services/**`, `src/api/**`, `src/store/**` (including extra fetches for glance rows)
- `src/context/RoleContext.js` role rules
- Navigator route tables (adding/removing screens or tabs)
- Auth thunks, password payloads, FormData keys
- Dummy data **contents** (IDs, amounts). Visual fields such as `iconBg` on dummy objects may change when that screen is restyled.
- `package.json` dependencies
- Android/iOS native projects except if a font already listed must be referenced (should not be needed)
- Cropping the approved screenshot
- Git commits unless later requested

### Gray — ask before touching

- `useRoleData.js` (feeds dummy into live screens)
- `MENU_LIST` icon fields (presentation config; routes must stay)
- Uncommenting Parent Home exams `onPress`

---

## 7. Dependencies between waves

```
Tokens → Glass primitives → Header + Tab bar → StudentHome
                                              → ParentHome
StudentHome tokens stable → Menu, Profile, Notifications
Menu restyle → AcademicMenuCard callers done
Identity restyle → Attendance, Library, Diary, ExamSchedule banners
ProfileGradientCard light variant → Timetable, Fee, Announcements, Syllabus
Auth last
```

---

## 8. Estimated scope

| Wave | Surfaces | Relative effort |
| --- | --- | --- |
| Foundation | 5 files + assets | S |
| Primitives + in-place shared | ~20 components | M |
| Navigation chrome | 2 files | S |
| Wave A Home | 2 screens | L (Student Home is the risk) |
| Wave B | 4 screens | M |
| Wave C | 11 screens | L |
| Wave D | 6 screens | M |
| Wave E | 6 screens | S–M |
| Wave F | 3 screens + PortalBrand | M |
| QA pass | all 33 surfaces | L |

**~33 visual surfaces, ~100 component files of which ~25 are shared chrome, 0 new dependencies, 0 API changes.**

---

## 9. Stop conditions (do not improvise)

- Approved PNG is a different composition than navy + welcome + Quick Access
- A restyle appears to need a new endpoint
- A restyle appears to need a new tab or drawer
- 3D assets are delivered as a flattened mock-only sheet with no individuals
- Any test or flow in `FUNCTIONAL_REGRESSION_CHECKLIST.md` fails after a wave — fix presentation, do not “simplify” logic

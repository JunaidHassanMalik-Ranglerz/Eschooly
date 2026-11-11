# Eschooly UI Redesign — Master Execution Plan

**This is the single source of truth.** Other files in this folder are evidence and detail. If they disagree with this document, this document wins.

| Field | Value |
| --- | --- |
| Status | **STUDENT HOME IMPLEMENTED — WAITING FOR HOME ACCEPTANCE** |
| Mode | Presentation layer only |
| Implementation | Foundation + Student Home (Phase 4.1) done. Parent Home and inner screens **not** started. |
| Date | 2026-11-10 |
| App | Eschooly, React Native `0.86.0`, React `19.2.3`, New Architecture, Hermes, JS screens |

Supporting documents (do not treat as alternate plans):

- [`PROJECT_UI_AUDIT.md`](./PROJECT_UI_AUDIT.md)
- [`SCREEN_INVENTORY.md`](./SCREEN_INVENTORY.md)
- [`DESIGN_SYSTEM_SPEC.md`](./DESIGN_SYSTEM_SPEC.md)
- [`ICON_ASSET_MATRIX.md`](./ICON_ASSET_MATRIX.md)
- [`UI_MIGRATION_PLAN.md`](./UI_MIGRATION_PLAN.md)
- [`FUNCTIONAL_REGRESSION_CHECKLIST.md`](./FUNCTIONAL_REGRESSION_CHECKLIST.md)

After approval, execute **this** sequence and tick the checklist in §9 of **this** file. Do not write a second plan.

---

## 1. Confirmed architecture

- Bare React Native CLI app (`App.js` → `MainNavigation`).
- Navigators: native stack (main) → auth stack (`Register` only) + custom bottom tabs.
- Visible tabs: Home, Academics (`Menu`), Chat, Profile. Hidden but registered: Attends, Exam, Teachers.
- Home route `AFN` switches `StudentHome` / `ParentHome` via `useRoleData().isParent`.
- State: Redux Toolkit + persist (auth) + `RoleContext`.
- Data: axios `https://ranglerz.click/eschool/public/api` plus remaining dummy screens (Chat, Fee, Dues, Online Exam, Diary, parts of ID card).
- Styling: per-file `StyleSheet`, `wp`/`hp`, `Colors.js` already contains `#071A3D`, Poppins + Roboto bundled, Ionicons + PNG assets, LinearGradient navy cards, Reanimated enter motions.
- Empty reserved folders: `src/Component/Glass`, `src/Component/Timetable`.
- Installed but unused: drawer navigator, material top tabs. **Do not start using them** for the hamburger.

---

## 2. Approved design requirements

### 2.1 Source

- Official path: [`design-reference/approved-home.png`](../../design-reference/approved-home.png) — **now in the repo**.
- Locked from the client-uploaded Student Home (Fatima Ahmadi, Student · Class 10 A). Same composition as the previously analyzed Downloads stand-in.
- Confirmed anatomy: navy header + brand/bell row, hamburger + greeting, glass role chip, dark search, welcome banner with 3D cap/books, glass Quick Access (5 tiles), Today at a glance rows, 4-tab bar (Home · Academics · Chat · Profile).
- **EXACT brand color:** `#071A3D`.
- Other tokens: **ESTIMATED** — see Design System spec. Do not invent extra precision.

**R1 is closed.** If a later file is supplied that is not this navy+welcome composition, **stop**.

### 2.2 Product rules from the brief (binding)

- Presentation only. No API, auth, DB, navigation-tree, or business-rule changes.
- Do not crop icons from the full mock; require individual transparent assets.
- Do not replace bottom-tab PNG icons unless later approved.
- Do not add dummy data to fill mock rows (no fake “4 Submitted” / “A+” on Home).
- Maximum achievable fidelity, not a claim of pixel-perfect on every device.
- Glassmorphism: simulated with existing libraries (no new blur dependency).

### 2.3 Open UI mappings (approved unless the owner objects)

| Mock element | Implementation |
| --- | --- |
| Hamburger | `navigation.navigate('Menu')` — no drawer |
| Search | Navigate to existing `DigitalLibrary` — no Home search API |
| Welcome carousel dots | Single slide from live first name; hide dots |
| Quick Access “5 cards” | Horizontal scroll of **API-enabled** `HUB_ITEMS` (may be fewer or more than 5) |
| View All | `Menu` |
| Glance Assignments / Latest Result | **Omit** until those fields exist on `/student/home` |
| Tab active color | Prefer mock blue `#2563EB`; if it fights brand navy, keep `#071A3D` after Home compare |
| Parent Home | Same shell; child chip + existing dashboard bindings; do not uncomment exams `onPress` |

---

## 3. Complete migration scope

### In scope (33 visual surfaces)

Splash, Role, Register, StudentHome, ParentHome, Menu, Chat, MyProfile, Attendance, Exam, Teacher, Syllabus, Assignment, DigitalLibrary, StudentResults, Holidays, Notification, OnlineClass, OnlineExam, MidtermMathematics, StudentIdCard, PdfViewer, UpdatePassword, Dues, ChildProfile, Announcements, ExamSchedule, Timetable, ParentDiary, Fee, Transport, ChildTrack, plus tab bar and shared components those screens use.

### Explicitly out of scope

- `AFN.js` logic (keep)
- `PlaceholderScreen.js` (unregistered)
- New endpoints, dummy→API migrations, Fee/Chat backends
- Drawer, extra tabs, replacing tab PNGs
- New npm packages
- Native project changes
- Commits unless requested

### Shared work that must happen once

Tokens, Glass primitives, Header, Tab bar, Bell, Btn, Input, identity banners, hub/menu/stat/schedule cards.

---

## 4. Exact implementation order

Do not skip ahead of a failed regression smoke.

### Phase 0 — Preconditions

0. Copy approved PNG → `design-reference/approved-home.png` — **DONE** (client upload, 2026-11-10)
1. Confirm composition vs Design System spec §1 — **DONE** (navy header, welcome banner, glass Quick Access, 3D icons, glance list, 4-tab bar)
2. Drop any delivered 3D/illustration files into `src/Assets/3d/` — **DONE** (21 transparent PNGs from `eschooly-approved-ui-assets/`, registered in `EducationIcons.js`). Do not crop the approved PNG. Diary / ID-card / brand-cap remain optional later assets.

### Phase 1 — Foundation

1. Additive semantic aliases in `src/Constants/Colors.js`
2. New `src/Constants/Typography.js`
3. New `src/Constants/Theme.js` barrel
4. Additive `src/Assets/index.js` keys
5. Additive art fields on `src/Constants/IconTheme.js`

### Phase 2 — Shared UI primitives

1. `GlassCard`, `StateView`, `SectionHeader`, `GlanceRow`
2. `NavyHeaderBand`, `StudentChip`, `HomeSearchField`, `WelcomeBanner`, `QuickAccessCard`, `AppScreen`
3. In-place restyle: `Btn`, `CustomTextInput`, `NotificationBell`, `MainHeaderComponent`
4. In-place restyle: `AttendanceStudentDropdown`, `SelectedChildBanner`, `ParentChildCard`
5. In-place restyle: `StudentHubCard`, `ParentStatCard`, `AcademicMenuCard`, `ScheduleItem`
6. `ProfileGradientCard` light variant (default unchanged until callers migrate)

### Phase 3 — Navigation chrome

1. `EschoolTabBar` styles/layout only
2. `MyStyling.js` / Home `StatusBar` for light-content on navy header

### Phase 4 — Home

1. `StudentHome.js` (reference implementation)
2. `ParentHome.js`
3. Smoke + Student Home visual compare

### Phase 5 — Tab siblings

1. `Menu.js`
2. `MyProfile.js` + Profile StatusBar
3. `Notification.js`
4. `Chat.js`

### Phase 6 — Academic stack

Timetable → Attendance → Assignment → Exam → StudentResults → DigitalLibrary → Syllabus → OnlineClass → Announcements → Teacher → Holidays

### Phase 7 — Parent modules

Fee → ExamSchedule → Transport → ChildTrack → ChildProfile → ParentDiary

### Phase 8 — Remaining

StudentIdCard chrome → OnlineExam → MidtermMathematics → UpdatePassword → Dues → PdfViewer chrome

### Phase 9 — Start surfaces

PortalBrand / Splash → Role → Register

### Phase 10 — Full QA

Entire `FUNCTIONAL_REGRESSION_CHECKLIST.md` + visual pass on Home, Menu, Timetable, Profile, Register.

---

## 5. File modification boundaries

### Allowed

`src/Screens/**` presentation, `src/Component/**`, additive Constants/Assets listed above, `BottomNavigation.js` styles, `MyStyling.js` colors, additive `Strings.js` labels (`Quick Access`, `Today at a glance`, `View All`, `Welcome back`).

### Forbidden

`src/services/**`, `src/api/**`, `src/store/**`, `RoleContext` rules, navigator route lists, auth payloads, dummy **data** records, `package.json` deps, cropping the mock, git commits (until asked).

### Do not “complete” a screen by fetching extra APIs

Home glance holes stay empty.

---

## 6. Dependencies

| This | Needs |
| --- | --- |
| Any screen restyle | Phase 1 tokens |
| StudentHome | Phase 2 primitives + Phase 3 tab/header |
| ParentHome | StudentHome shell pattern |
| Menu | `AcademicMenuCard` restyle |
| Inner lists | `GlassCard` / light `ProfileGradientCard` |
| Visual sign-off vs mock | 3D + welcome illustration files |
| Auth restyle | Stable tokens after Home |

No new runtime dependencies.

---

## 7. Acceptance criteria

A wave is done only when:

1. Listed files in that wave are restyled to tokens (no leftover local `#071A3D` / `#DCEBFD` on that screen unless re-exported from `Colors`).
2. Smoke checklist §2 is green.
3. That wave’s functional section in the regression file is green.
4. Enter animations still run.
5. Navigation targets and API calls are unchanged (diff review: no service/store edits).
6. Student Home (Phase 4) additionally matches approved anatomy: navy band, chip, search, welcome, quick access, glance (available rows only), four tabs.

Final acceptance:

- All 33 surfaces migrated or explicitly deferred in §9 with owner sign-off
- Full regression file green on Android small + large + one iOS
- No new packages
- Tab PNG files unchanged
- No dummy home metrics

---

## 8. Verification commands

```bash
npm run lint
npm test
npm start
npx react-native run-android
npx react-native run-ios
```

Foundation verification (2026-11-10, Node 22.23.3):

- ESLint on new/changed foundation files: **pass** (pre-existing duplicate keys in `Strings.js` at `downloadPdf` / `download` are unrelated).
- Metro Android JS bundle: **pass** (`index.js` → bundle; 136 assets copied; 3D welcome asset present in bundle).
- `npm test`: **blocked (pre-existing)** — `jest.config.js` points at `@react-native/jest-preset`, which is not installed. Did **not** add that package. Foundation unit file: `__tests__/themeFoundation.test.js`.
- Device `run-android` / `run-ios`: not run (no screen wiring; no visual change to exercise).

Manual: `FUNCTIONAL_REGRESSION_CHECKLIST.md`.  
Visual: side-by-side `design-reference/approved-home.png` vs Student Home screenshot **after Phase 4 approval**.

---

## 9. Progress tracking

Update **this table only** during implementation. Do not create another tracker.

| ID | Item | Status |
| --- | --- | --- |
| P0.0 | Approved PNG at `design-reference/approved-home.png` | DONE |
| P0.1 | Composition confirmed | DONE |
| P0.2 | 3D/illustration assets in `src/Assets/3d/` | DONE (21 PNGs). Diary/ID/cap optional later. |
| P1.1 | Color aliases | DONE |
| P1.2 | Typography.js | DONE |
| P1.3 | Theme.js | DONE |
| P1.4 | Asset registry | DONE |
| P1.5 | IconTheme art fields | DONE |
| P2.1 | Glass primitives | DONE (unused by screens) |
| P2.2 | Home-specific primitives | DONE (unused by screens) |
| P2.3 | Btn / Input / Bell / Header | PARTIAL — `NotificationBell` numeric badge is opt-in (`numeric`); default dot unchanged. Btn/Input/Header still deferred. |
| P2.4 | Identity banners | DEFERRED until Home / inner-screen waves |
| P2.5 | Hub / stat / menu / schedule cards | DEFERRED — `QuickAccessCard` / `GlanceRow` prepared; live cards unchanged |
| P2.6 | ProfileGradientCard light variant | DONE (`variant="light"`; default navy unchanged) |
| P3.1 | Tab bar chrome | DONE — PNG sources kept; raised circle removed; active tint `#2563EB` |
| P3.2 | Status bar for navy header | DONE — Student Home only (`setBlueStatusBar` on focus) |
| P4.1 | StudentHome | DONE |
| P4.2 | ParentHome | NOT STARTED — not approved this wave |
| P4.3 | Home visual + smoke | BLOCKED — no authenticated device screenshot yet |
| P5.1 | Menu | NOT STARTED |
| P5.2 | MyProfile | NOT STARTED |
| P5.3 | Notification | NOT STARTED |
| P5.4 | Chat | NOT STARTED |
| P6.1 | Timetable | NOT STARTED |
| P6.2 | Attendance | NOT STARTED |
| P6.3 | Assignment | NOT STARTED |
| P6.4 | Exam | NOT STARTED |
| P6.5 | StudentResults | NOT STARTED |
| P6.6 | DigitalLibrary | NOT STARTED |
| P6.7 | Syllabus | NOT STARTED |
| P6.8 | OnlineClass | NOT STARTED |
| P6.9 | Announcements | NOT STARTED |
| P6.10 | Teacher | NOT STARTED |
| P6.11 | Holidays | NOT STARTED |
| P7.1 | Fee | NOT STARTED |
| P7.2 | ExamSchedule | NOT STARTED |
| P7.3 | Transport | NOT STARTED |
| P7.4 | ChildTrack | NOT STARTED |
| P7.5 | ChildProfile | NOT STARTED |
| P7.6 | ParentDiary | NOT STARTED |
| P8.1 | StudentIdCard | NOT STARTED |
| P8.2 | OnlineExam | NOT STARTED |
| P8.3 | MidtermMathematics | NOT STARTED |
| P8.4 | UpdatePassword | NOT STARTED |
| P8.5 | Dues | NOT STARTED |
| P8.6 | PdfViewer | NOT STARTED |
| P9.1 | Splash / PortalBrand | NOT STARTED |
| P9.2 | Role | NOT STARTED |
| P9.3 | Register | NOT STARTED |
| P10 | Full regression + visual QA | NOT STARTED |

Status vocabulary: `NOT STARTED` | `IN PROGRESS` | `DONE` | `BLOCKED` | `DEFERRED`.

---

## 10. Risks and blockers (now)

| ID | Risk | Impact | Mitigation |
| --- | --- | --- | --- |
| R1 | `design-reference/approved-home.png` missing | Tokens could track the wrong mock | **RESOLVED** — client upload locked at that path; composition matches Design System spec §1 |
| R2 | 3D assets missing | Home cannot match mock icons | **RESOLVED for Home** — 21 PNGs registered. Remaining gaps: diary, optional ID/cap. Do not use DepthIcon as final Home feature art. |
| R3 | Home mock shows data the API does not return | Temptation to dummy-fill | Omit glance rows; no extra fetches |
| R4 | Hamburger implies a drawer | Scope creep | Map to `Menu` |
| R5 | True backdrop blur not available | Glass will look flatter on Android | Simulated glass; stated in spec |
| R6 | Inner screens are navy-filled; Home is light | Inconsistent app if Home ships alone | Do not stop after Phase 4 |
| R7 | `useRoleData` still mixes dummy | Restyling may surface dummy names | Do not “fix” data layer |
| R8 | `PopupProvider` imported but unmounted | Unrelated | Do not mount it as part of UI migration |
| R9 | Register prefilled demo credentials | Must survive restyle | Do not clear defaults |
| R10 | Tab active color navy vs mock blue | Brand tension | Compare on device in Phase 4; pick one and lock in tokens |

---

## 11. Post-approval protocol

1. Owner replies that **this Master Execution Plan is approved**. The Home PNG is already locked; no further PNG confirmation is required unless a different file is supplied.
2. Implementer sets status at top of this file to `APPROVED — IMPLEMENTING`.
3. Work Phase 0 → 10 in order, ticking §9 here after each item.
4. No new planning documents. No re-audit unless R1/R2/R3 becomes a genuine blocker.

**Foundation (Phases 0–2 tokens, registry, unused primitives) is complete.** Live screens, tab bar, Btn, inputs, and Student Home are unchanged.

**STOP. Student Home is implemented. Waiting for Home visual acceptance before Parent Home or any inner-screen wave.**

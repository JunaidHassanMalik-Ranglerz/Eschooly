# Eschooly — Icon and Asset Replacement Matrix

**Status:** Planning only. No assets were cropped, replaced, or added.  
**Authority:** Subordinate to [`MASTER_EXECUTION_PLAN.md`](./MASTER_EXECUTION_PLAN.md)

---

## 1. Classification

| Class | Meaning | Default action |
| --- | --- | --- |
| 1 Standard vector | Ionicons / existing tinted PNG chrome | Keep; retint to tokens |
| 2 Premium 3D educational | Feature shortcuts matching the approved Home | **New transparent PNG/WebP required** |
| 3 Illustrations | Welcome banner art, splash extras | **New transparent PNG required** |
| 4 Application images | Photos, maps, QR, auth headers, tab icons | Keep |
| 5 Missing | Needed by approved UI, not in repo | Commission or licensed pack |

**Do not** slice icons out of `design-reference/approved-home.png`. That file is a composition, not an asset sheet. Commission individual transparent PNGs.

**Do not** replace bottom-tab PNGs unless a later approval explicitly says so.

---

## 2. Existing application images (Class 4 — keep)

Registered in `src/Assets/index.js`:

| Key | File | Typical use | Action |
| --- | --- | --- | --- |
| `homeIcon` | `HomeIcon.png` | Tab Home | Keep |
| `menuIcon` | `Menu.png` | Tab Academics | Keep |
| `messageIcon` | `Messageicon.png` | Tab Chat; some profile rows | Keep |
| `profileIcon` | `ProfileIcon.png` | Tab Profile | Keep |
| `attendsIcon` | `AttendsIcon.png` | Hidden Attends tab | Keep |
| `examIcon` | `ExamIcon.png` | Hidden Exam tab | Keep |
| `teacherIcon` | `TeacherIcon.png` | Hidden Teachers tab | Keep |
| `notification` | `Notification.png` | Bell | Keep; optional numeric overlay |
| `avator` | `Avator.png` | Fallback avatar | Keep |
| `transportMap` | `TransportMap.png` | Child Track | Keep |
| `qrcode` | `Qrcode.png` | ID card | Keep |
| `authHeader` | `AuthHeader.png` | Legacy auth (PortalBrand may not use it) | Keep |
| `parentPortal` | `ParentPortal.png` | Large legacy art | Keep; unused on approved Home |
| Profile JPEGs | `src/Assets/Profile/**` | `PersonAvatar` | Keep |

Legacy feature PNGs (`Clock.png`, `Library.png`, `Exams.png`, `lecture.png`, …) are still referenced from `MENU_LIST` / `PROFILE_MENU_LIST`. After Academics restyle, those list icons should come from Class 2 (3D) or Ionicons via `FEATURE_ICON_META`, not from these flat PNGs. **Do not delete the files** until no `Images.*` reference remains.

---

## 3. Required new assets (Class 2 + 3)

Expected format: **PNG (or WebP) with alpha**, @2x and @3x (or a single @3x scaled down). Place in `src/Assets/3d/` and register in `src/Assets/index.js`.

Dimensions are **ESTIMATED** from the mock on a ~390×844 frame. They are starting sizes, not lockups.

| ID | Component | Expected px (1x logical) | Format | Reuse | Source availability |
| --- | --- | --- | --- | --- | --- |
| `illu.welcomeCapBooks` | Welcome banner | 220×160 | PNG alpha | Student Home; optional Parent Home | **In repo** `welcome-graduation-books.png` |
| `brand.capMark` | Header wordmark | 28×28 | PNG alpha or keep Ionicons `school` | Splash, Role, Home header | **Keep vector** — Ionicons `school` |
| `3d.onlineClasses` | Quick Access + glance | 56×56 | PNG alpha | Home, Menu, Online Class empty | **In repo** |
| `3d.timetable` | Quick Access | 56×56 | PNG alpha | Home, Menu, Timetable header | **In repo** |
| `3d.assignments` | Quick Access + glance | 56×56 | PNG alpha | Home, Menu, Assignment | **In repo** |
| `3d.library` | Quick Access | 56×56 | PNG alpha | Home, Menu, Library | **In repo** |
| `3d.results` | Quick Access + glance | 56×56 | PNG alpha | Home, Menu, Results | **In repo** |
| `3d.atom` / next-class | Glance “Next Class” | 48×48 | PNG alpha | Student Home glance | **In repo** `physics-atom.png` |
| `3d.resultBadge` | Glance Latest Result | 48×48 | PNG alpha | Student Home glance | **In repo** `result-badge.png` |
| `3d.announcements` | Parent stats / Menu | 56×56 | PNG alpha | Parent Home, Announcements | **In repo** |
| `3d.syllabus` | Menu / student hub overflow | 56×56 | PNG alpha | Menu, Syllabus | **In repo** |
| `3d.subjects` | Academics / subjects | 56×56 | PNG alpha | Menu | **In repo** |
| `3d.attendance` | Parent stats / Menu | 56×56 | PNG alpha | Parent Home, Attendance | **In repo** |
| `3d.exams` | Exam schedule and exam list | 56×56 | PNG alpha | Parent Home, Exam | **In repo** — **not** for online exam-taking UI |
| `3d.teachers` | Menu | 56×56 | PNG alpha | Teachers | **In repo** — visual only where navigable |
| `3d.holidays` | Menu | 56×56 | PNG alpha | Holidays | **In repo** — visual only where navigable |
| `3d.fee` | Menu / Fee | 56×56 | PNG alpha | Fee | **In repo** — information icon only; no payment claim |
| `3d.transport` | Menu / Track | 56×56 | PNG alpha | Transport, Child Track | **In repo** — not live GPS |
| `3d.notifications` | Notification entry | 56×56 | PNG alpha | Notification screen header | **In repo** — do not replace tab/bell PNG |
| `3d.profile` | Profile information card | 56×56 | PNG alpha | Profile heroes | **In repo** — do not replace tab PNG |
| `3d.linkedChildren` | Parent linked children | 56×56 | PNG alpha | Parent Home / child switch | **In repo** |
| `3d.childJourney` | Parent child-journey **steps** | 56×56 | PNG alpha | Child Track steps | **In repo** — not GPS tracking |

Registry: `src/Assets/EducationIcons.js` (`getFeatureArt(key)`). Render with `FeatureArtImage` (`resizeMode="contain"`). Do **not** pass these through `DepthIcon` (it tints).

**Licensing:** pack is original isolated renders, not crops of the screenshot. Do not scrape the mock.

---

## 4. Screen × icon matrix

Legend: **V** = vector (keep), **P** = existing PNG (keep), **3D** = new, **I** = illustration, **—** = none.

### 4.1 Start / auth / chrome

| Screen | Icon / component | Existing | Replacement | Dim | Format | Reuse | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Splash | PortalBrand cap | Ionicons `school` (V) | Optional `brand.capMark` else keep | 28 | PNG/V | Splash, Role, Home | Fallback available |
| Role | people / school | Ionicons (V) | Keep | 9.5wp | V | Role only | Available |
| Role | arrow-forward | Ionicons (V) | Keep | 5wp | V | — | Available |
| Register | input icons, eye | Ionicons (V) | Keep | 5wp | V | Inputs | Available |
| Tab bar | Home/Menu/Chat/Profile | PNG tab set (P) | **Keep files**; retint | ~5.8wp | PNG | Tabs | Available |
| Headers | chevron-back | Ionicons (V) | Keep | 5.5wp | V | All stack | Available |
| Headers | bell | `Images.notification` (P) | Keep PNG; add numeric badge | 5.5wp | PNG | All | Available |
| Home | hamburger | none | Ionicons `menu` (V) → navigate `Menu` | 24 | V | Home | Available |
| Home | search / sliders | none | Ionicons `search`, `options-outline` (V) | 20 | V | Home, Library | Available |
| Home | chip chevron | none | Ionicons `chevron-down` (V) | 16 | V | Chip | Available |
| Home | glance chevron | none | Ionicons `chevron-forward` (V) | 18 | V | Glance, lists | Available |

### 4.2 Home feature icons

| Screen | Icon / component | Existing | Replacement | Dim | Format | Reuse | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| StudentHome | Hub Online | `DepthIcon` videocam | `3d.onlineClasses` | 56 | PNG | QA, Menu | In repo |
| StudentHome | Hub Timetable | `DepthIcon` time | `3d.timetable` | 56 | PNG | QA, Menu | In repo |
| StudentHome | Hub Assignments | `DepthIcon` document-text | `3d.assignments` | 56 | PNG | QA, Menu | In repo |
| StudentHome | Hub Library | `DepthIcon` library | `3d.library` | 56 | PNG | QA, Menu | In repo |
| StudentHome | Hub Announcements | `DepthIcon` megaphone | `3d.announcements` | 56 | PNG | Parent/Menu | In repo |
| StudentHome | Hub Results | `DepthIcon` trophy | `3d.results` | 56 | PNG | QA, Menu | In repo |
| StudentHome | Hub Syllabus | `DepthIcon` book | `3d.syllabus` | 56 | PNG | Menu | In repo |
| StudentHome | Welcome art | none | `illu.welcomeCapBooks` | 220×160 | PNG | Home | In repo |
| StudentHome | Glance next class | `DepthIcon` videocam | `physics-atom.png` | 48 | PNG | Glance | In repo |
| StudentHome | Upcoming join | Ionicons time (V) | Keep | 3.6wp | V | — | Available |
| ParentHome | Stat attendance | Ionicons calendar (V) | `3d.attendance` | 48 | PNG | Menu | In repo |
| ParentHome | Stat library | Ionicons library (V) | `3d.library` | 48 | PNG | Shared | In repo |
| ParentHome | Stat exams | Ionicons clipboard (V) | `3d.exams` | 48 | PNG | Menu | In repo |
| ParentHome | Stat announcements | Ionicons megaphone (V) | `3d.announcements` | 48 | PNG | Shared | In repo |
| ParentHome | Schedule rows | Ionicons per item (V) | 3D if mapped else V | 48 | mixed | — | Partial |

Student Home Quick Access in the mock shows **five** items (Online, Timetable, Assignments, Library, Results). Live `HUB_ITEMS` has seven keys filtered by `modules`. **Do not drop modules the API enables.** Horizontal scroll the row; “View All” goes to `Menu`. That is navigation that already exists.

### 4.3 Academics and shared lists

| Screen | Icon / component | Existing | Replacement | Dim | Format | Reuse | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Menu | Each `MENU_LIST` row | `FEATURE_ICON_META` + DepthIcon; `Images.*` unused in card | 3D per feature, V fallback | 48 | mixed | Home | In repo except diary |
| Attendance | present/absent/late/leave | Ionicons + hex | Keep V; retint to tokens | 22 | V | Attendance | Available |
| Timetable | period / subject | Gradient cards; Ionicons | Light row + subject V or 3D syllabus | 24 | V | — | Available |
| Assignment | type/status | Ionicons | Keep V status; 3D header | 22 | mixed | — | Partial |
| Exam | overview stats | Ionicons | Keep V | 22 | V | — | Available |
| Results | subject glyphs | Ionicons map | Keep V | 22 | V | — | Available |
| Syllabus | chapter/topic checks | Ionicons | Keep V | 18 | V | — | Available |
| Library | file/download/search | Ionicons | Keep V; search chrome matches Home | 20 | V | Home search | Available |
| Holidays | type | Ionicons | Keep V or `3d.holidays` | 24 | mixed | Menu | Partial |
| Teachers | people / message | Ionicons | Keep V; optional `3d.teachers` | 24 | mixed | — | Partial |
| Notifications | per-type | Ionicons from `FEATURE_ICON_META` | Keep V | 22 | V | — | Available |
| Announcements | category | Ionicons | Keep V; optional 3D header | 22 | V | — | Available |
| Online Class | live/upcoming/record | Ionicons + `videoIcon` PNG | Keep V/P | 22 | mixed | — | Available |
| Chat | send, pin, bubbles | `Images.send`, `pin`; Ionicons | Keep | 22 | mixed | Chat | Available |
| Profile | menu rows | Mix Images + Ionicons | Keep; retint | 22 | mixed | — | Available |
| ID card | flip, download, print | Ionicons | Keep | 22 | V | — | Available |
| Fee | tab actions | Ionicons + `PayAfn` PNG | Keep; optional `3d.fee` | 22 | mixed | — | Partial |
| Transport / Track | bus, steps | Ionicons + map PNG | Keep map; optional `3d.transport` | 24 | mixed | — | Partial |
| Update Password | lock, checks | Ionicons | Keep | 18 | V | — | Available |
| Dues | pay | `Images.payAfn` | Keep | 20 | PNG | Dues | Available |

---

## 5. Illustration notes

Welcome banner uses the supplied `welcome-graduation-books.png` (cap + stacked books). Do not crop extra pieces from the screenshot. Pencil cup / plant from earlier mocks are **not** in the locked PNG or the asset pack — omit them.

Pagination dots imply multiple banners. **There is no CMS.** Ship **one** live slide (greeting + first name from API). Extra slides would be dummy content — forbidden. Hide dots when `length === 1`.

---

## 6. Registry (implemented)

`src/Assets/EducationIcons.js` + `getFeatureArt(key)`. `FEATURE_ICON_META.art` is additive. `QuickAccessCard` / `GlanceRow` accept `art` and fall back to `DepthIcon` only when art is missing. Live `StudentHubCard` / `AcademicMenuCard` are **not** rewritten yet.

---

## 7. Home 3D blocker

**Closed for Home Quick Access + welcome illustration.** Visual Home QA can proceed after Student Home is approved for implementation.

---

## 8. Missing 3D assets (do not invent replacements)

| Priority | Feature | Screen | Existing icon | Required replacement | Size | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| P2 | Parent diary | `ParentDiary` | Ionicons `journal` / DepthIcon | Transparent 3D diary/journal PNG | 56×56 logical | Educational feature card; no pack file |
| P3 | Student ID card | `StudentIdCard`, profile menu | `Images.idCard` | Optional 3D ID-card PNG | 56×56 | Keep existing PNG until supplied |
| P3 | Brand cap mark | Splash, Home wordmark | Ionicons `school` | Optional 28×28 cap PNG | 28×28 | Vector is acceptable |
| — | Online exam taking | `OnlineExam`, `MidtermMathematics` | Ionicons / `Images.exams` | **None** | — | Pack `exams.png` is **not** for this UI |
| — | Chat chrome | Chat tab, send, pin | Tab PNG + `Images.send` / `pin` | **None** | — | Keep navigation PNGs |
| — | Password | `UpdatePassword` | Ionicons `lock-closed` | **None** | — | Functional vector |
| — | Dues pay mark | Dues / Fee CTA | `Images.payAfn` | **None** | — | Keep; `fees.png` is info-only |

Engineering will not generate visually inconsistent substitutes. Commission matching pack style if diary/ID/cap are required for later screen waves.

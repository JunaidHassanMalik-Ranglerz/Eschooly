# Eschooly — Project UI Audit

**Status:** Planning only. No application source was modified.  
**Date:** 2026-11-10  
**Authority:** Subordinate to [`MASTER_EXECUTION_PLAN.md`](./MASTER_EXECUTION_PLAN.md)

---

## 1. Confirmed stack

| Item | Verified value | Evidence |
| --- | --- | --- |
| App name | `Eschooly` | `package.json`, `app.json` |
| React | `19.2.3` | `package.json` |
| React Native | `0.86.0` | `package.json` |
| Architecture | New Architecture enabled (Fabric / TurboModules) | `android/gradle.properties` `newArchEnabled=true`; `ios/Eschooly/Info.plist` `RCTNewArchEnabled=true` |
| JS engine | Hermes | `android/gradle.properties` `hermesEnabled=true` |
| Language | JavaScript (not TypeScript runtime). `tsconfig.json` exists; screens and components are `.js` | `src/**/*.js` |
| Entry | `index.js` → `App.js` | `index.js` |
| Android minSdk | 24 | `android/build.gradle` |
| Android compileSdk | 36 | `android/build.gradle` |
| iOS orientation | Portrait only | `Info.plist` |
| Node | `>= 22.11.0` | `package.json` `engines` |

This is a **bare React Native CLI app**, not Expo.

---

## 2. Folder structure (source of truth)

```
Eschooly/
  App.js
  index.js
  assets/fonts/          Poppins + Roboto TTF files
  src/
    api/                 axiosInstance.js
    Assets/              PNG/JPG registry + profile photos
    Component/           100+ presentational components
      Glass/             empty (reserved)
      Timetable/         empty (reserved)
    Constants/           Colors, Fonts, Fontsize, Strings, dummydata, CardTheme, IconTheme
    context/             RoleContext, PopupContext
    hooks/               useRoleData, enter-motion, useProfileStudent
    Navigations/         Main, Auth, Bottom tabs
    Screens/
      StartScreens/      Splash, Role
      Auth/              Register (login)
      AppFlow/           AFN router, StudentHome, ParentHome
      CommonScreens/     shared student/parent screens
      ParentScreens/     parent-only (and some shared timetable)
      BottomTabScreens/  PlaceholderScreen (unregistered)
    services/            authService, studentService, parentService
    store/               Redux Toolkit + redux-persist
    utils/               storage, toast, download, greeting, animations
  android/, ios/
```

Empty folders `src/Component/Glass` and `src/Component/Timetable` already exist and should be used for new primitives instead of inventing a parallel tree.

---

## 3. Navigation architecture

### 3.1 Tree

```
NavigationContainer (MainNavigation — native stack, headerShown: false, animation: 'none')
├── SplashScreen
├── Role
├── AuthNavigation (native stack)
│   └── Register          (only auth screen; named Register, behaves as login)
└── BottomTab (createBottomTabNavigator, custom EschoolTabBar)
    ├── Home → AFN
    │     ├── StudentHome   if role !== parent
    │     └── ParentHome    if role === parent
    ├── Attends → Attendance     REGISTERED, hidden from tab bar
    ├── Exam → Exam              REGISTERED, hidden from tab bar
    ├── Teachers → Teacher       REGISTERED, hidden from tab bar
    ├── Menu → Menu              visible as "Academics"
    ├── Chat → Chat
    └── Profile → Profile → MyProfile (isTab)
+ stack screens on MAIN_STACK (pushed above tabs)
```

`@react-navigation/drawer` and `@react-navigation/material-top-tabs` are installed but **not used**. Do not introduce a drawer to match the hamburger in the approved Home mock unless explicitly approved. Map the hamburger to existing Academics (`Menu`) navigation.

### 3.2 Visible bottom tabs (current)

Home · Academics (`Menu`) · Chat · Profile

Active tab treatment: circular navy border around a tinted PNG, raised above the bar. Inactive: gray PNG + gray label.

### 3.3 Status bar

`src/Constants/MyStyling.js` applies:

- Splash / Register: translucent light-content
- Role: navy `#071A3D` light-content
- Everything else: dark-content, white/light background

Home currently forces dark-content against `Colors.parentBg` (`#F3F6FB`). The approved Home uses a **navy header**, so Home status bar must become light-content after redesign. That is a presentation change inside existing `applyStatusBarForRoute` / screen-level `StatusBar` — not a navigation-structure change.

---

## 4. State, auth, and data

### 4.1 State

| Layer | Role | Files |
| --- | --- | --- |
| Redux Toolkit | Auth session, student home payloads, parent home payloads | `src/store/` |
| redux-persist | Persists `auth`: token, user, role, isAuthenticated, profile | `src/store/store.js` |
| RoleContext | `role`, `selectedChildId`, `loggedInStudentId` | `src/context/RoleContext.js` |
| useRoleData | Mixes **live Redux child selection** with **large dummy datasets** for fees, chat, diary, some teachers | `src/hooks/useRoleData.js` |
| PopupContext | Imported in `App.js` but **not mounted** | `src/context/PopupContext.js` |

### 4.2 Auth

- Parent login: `POST /parent/login` (family id + password)
- Student login: `POST /student/login` (student_id + password)
- API base: `https://ranglerz.click/eschool/public/api`
- Token: Bearer on axios interceptors; also AsyncStorage
- Splash restores session and routes to `BottomTab` or `Role`

`Register.js` is the only auth UI. It currently pre-fills demo credentials. **Do not change validation, dispatch, or navigation on success.**

### 4.3 Live vs dummy (presentation must not “fix” this)

**Live API (Redux thunks):** Student/Parent Home, Timetable, Attendance, Assignments, Library, Announcements, Notifications, Syllabus, Results, Exams (student), Teachers, Holidays, Online Class, Profile (auth slice), Parent child dashboard / transport / exams.

**Dummy / local constants still driving UI:** Chat messages, Online Exam + Midterm Mathematics, Dues, Fee breakdown, Parent Diary, parts of Student ID card (`StudentIdCardData`), `useRoleData` fallbacks, `MENU_LIST` labels/routes.

UI migration must keep whichever data source a screen already uses. Do not swap dummy for API or vice versa.

---

## 5. UI libraries actually in use

| Package | Used for |
| --- | --- |
| `@react-navigation/native` + native-stack + bottom-tabs | Navigation |
| `react-native-safe-area-context` | SafeAreaView / insets |
| `react-native-screens` | Native screens |
| `react-native-gesture-handler` | Root wrapper, gestures |
| `react-native-reanimated` | Enter animations (`AnimatedCard`, `useScreenEnterGate`) |
| `react-native-linear-gradient` | Navy cards, headers, splash, role, banners |
| `react-native-svg` | `CardWave`, Role/Splash waves |
| `react-native-vector-icons` **Ionicons** (almost everywhere) + one AntDesign use (`MenuBox`) | Standard glyphs |
| `react-native-responsive-screen` | `wp()` / `hp()` via `src/Constants/Responsive.js` |
| `react-native-toast-message` | Toasts |
| `react-native-element-dropdown` | Wrapped by `Dropdown.js` |
| `react-native-progress` | Progress bars |
| `react-native-pdf` + `react-native-webview` | PdfViewer |
| `react-native-qrcode-svg` | ID card |
| `react-native-print` / `react-native-blob-util` | Downloads / print |
| `@react-native-community/checkbox`, datetimepicker, documents picker | Forms / files |

**Not present and not to add unless later approved:** `@shopify/blur-view`, `expo-blur`, NativeWind/Tamagui, a second icon kit, a new font family.

Glassmorphism in the approved design must be **simulated** with existing `linear-gradient` + translucent fills + borders + shadows. The empty `src/Component/Glass` folder is the intended home.

---

## 6. Typography

Bundled in `assets/fonts/` and registered in iOS `UIAppFonts` + `react-native.config.js`:

| Token (`Fonts.js`) | iOS PostScript | Android file |
| --- | --- | --- |
| `Fonts.regular` | Poppins-Regular | PoppinsRegular |
| `Fonts.medium` | Poppins-Medium | PoppinsMedium |
| `Fonts.semibold` | Poppins-SemiBold | PoppinsSemiBold |
| `Fonts.bold` | Poppins-Bold | PoppinsBold |
| Roboto Regular/Medium/SemiBold/Bold | Same family names | Matching TTF |

`Fonts.interRegular` is **not Inter** — iOS maps to Poppins-Regular, Android to Roboto-Regular.

`Fontsize.js` is a **flat wp() scale** with opaque keys (`xs0`, `xm3`, `xx1`, `mm1`, …). Almost every screen picks sizes ad hoc. The approved Home should introduce **semantic type roles** that still resolve through `wp()` so existing responsive behavior is preserved.

`allowFontScaling={false}` is used only on the tab bar and one library filter. Most text will scale with the system font — keep that unless a specific label overflows after restyle.

---

## 7. Color system (current)

Canonical file: `src/Constants/Colors.js`.

Primary brand is already `#071A3D` (`Colors.BlueBackground`, `Colors.primary`, `Colors.parentHeader`). That matches the approved brand reference.

Secondary navy/blue family: `#1345A3`, `#2563EB`, `#0D5CA8`, plus many gradient stops in `CardTheme.js`.

Screen backgrounds in production:

- `Colors.parentBg` `#F3F6FB` — most app screens
- `Colors.screenBg` `#FFFFFF` — some containers
- Hardcoded `#DCEBFD` — Notification, Results, Timetable, Fee, Transport, ChildTrack (icy blue, **not** in `Colors.js`)

Hardcoded hex is widespread (404+ matches). Duplicated locals: `NAVY = '#071A3D'`, `SCREEN_BG = '#DCEBFD'`, `CARD_GRADIENT = ['#07346B', '#062653', '#0D5CA8']`.

Current visual language vs approved Home:

| Current production | Approved Home |
| --- | --- |
| Navy **filled** cards and headers | Navy **header band** only; body is white/ice |
| LinearGradient “identity” cards | Glass / white elevated cards |
| Colorful Ionicons via `DepthIcon` (fake 3D offset) | Premium 3D educational PNG illustrations |
| Wave SVG overlays on cards (`CardWave`) | Soft 3D icons + light shadows, no waves on content cards |
| Circular raised tab icon | Filled blue glyph + label, no circle |

---

## 8. Styling conventions

1. Per-file `StyleSheet.create` — no StyleSheet reuse across screens.
2. Spacing via `wp()` / `hp()` mixed with magic numbers (`wp(4)`, `hp(1.6)`, `wp(5.5)`).
3. Border radii typically `wp(4)`–`wp(5.5)`; home header uses `wp(8)`–`wp(10)` bottom corners.
4. Shadows: `IDENTITY_CARD_SHADOW` and `CARD_ELEVATIONS` in `ProfileTheme.js`; many screens copy `{elevation: 5, shadowColor: '#0A4E8A', ...}` inline.
5. Enter animations: `withScreenEnter`, `ScreenEnterProvider`, `AnimatedCard`, `ScrollEnterScrollView` / `ScrollEnterFlatList`. **Preserve these wrappers.** Restyle inner views only.
6. Headers: three competing components — `MainHeaderComponent` (dominant), `ScreenHeader`, `HomeHeader` (HomeHeader is unused by current homes).

---

## 9. Responsive and device behavior

- Layout is percentage-based (`react-native-responsive-screen`). There is **no** explicit tablet layout, no `useWindowDimensions` breakpoints, and no landscape UI (iOS locked portrait).
- Safe areas: `SafeAreaView` `edges={['top']}` on almost every screen; tab bar adds `insets.bottom`.
- Android edge-to-edge is **off** (`edgeToEdgeEnabled=false`).
- Android status bar is non-translucent on app screens.
- Small phones: hub grids are `47.5%` / `48%` width; labels use `numberOfLines={1}` and occasional `adjustsFontSizeToFit`.
- Large phones: `hp()` inflates vertical padding; cards can look sparse. Approved Home is denser (search + banner + chips + glance list). StudentHome restyle must be tested on a short Android device so the glance list is not pushed below the fold without scroll (scroll already exists).

---

## 10. Shared component map (high reuse)

Redesign these first. Most screens inherit look from them.

| Component | Used by | Current look |
| --- | --- | --- |
| `MainHeaderComponent` | Majority of stack screens | Light bg, navy circular back, centered title, bell |
| `EschoolTabBar` | All tab screens | White bar, circular active icon |
| `NotificationBell` | Headers, homes | PNG bell + red dot |
| `AttendanceStudentDropdown` | Student Home, Menu, Attendance | Premium navy/wave identity card |
| `SelectedChildBanner` | Parent Home, Diary, others | Gradient identity card |
| `ParentChildCard` | Menu (parent) | Gradient child card |
| `AcademicMenuCard` | Menu | Full-width navy gradient row |
| `StudentHubCard` | Student Home | 2-col navy gradient tiles |
| `ParentStatCard` | Parent Home | 2-col navy stat tiles |
| `ScheduleItem` | Parent Home | Gradient schedule rows |
| `ProfileGradientCard` | Timetable, Attendance, Diary, Fee | Shared navy gradient wrapper |
| `DepthIcon` | Hub, menu, stats, many cards | Ionicons with drop-shadow layer |
| `CardWave` | Identity/hero cards | SVG wave overlay |
| `AnimatedCard` / enter hooks | Nearly all screens | Motion only — keep |
| `Btn` | Auth, Attendance, Dues, ID card | Pill navy / outline |
| `CustomTextInput` | Auth, UpdatePassword, Assignment | Boxed input + icon |
| `PersonAvatar` | Profile, banners, chat | Photo or initials |
| `SegmentTabs` / `FilterTabs` / `ExamTabBar` / `ClassTabBar` | Attendance, Exam, Online Class | Local tab chips |
| `AppPopup` | PopupContext (unmounted) | Modal |

---

## 11. Asset inventory (existing)

`src/Assets/index.js` registers ~40 PNG icons plus profile JPEGs. Most feature PNGs are **legacy flat glyphs** (1–2 KB). Large exceptions: `ParentPortal.png`, `DigitalLibrary.png`, `AuthHeader.png`, `TransportMap.png`.

Profile photos live under `src/Assets/Profile/` (avatars, People, Students). Those are **content photos**, not chrome — keep.

Tab icons (do not replace unless later approved): `HomeIcon.png`, `Menu.png`, `Messageicon.png`, `ProfileIcon.png`. Hidden-tab icons also exist: `AttendsIcon.png`, `ExamIcon.png`, `TeacherIcon.png`.

Vector: Ionicons throughout. `DepthIcon` converts `-outline` names to filled.

---

## 12. Animation and motion

Enter motion is a first-class existing behavior (`useScreenEnterGate`, `cardAnimation.js`, `scripts/patch-scroll-enter.js`). The approved design does not specify motion. **Keep existing enter animations** while swapping card chrome. Do not disable `ScreenEnterProvider` during restyle.

---

## 13. Accessibility (current)

Almost no `accessibilityLabel` / `accessible` usage (one hit in `ParentSheetModal`). Tab labels are visible text. Contrast on navy+white is acceptable; gray `#8E8E8E` on `#F3F6FB` is weaker. Redesign should add labels on icon-only controls (bell, hamburger, search, chevrons) without changing hit targets’ behavior.

---

## 14. Gaps versus approved Home

1. Home header is a simple navy shell, not a branded navy dashboard with chip + search.
2. Hub is a 2-column navy grid, not a horizontal glass Quick Access row.
3. No welcome illustration banner.
4. No “Today at a glance” list (student has a single upcoming-class gradient card; parent has stat tiles + schedule).
5. Tab chrome is circular-raised, not filled-glyph.
6. Feature icons are Ionicons/`DepthIcon`, not 3D PNGs.
7. Many inner screens still use the **old navy-filled card language**, which will clash if only Home is updated. The Home screen is the visual source of truth for the whole app: inner screens must shift from filled navy cards to **light surfaces + navy accents**.
8. Official file `design-reference/approved-home.png` is **locked** from the client-uploaded Student Home (2026-11-10). Visual tokens follow that PNG (see Design System spec).

---

## 15. What this audit does not authorize

- New navigation trees, drawers, or extra tabs
- New API endpoints or dummy-data substitution
- New npm dependencies
- Replacing bottom-tab PNG assets
- Cropping 3D icons out of the full approved screenshot
- Commits or implementation

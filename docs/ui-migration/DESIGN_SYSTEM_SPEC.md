# Eschooly — Design System Specification

**Status:** Planning only. Tokens are not yet implemented.  
**Authority:** Subordinate to [`MASTER_EXECUTION_PLAN.md`](./MASTER_EXECUTION_PLAN.md)

---

## 1. Visual source of truth

### 1.1 Official path (locked)

`design-reference/approved-home.png`

Copied from the client-uploaded Student Home on 2026-11-10. This file is the **primary visual source of truth**. Do not mix tokens from other light 2-column dashboard mocks.

### 1.2 Confirmed composition

The uploaded Home matches the brief: navy-blue header, white/light content, welcome banner, glassmorphism, Quick Access, 3D educational icons, dashboard information cards, bottom navigation.

Subject on the approved frame: greeting **Fatima Ahmadi**, chip **Student · Class 10 A**. Implementation must still bind greeting and chip to live profile/class data — do not hardcode those strings.

Rejected as primary source (they lack the navy header and/or welcome banner):

- `ESCHOOLY student home dashboard-1.png` … `-6.png`
- `ESCHOOLY Student Home Dashboard-5.png`
- Earlier 2-column light dashboards

If a later client file is a different composition, stop implementation and replace this spec.

### 1.3 Brand color supplied by the brief

| Token | Value | Confidence |
| --- | --- | --- |
| Primary brand / navy | `#071A3D` | **EXACT** (brief + existing `Colors.primary`) |

All other values below are **ESTIMATED** from the analyzed screenshot unless marked EXACT.

---

## 2. Approved Home anatomy (Student)

Top → bottom, as seen on `design-reference/approved-home.png`:

1. **Status bar** — light-content over navy (inferred; mock has no OS status bar).
2. **Brand row** — graduation-cap mark, vertical divider, “ESCHOOLY”, notification bell with numeric red badge (`3` in the mock; bind to live unread count).
3. **Greeting row** — hamburger (left), “Good Evening,” + student name on the same row. Bell is **not** on this row.
4. **Student chip** — glass pill on navy: school glyph + “Student · Class 10 A” + chevron.
5. **Search field** — dark glass on navy, leading search, trailing sliders, placeholder “Search for classes, notes or resources”.
6. **Welcome banner** — large light glass card overlapping the navy-to-canvas join; headline “Welcome back, {firstName}!”; subtitle “Keep learning, keep growing”; blue underline accent; 3D cap on stacked books (no plant in this locked PNG); pagination dots (first filled).
7. **Quick Access** — section title + “View All”; horizontal row of 5 glass icon cards (Online Classes selected with thicker blue border).
8. **Today at a glance** — section title + “View All”; three light rows (Next Class / Assignments / Latest Result). Bind only rows the live Home API actually returns.
9. **Bottom navigation** — Home (active, filled blue), Academics, Chat, Profile. Keep existing tab PNG sources; restyle color/layout only.

Parent Home has no approved mock. Apply the same shell: greeting uses parent name; chip is the selected child; Quick Access / glance bind to existing parent dashboard fields.

---

## 3. Color tokens

Propose adding **semantic aliases** on top of `src/Constants/Colors.js`. Do not delete existing keys until a screen no longer references them.

### 3.1 Brand and surfaces

| Semantic token | Value | Confidence | Current closest |
| --- | --- | --- | --- |
| `brand.navy` | `#071A3D` | EXACT | `Colors.primary` |
| `brand.navyMid` | `#0D2B52` | ESTIMATED | `Colors.homeBox` `#0F2745` |
| `brand.blue` | `#2563EB` | ESTIMATED (matches existing `academicsCardMid`) | `Colors.academicsCardMid` |
| `brand.blueDeep` | `#1345A3` | EXACT existing secondary | `Colors.primaryLight` |
| `background.canvas` | `#F4F7FC` | ESTIMATED | `Colors.parentBg` `#F3F6FB` (keep `#F3F6FB` unless side-by-side shows a miss) |
| `background.surface` | `#FFFFFF` | ESTIMATED | `Colors.white` |
| `background.header` | `#071A3D` | EXACT | `Colors.parentHeader` |
| `background.search` | `rgba(255,255,255,0.12)` | ESTIMATED | `Colors.whiteOverlay18` |
| `background.chip` | `rgba(19,69,163,0.55)` | ESTIMATED | new |
| `text.primary` | `#071A3D` | EXACT | `Colors.primary` |
| `text.onNavy` | `#FFFFFF` | EXACT | `Colors.white` |
| `text.onNavyMuted` | `rgba(255,255,255,0.85)` | EXACT existing | `Colors.whiteMuted85` |
| `text.secondary` | `#6B7C93` | ESTIMATED | `Colors.mutedText` `#71717B` |
| `text.tertiary` | `#8E8E8E` | EXACT existing | `Colors.grayText` |
| `text.link` | `#2563EB` | ESTIMATED | `Colors.linkBlue` `#1345A3` — **decision:** keep `#1345A3` until a pixel compare prefers brighter blue |
| `border.subtle` | `#E3EAF4` | ESTIMATED | `Colors.border` `#E8E8E8` |
| `border.glass` | `rgba(255,255,255,0.45)` | ESTIMATED | new |
| `border.selected` | `#5B9CFF` | ESTIMATED | `Colors.academicsCard` |
| `shadow.color` | `#0A4E8A` | EXACT existing usage | already hardcoded |
| `badge.red` | `#FF3B30` | EXACT existing | `Colors.red` |
| `tab.active` | `#2563EB` | ESTIMATED | currently `Colors.primary` navy — **this is a visible change** |
| `tab.inactive` | `#9AA5B4` | ESTIMATED | `Colors.grayText` |

### 3.2 Semantic status (keep existing)

Do not invent a new status palette. Continue using `Colors.success`, `warning`, `red`, and the icon hues in `Colors.icon*`. Inner screens that hardcode `#86EFAC` / `#FCA5A5` should migrate to these tokens during their restyle.

### 3.3 What to stop using as default chrome

`CARD_GRADIENTS.*` filled navy faces, `SCREEN_BG = '#DCEBFD'`, and `ProfileGradientCard` as the default list wrapper. They remain available for **selected/accent** states (timetable selected day, splash, primary CTA).

---

## 4. Typography tokens

Keep **Poppins** (already bundled). Do not add Inter/SF Pro.

Map approved Home roles onto existing `Fontsize` + `Fonts`:

| Role | Family | Size token | Approx on ~390dp | Confidence |
| --- | --- | --- | --- | --- |
| Brand wordmark | `Fonts.bold` | `Fontsize.sm` | ~16 | ESTIMATED |
| Greeting | `Fonts.regular` | `Fontsize.xs1` | ~14 | ESTIMATED (matches current Home greeting) |
| Display name | `Fonts.bold` | `Fontsize.ml` | ~22 | ESTIMATED (matches current `studentName`) |
| Banner title | `Fonts.bold` | `Fontsize.sm`–`md` | ~18–20 | ESTIMATED |
| Banner subtitle | `Fonts.regular` | `Fontsize.xs1` | ~14 | ESTIMATED |
| Section title | `Fonts.bold` | `Fontsize.sm` | ~16 | ESTIMATED |
| Link “View All” | `Fonts.semibold` | `Fontsize.xs1` | ~14 | ESTIMATED |
| Card title | `Fonts.semibold` | `Fontsize.xs5` | ~15 | ESTIMATED |
| Card meta | `Fonts.regular` | `Fontsize.xs0` | ~12 | ESTIMATED |
| Chip | `Fonts.medium` | `Fontsize.xs0` | ~12 | ESTIMATED |
| Tab label | `Fonts.medium` / `bold` when active | `Fontsize.tab` | ~11 | EXACT current `Fontsize.tab` |
| Button | `Fonts.semibold` | `wp(3.73)` current `Btn` | ~14–15 | EXACT current |

Add `src/Constants/Typography.js` exporting these roles so screens stop picking `Fontsize.xm3` at random. Implementation must not change `Fontsize.js` values; wrap them.

---

## 5. Spacing, radius, shadow

Use `wp` / `hp` (existing). Suggested semantic scale:

| Token | Value | Confidence |
| --- | --- | --- |
| `space.xs` | `wp(1.5)` / `hp(0.4)` | ESTIMATED |
| `space.sm` | `wp(2.5)` / `hp(0.8)` | ESTIMATED |
| `space.md` | `wp(4)` | EXACT current screen padding |
| `space.lg` | `wp(5)` | EXACT current Home header padding |
| `space.xl` | `hp(2)` | ESTIMATED |
| `radius.chip` | `wp(10)` | ESTIMATED (pill) |
| `radius.card` | `wp(5)` | ESTIMATED (~20px) — current hub is `wp(5)` |
| `radius.banner` | `wp(6)` | ESTIMATED |
| `radius.iconTile` | `wp(4)` | ESTIMATED |
| `radius.search` | `wp(4)` | ESTIMATED |
| `elevation.card` | iOS shadowOpacity ~0.10–0.14, radius 8–12, y 4; Android elevation 4–6 | ESTIMATED |
| `elevation.header` | none (flat navy) | ESTIMATED |
| `elevation.tab` | top hairline only | EXACT current `borderTopWidth: wp(0.25)` |

Shadow color stays `#0A4E8A` (already used). Prefer `IDENTITY_CARD_SHADOW` / a new `GLASS_SHADOW` in `ProfileTheme.js` over per-screen copies.

---

## 6. Components to add (presentation only)

Place new files in existing folders. No new packages.

| Primitive | Path | Responsibility |
| --- | --- | --- |
| Tokens | `src/Constants/Typography.js` + aliases in `Colors.js` | Semantic type + color |
| Icon registry | `src/Assets/icons3d.js` (or extend `src/Assets/index.js`) | 3D PNG map |
| `GlassCard` | `src/Component/Glass/GlassCard.js` | White/translucent card + border + shadow |
| `NavyHeaderBand` | `src/Component/Glass/NavyHeaderBand.js` | Curved navy top used by Home (and optionally Fee) |
| `StudentChip` | `src/Component/Student/StudentChip.js` | Pill; parent variant uses child switch callback already owned by Home |
| `HomeSearchField` | `src/Component/Glass/HomeSearchField.js` | Visual search; onSubmit/onPress → existing DigitalLibrary |
| `WelcomeBanner` | `src/Component/Glass/WelcomeBanner.js` | Illustration + copy from live first name |
| `QuickAccessCard` | `src/Component/Student/QuickAccessCard.js` | Replaces visual of `StudentHubCard` |
| `GlanceRow` | `src/Component/Glass/GlanceRow.js` | Icon + title + meta + chevron |
| `SectionHeader` | `src/Component/Glass/SectionHeader.js` | Title + optional View All |
| `AppScreen` | `src/Component/Glass/AppScreen.js` | SafeArea + canvas bg + optional navy band |
| Empty/Loading/Error | `src/Component/Glass/StateView.js` | Replaces ad-hoc ActivityIndicator + Text |

Existing `StudentHubCard` / `ParentStatCard` / `AcademicMenuCard` should be **rewritten in place** (same props, new look) so callers do not change.

---

## 7. Existing components — target look

| Component | Keep | Change |
| --- | --- | --- |
| `MainHeaderComponent` | Back, title, bell, `onDark`, `navyBack`, enter motion | Light canvas; circular back becomes glass/navy fill matching mock chips; title `text.primary` |
| `EschoolTabBar` | 4 tabs, PNG sources, press/optimistic logic, safe-area pad | Drop circular raised slot; tint active `#2563EB` **or** keep navy if compare prefers brand navy; labels as now |
| `NotificationBell` | Navigate helper, unread source | Optional numeric badge (mock shows “3”); today it is a red **dot**. Adding a number is presentation of existing `count` — allowed. |
| `Btn` | Variants, loading, disabled | Slightly align radius with `radius.card` or keep pill for primary CTA (mock uses pills on chips, not full-width buttons) |
| `CustomTextInput` | All props | Light field, `border.subtle`, navy icon |
| `DepthIcon` | Fallback when 3D asset missing | Prefer 3D PNG via new registry; DepthIcon remains for overflow icons |
| `CardWave` | Identity heroes that stay navy | Do not add waves to new glass cards |
| `ProfileGradientCard` | Optional accent | Default list rows should not wrap in it after restyle |

---

## 8. Iconography rules

1. **Bottom tabs:** keep `Images.homeIcon`, `menuIcon`, `messageIcon`, `profileIcon`. Restyle chrome only.
2. **Standard actions:** Ionicons (chevron, search, sliders, menu, close, time). Do not replace with 3D.
3. **Feature shortcuts (Quick Access, glance, academics rows):** premium 3D PNGs from the asset matrix. Transparent background, never cropped from the full mock.
4. **Missing 3D asset:** fall back to `DepthIcon` + `FEATURE_ICON_META` so screens ship without blocking on illustration delivery.
5. **Photos:** keep `PersonAvatar` + `src/Assets/Profile/**`.

---

## 9. Glassmorphism — achievable, not literal BackdropFilter

React Native 0.86 on Android API 24+ does not give cheap, consistent backdrop blur without a new native dependency.

**Specified approach (no new deps):**

- Fill: `rgba(255,255,255,0.92)` on light, `rgba(255,255,255,0.12)` on navy
- Border: 1px `border.glass` or `border.subtle`
- Shadow: `elevation.card`
- Optional inner highlight: 1px top `rgba(255,255,255,0.7)`

Do not claim pixel-perfect blur vs the mock. Document this in QA as “simulated glass”.

---

## 10. Motion

Approved mock is static. Keep current enter animations. Do not add parallax/lottie unless later approved.

---

## 11. Dark mode

The app has no dark theme. Do not add one.

---

## 12. Token implementation order

1. Extend `Colors.js` with semantic aliases pointing at existing hex where possible.
2. Add `Typography.js`.
3. Add `src/Constants/Theme.js` re-exporting `{Colors, Fonts, Fontsize, Typography, spacing, radius, elevation}` so screens can `import {Theme} from '...'` without a large refactor.
4. Migrate screens file-by-file to semantic names.
5. Only after a screen is migrated, delete that file’s local `NAVY` / `SCREEN_BG` constants.

Hardcoded hex remaining after migration is a QA fail for that screen.

# Webdesign Page Overrides

> **PROJECT:** Aesken
> **Generated:** 2026-07-23 10:57:42
> **Page Type:** Landing / Marketing

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 800px (narrow, focused)
- **Layout:** Single column, centered
- **Sections:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

### Spacing Overrides

- **Content Density:** Low — focus on clarity

### Typography Overrides

- No overrides — use Master typography

### Color Overrides

- **Strategy:** Minimalist: Brand + white #FFFFFF + accent. Buttons: High contrast 7:1+. Text: Black/Dark grey

### Component Overrides

- Avoid: Desktop-first causing mobile issues
- Avoid: Invisible text during font load
- Avoid: Content wider than viewport

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: font-size: clamp(3rem 10vw 12rem), font-weight: 900, letter-spacing: -0.05em, massive whitespace
- Responsive: Start with mobile styles then add breakpoints
- Performance: Use font-display swap or optional
- Responsive: Ensure content fits viewport width
- CTA Placement: Center, large CTA button

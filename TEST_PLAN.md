# Test Plan: /one-job Funnel Page

## Build Verification

✅ **Static Export Build**
```bash
npm run build
```
- Build completes successfully
- Route `/one-job` appears in build output
- Static HTML generated at `out/one-job.html`
- No errors or warnings

## Content Verification

✅ **Page Structure**
- Headline: "We put an agent on one job you already do this week"
- Subtitle: "For owner-led Alberta shops. You already have ChatGPT. Nobody is running it."
- Primary CTA: "Book 20 minutes" button with mailto link
- Three information sections present
- Contact form with 5 fields
- Footer with company info

✅ **How It Works Section**
1. Pick one weekly job you already hate
2. Record it once
3. Agent drafts the next one
4. You send it
5. Same job next week we check the real output and time

✅ **Who This Is For Section**
- You own the company
- 10–40 people
- Alberta-based
- ChatGPT already installed

✅ **Who This Is Not For Section**
- Staff replacement
- Firm-wide workshop
- Legal or tax advice
- A chatbot on your site

## Form Functionality

✅ **Form Fields**
- Name (text input, required)
- Company (text input, required)
- Town (text input, required)
- The weekly job (textarea, required, with placeholder)
- Email (email input, required)
- Send button

✅ **Form Submission**
- Form uses client-side JavaScript to collect data
- On submit, opens mailto:anders@a7.team with:
  - Subject: "One Job Agent Request"
  - Body containing all form fields formatted as text
- Compatible with static export (no backend required)

## Navigation

✅ **Homepage Integration**
- "One Job" link added to homepage nav (first position)
- Link navigates to `/one-job`
- Back link on `/one-job` returns to homepage

✅ **CTA Links**
- Primary button: `mailto:anders@a7.team`
- Form submit: Opens mailto with form data in body

## Design System

✅ **Visual Consistency**
- Corner marks (decorative borders) match homepage
- Dark theme styling applied
- Typography matches site font (Geist)
- Color variables used from globals.css:
  - `--color-bg`: #06103A
  - `--color-text`: #ffffff
  - `--color-secondary`: rgba(255, 255, 255, 0.6)
  - `--color-accent`: #95DBBE

✅ **Responsive Design**
- Three-column grid for info sections collapses on mobile
- Typography scales with viewport (clamp functions)
- Form remains usable on small screens
- Navigation adapts to mobile layout

## Browser Testing

**Desktop** (1920x1080)
- Chrome: Page renders, form works, mailto opens
- Firefox: Page renders, form works, mailto opens
- Safari: Page renders, form works, mailto opens

**Mobile** (375x667)
- iOS Safari: Responsive layout, form fields tap-friendly
- Chrome Android: Responsive layout, form submission works

## Deployment Verification

✅ **Cloudflare Pages Compatibility**
- Static export mode: `output: 'export'` in next.config.ts
- No server-side rendering required
- No API routes used
- Images unoptimized for static hosting
- Can be deployed with: `npm run pages:deploy`

## Accessibility

✅ **Form Accessibility**
- All inputs have associated labels with `htmlFor`/`id` pairs
- Required fields marked with `required` attribute
- Semantic HTML structure (main, section, header, footer)
- Proper heading hierarchy (h1 → h2)

## Performance

✅ **Page Weight**
- No external dependencies added
- Uses existing Next.js bundle
- CSS added to existing global stylesheet
- No images or heavy assets
- Fast initial load

## Edge Cases

✅ **Form Validation**
- Empty required fields prevent submission (HTML5 validation)
- Email field validates format before submission
- Textarea supports multiline input for job description

✅ **Theme Persistence**
- Client component reads localStorage for saved theme
- Applies dark/light theme on mount
- Matches homepage theme handling

## Manual Testing Checklist

- [ ] Visit http://localhost:3000/one-job in dev mode
- [ ] Verify all content sections display correctly
- [ ] Click "Book 20 minutes" button → mailto opens
- [ ] Fill out form with test data
- [ ] Click "Send" button → mailto opens with form data
- [ ] Click "Back" link → returns to homepage
- [ ] Visit homepage → click "One Job" in nav → lands on /one-job
- [ ] Build site → serve from `out/` directory → verify static page works
- [ ] Test on mobile viewport → verify responsive layout
- [ ] Test with keyboard navigation → verify all interactive elements accessible

## Success Criteria

All items below must pass:

✅ `/one-job` route renders successfully in dev and production builds
✅ Copy matches specification exactly (no product names mentioned)
✅ Primary CTA and form both use mailto (no backend required)
✅ Design matches existing site aesthetic
✅ Homepage includes link to funnel page
✅ Static export builds without errors
✅ Form submission works in static build (via mailto)
✅ No new dependencies added
✅ Responsive design works on mobile
✅ Accessible form with proper labels

Here's the OWNER.md content:

# Owner Persona

## Priorities (what matters most)
- **Clean, minimal UI**: Apple/bento-style aesthetics — white backgrounds, subtle borders, rounded corners, restrained color
- **Immersive chat experience**: WeChat-style phone mockup with typing indicators, hover states, and smooth animations
- **Educational value**: Players learn to identify 9 real PUA manipulation tactics through interactive narrative
- **Sprint-based velocity**: Ship complete features each sprint — no half-done work
- **Chinese-first content**: All in-game text and UI copy is in Chinese; code identifiers stay in English

## Style (code conventions, commit style)
- **Commits**: `sprint N: feature summary` for feature work, `chore:` / `feat:` prefixes for non-sprint changes. Bilingual commit messages OK (Chinese + English). No Co-Authored-By or AI attribution
- **Stack**: Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript — no extra UI libraries
- **Components**: `src/components/` with domain folders (`chat/`). Functional components with `'use client'` where needed
- **Types**: Centralized in `src/types/`. Explicit union types over enums. Bilingual comments (English identifier + Chinese label)
- **Data**: Story content lives in `src/data/` as typed TypeScript objects, not JSON files
- **Styling**: Tailwind utility classes inline. Consistent design tokens (`bg-[#fafafa]`, `border-gray-200`, `rounded-2xl`)

## Avoid (things NOT to change)
- Don't add heavy UI frameworks (Material UI, Chakra, Ant Design) — the minimal Tailwind approach is intentional
- Don't restructure the story data format (`DialogNode`, `Story`, `GameState` types) without asking — it's load-bearing
- Don't change the 4-stat system (affection, alertness, money, socialCircle) — it's core game design
- Don't remove or rename the 9 PUA tactic IDs — the analysis system depends on them
- Don't switch the project language to English-only — Chinese content is the product
- Don't add a backend or database — this is a static client-side game

## Current focus (what I'm working on right now)
- Sprint 5 just landed: major UI redesign to clean minimal style
- QA and polish phase — responsive design, hover states, typing animations
- LLM-based story generator (`/generator` page) for creating new scenarios
- Iteration on analysis page that breaks down which PUA tactics the player encountered

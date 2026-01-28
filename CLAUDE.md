# CLAUDE.md - AI Assistant Guidelines for Marketing Project

This file provides context and guidelines for AI assistants (like Claude) working on this repository.

## Project Overview

**Repository:** marketing_project
**Status:** New project (initialized)
**Purpose:** Marketing-related project resources, campaigns, and assets

This is a marketing project repository. As the project evolves, this document should be updated to reflect the current state of the codebase.

---

## Repository Structure

```
marketing_project/
├── CLAUDE.md           # AI assistant guidelines (this file)
├── README.md           # Project documentation (to be created)
├── assets/             # Marketing assets (images, videos, graphics)
├── campaigns/          # Campaign-specific materials
├── content/            # Written content, copy, and messaging
├── data/               # Analytics data, reports, metrics
├── scripts/            # Automation scripts
├── templates/          # Reusable templates
└── docs/               # Additional documentation
```

> **Note:** This structure is recommended. Create directories as needed for the project.

---

## Development Guidelines

### Git Workflow

1. **Branch Naming Convention:**
   - Feature branches: `feature/<description>`
   - Bug fixes: `fix/<description>`
   - Claude AI work: `claude/<description>-<session-id>`

2. **Commit Messages:**
   - Use clear, descriptive commit messages
   - Start with a verb (Add, Update, Fix, Remove, Refactor)
   - Keep the subject line under 72 characters
   - Example: `Add Q1 campaign landing page copy`

3. **Push Commands:**
   - Always use: `git push -u origin <branch-name>`
   - Ensure branch names match the expected format

### File Organization

- **Assets:** Store in `/assets/` with subdirectories by type or campaign
- **Content:** Keep written content in `/content/` organized by purpose
- **Data:** Store analytics and metrics in `/data/` with clear naming
- **Templates:** Reusable templates go in `/templates/`

### Naming Conventions

- **Files:** Use lowercase with hyphens: `campaign-brief-q1-2026.md`
- **Directories:** Use lowercase with underscores or hyphens
- **Assets:** Include date or version: `logo-v2.png`, `banner-2026-01.jpg`

---

## Content Guidelines

### Marketing Copy Standards

1. **Tone:** [Define project-specific tone - professional, casual, etc.]
2. **Voice:** [Define brand voice characteristics]
3. **Target Audience:** [Define primary audience segments]

### File Formats

- **Documents:** Markdown (`.md`) preferred for text content
- **Spreadsheets:** CSV for data, or link to external tools
- **Images:** PNG for graphics, JPG for photos, SVG for icons
- **Videos:** MP4 preferred, with compressed versions for web

---

## AI Assistant Instructions

### When Working on This Repository

1. **Always read existing files** before making modifications
2. **Preserve existing formatting** and conventions
3. **Follow the directory structure** outlined above
4. **Create clear commit messages** describing changes
5. **Update this CLAUDE.md** when adding new conventions or structures

### Common Tasks

| Task | Guidelines |
|------|------------|
| Create new content | Place in `/content/` with descriptive filename |
| Add campaign materials | Create subdirectory in `/campaigns/<campaign-name>/` |
| Update assets | Version existing files, don't overwrite |
| Add data/reports | Use ISO dates in filenames (YYYY-MM-DD) |
| Write documentation | Use Markdown format in `/docs/` |

### Things to Avoid

- Don't delete files without explicit permission
- Don't commit sensitive data (API keys, passwords, PII)
- Don't create deeply nested directory structures
- Don't use ambiguous filenames like `final.md` or `new-version.txt`

---

## Project-Specific Notes

### Current Status

- **Phase:** Initial setup
- **Active Campaigns:** None yet
- **Pending Tasks:** Repository structure setup

### Key Contacts

[Add team contacts and roles as needed]

### External Resources

[Add links to external tools, brand guidelines, style guides, etc.]

---

## Quick Reference

### Useful Commands

```bash
# Check repository status
git status

# Create and switch to new branch
git checkout -b feature/<branch-name>

# Stage all changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to remote
git push -u origin <branch-name>
```

### Important Files to Review

- `CLAUDE.md` - This file (AI guidelines)
- `README.md` - Project overview and setup (when created)

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-01-28 | Initial CLAUDE.md created | Claude AI |

---

*Last updated: 2026-01-28*

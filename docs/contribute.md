---
title: Contributing to AnythingDeploy
description: Learn how to contribute to AnythingDeploy. Add deployment guides, improve existing content, and help developers deploy their applications.
keywords: contribute, open source, deployment guides, github, pull request
---

# Contributing to AnythingDeploy

Thank you for your interest in contributing to AnythingDeploy! This project is open source and welcomes contributions from the community.

## How to Contribute

### 1. Add a New Guide

1. Navigate to the appropriate category directory: `docs/files/{category}/{topic}/`
2. Create a new markdown file following the naming convention: `guide-name.md`
3. Follow the [Guide Template](#guide-template) below
4. Add your guide to the sidebar in `.vitepress/config.js`

### 2. Improve Existing Guides

- Fix typos or errors
- Add missing steps
- Update outdated information
- Improve clarity and formatting

### 3. Report Issues

Found a problem? Open an issue on GitHub with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior

## Guide Template

```markdown
---
title: Your Guide Title
description: Brief description of what this guide covers
contributors:
  - name: Your Name
    github: yourusername
    avatar: https://github.com/yourusername.png
---

# Guide Title

## Prerequisites

- Item 1
- Item 2

## Step 1: Title

Content here...

## Step 2: Title

Content here...

## Troubleshooting

Common issues and solutions...

## Contributors

<!-- Contributors will be auto-generated from frontmatter -->
```

## File Structure

```
docs/
  files/
    {category}/        # e.g., frontend, backend, devops
      {topic}/         # e.g., react, nodejs, coolify
        guide-name.md  # Your guide file
```

## Contributors

We appreciate all contributors! Contributors are automatically listed based on the `contributors` field in each guide's frontmatter.

---

**Thank you for making AnythingDeploy better!** 🎉


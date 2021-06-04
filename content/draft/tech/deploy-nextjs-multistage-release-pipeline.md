---
title: "Deploy NextJS on a Multi-Stage CI/CD Build & Release Pipeline in ADO"
date: "1900-12-24"
subtitle: "Getting NextJS successfully configured & deployed for Continuous Integration and Deployment presents some unique challenges. Let's look at what these are and how to overcome them using Azure DevOps."
category: "tech"
canon: 'https://external.com?if=originally-published-elsewhere'
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Initial image used as anchor for article](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-title-image.jpg)

## Initial Section



CI Step - Build
- Run once
- Handles pre-build validation (lint, test)
- Runs build step
  - Creates `.next` folder including any SSG/Static files

CD Step - Release
- Run once per environment (Dev, QA, Stage, Prod)
- Provides any environment-specific configuration
- Publishes build files to destination


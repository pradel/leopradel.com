---
title: Simplifying Your Node.js setup with pnpm
date: '03/04/2023'
description: 'Did you know that you can use pnpm to manage your Node.js dependencies?'
---

With so many tools available to manage Node.js installations it can be hard to choose the best option. So, do you still need a tool like nvm or volta in 2023?

Let me introduce you to pnpm, my new go-to package manager. It's not only fast and disk-space efficient but also replaces npm or yarn for managing Node.js projects. And guess what? pnpm can handle your Node environment and directly install or update Node.js too! That's right, with just one tool, we can manage everything - project dependencies and the Node.js environment.

First, let's get the latest version of pnpm up and running with this simple command:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Once that's done, selecting the version you want to use is simple:

```bash
# Install LTS release
pnpm env use --global lts

# Install Node.js 16
pnpm env use --global 16
```

So, although pnpm is mainly a package manager, it's turned out to be great for managing my Node.js environment too. With its efficient disk space usage, faster installations, simple configuration, and better compatibility, pnpm has become my go-to choice. Give it a try, and experience the benefits for yourself!

---
title: Using yarn v2 berry with create-react-app
date: '06/23/2020'
description: 'Start using yarn berry with your new create-react-app application'
---

Today I decided to try out the new yarn berry version (v2) with create-react-app and couldn't find any material to get started, so I hope this guide will help you if you are planning to use the new yarn version with CRA :).
This shows how to get started with a new app but you can follow the same steps with an already existing app.

_You will need to install yarn if it's not yet installed on your machine. `npm install -g yarn`_

### Creating the app

First, let's create a create-react-app application with typescript (typescript is optional).

```sh
npx create-react-app my-app --template typescript
cd my-app
```

### Migrating to yarn berry

Yarn berry no longer uses the node_modules folder so we need to delete it. To read more about this, take a look at yarn documentation regarding [Plug'n'Play
](https://yarnpkg.com/features/pnp)

```sh
rm -rf node_modules
```

We need to tell yarn that we want to use berry for this project.

```sh
yarn set version berry
```

Now let's install our dependencies with the new yarn version.

```sh
yarn install
```

After this step, you will notice that a new `.yarn` folder and `.yarnrc.yml` file were created. To see more information on the role of every folder, take a look at [this issue](https://github.com/yarnpkg/berry/issues/454#issuecomment-530312089).

We don't want to commit the yarn cache files, let's add the following lines to our `.gitignore` file.

```
.yarn/*
!.yarn/releases
!.yarn/plugins
.pnp.*
```

That's it, yarn berry is now configured for our project. Run `yarn start` to start the app in development mode. Open http://localhost:3000 to view it in the browser.

You should see the following screenshot 🎉.

![Create react app](https://dev-to-uploads.s3.amazonaws.com/i/h4t9fxvfyucqtkvaznvs.png)

You might notice that VSCode (or other editors) does not resolve the third party dependencies typescript types (such as react). In order to setup your editor follow the [yarn documentation](https://yarnpkg.com/advanced/editor-sdks).

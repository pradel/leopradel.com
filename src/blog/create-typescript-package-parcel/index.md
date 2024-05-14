---
title: Create a typescript package with Parcel
date: '05/14/2024'
description: 'Use Parcel to create a modern typescript package built for cjs and esm'
---

So, you've got this idea for a TypeScript package, but configuring build tools isn't your idea of a good time? Parcel is there to save the day!

[Parcel](https://parceljs.org/) is a fast and zero-configuration web application bundler designed to simplify the build process for modern web projects. It's not limited to web applications, and it can be used to build packages targeting the browser or Node.js.

In this tutorial, we will create a new typescript package using Parcel and configure it to output both CommonJS and ECMAScript modules.

## Create a new typescript package

Start by creating a new directory and initializing your project with npm:

```sh
mkdir my-package
cd my-package
npm init -y
npm install --save-dev typescript parcel @parcel/packager-ts @parcel/transformer-typescript-types @parcel/validator-typescript
```

This will create a new directory called `my-package` and initialize a new `package.json` file with the default values and install the required dependencies.

### Configure Parcel

To configure Parcel, we need to edit the `package.json` file and add the following configuration:

```json
{
  "type": "module",
  "source": "src/index.ts",
  "main": "dist/index.cjs",
  "types": "dist/index.d.ts",
  "module": "dist/index.js"
}
```

This configuration tells Parcel to use `src/index.ts` as the entry point for our package, and to output the CommonJS module to `dist/index.cjs`, the ECMAScript module to `dist/index.js`, and the types to `dist/index.d.ts`.

Then, we add the scripts to the `package.json` file to build our package. Add the following scripts to the `package.json` file:

```json
{
  "scripts": {
    "watch": "parcel watch",
    "build": "parcel build"
  }
}
```

Parcel do not automatically typecheck the code, so we need to tell it to use the typescript validator. To do this, add the following configuration to a new `.parcelrc` file:

```json
{
  "extends": "@parcel/config-default",
  "validators": {
    "*.{ts,tsx}": ["@parcel/validator-typescript"]
  }
}
```

### Configure typescript

To configure typescript, add the following configuration to a new `tsconfig.json` file:

```json
{
  "include": ["src/**/*"],
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Create the source code

Now, let's create the source code for our package. Create a new directory called `src`, and create a new file called `index.ts` inside the `src` directory. Add the following code to the `index.ts` file:

```ts
export const hello = (name: string) => `Hello, ${name}!`;
```

### Build the package

To build our package, run the following command in your terminal:

```sh
npm run build
```

This will compile the typescript code and bundle the package using Parcel. You should see the CommonJS, ECMAScript, and types output in the `dist` directory.

In development, if you want to watch for changes and rebuild the package automatically, you can run the following command:

```sh
npm run watch
```

## Conclusion

Thanks to Parcel, creating a modern typescript package is a breeze. With zero configuration, Parcel simplifies the build process and allows you to focus on writing code. It's a great alternative to other bundlers like Webpack, Rollup or tools like tsup.

Now you are ready to publish your awesome package to npm and share it with the world! 🌍✨

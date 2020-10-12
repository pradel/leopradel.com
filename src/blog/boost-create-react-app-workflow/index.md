---
title: Boost your create-react-app workflow with esbuild / swc
date: '10/12/2020'
description: 'Get faster build / tests for your create-react-app'
---

We can see a trend to replace the current javascript tooling with faster tools written in go / rust. In this post I decided to try [esbuild](https://github.com/evanw/esbuild) and [swc](https://swc.rs/) to see what performance improvement we can GET in any application using create-react-app.

While writing this post I created 2 projects [create-react-app-swc](https://github.com/pradel/create-react-app-swc) and [create-react-app-esbuild](https://github.com/pradel/create-react-app-esbuild)
to help you integrate either swc or esbuild easily in your application.

### What are these tools and why are they faster?

- [esbuild](https://github.com/evanw/esbuild) is a super-fast javascript/typescript bundler and minifier written in Go.
- [swc](https://swc.rs/) is a super-fast javascript/typescript compiler written in Rust.

Internally create-react-app use babel to compile the javascript / typescript files of your application. We can use these tools to replace the babel with esbuild / swc. `esbuild` also provide a minifier to replace terser.

### What are the benefits?

By using `create-react-app-esbuild` or `create-react-app-esbuild` you will get the following benefits:

- Faster loading time in development
- Faster build time
- Faster tests

## Benchmark

I added both approaches to one of my typescript application to see what are the results.

- default create-react-app build time: [2m 16s](https://github.com/pradel/twoblocks/runs/1242465589?check_suite_focus=true)
- esbuild build time: [1m 00s](https://github.com/pradel/twoblocks/runs/1242471386?check_suite_focus=true)
- swc build time: [1m 12s](https://github.com/pradel/twoblocks/runs/1242474018?check_suite_focus=true)

For a pretty small project, we can see that the build time is faster. For esbuild we can see that our build is **more than 2x faster**.
esbuild is currently faster than swc as it also includes a minifier, so we can replace the default terser minifier with it.

If you are trying this on a bigger project I would love to know the results you get!

📚 Ready to improve the workflow of your app?

- Follow the [installation guide](https://github.com/pradel/create-react-app-esbuild/tree/main/packages/craco-esbuild) for `craco-esbuild`.
- Follow the [installation guide](https://github.com/pradel/create-react-app-swc/tree/main/packages/craco-swc) for `craco-swc`.

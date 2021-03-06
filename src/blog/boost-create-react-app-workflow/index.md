---
title: Boost your create-react-app workflow with esbuild / swc
date: '10/12/2020'
description: 'Get faster build / tests for your create-react-app'
---

We can see a trend of replacing the current javascript tooling with faster tools written in go / rust. In this post, I decided to try [esbuild](https://github.com/evanw/esbuild) and [swc](https://swc.rs/) to see what performance improvement we can get in any application using create-react-app.

As your app is growing, the development environment and compilation are getting slower and slower, it can easily reach 10+ mins for the build time 🐢. To improve build time and ship code faster to production you might be interested in using these tools and get:

- Faster loading time in development
- Faster build time
- Faster tests

While writing this post I created 2 projects [create-react-app-swc](https://github.com/pradel/create-react-app-swc) and [create-react-app-esbuild](https://github.com/pradel/create-react-app-esbuild) to help you integrate either swc or esbuild easily in your application.

_While these tools are focused on the create-react-app tooling, you can take a look at the source code and integrate them into your own webpack configuration._

### Tools

#### Esbuild

[esbuild](https://github.com/evanw/esbuild) is a super-fast javascript/typescript bundler and minifier written in Go. `esbuild` also provides a javascript minifier to replace [terser](https://github.com/terser/terser).

#### Swc

[swc](https://swc.rs/) is a super-fast javascript/typescript compiler written in Rust. In the future you will be able to use swc to check your typescript files. swc is also creating its own webpack alternative called [spack](https://swc.rs/docs/usage-spack-cli).

### How is it working?

Internally create-react-app uses webpack to create a javascript bundle for our application. In your code, you use some ECMAScript features that are not yet available in all browsers (eg: async / await). Babel is used to compile the javascript / typescript files of your application in a backwards compatible version of javascript, meaning it can be used in older browser versions. We can speed up this process by internally **replacing babel with esbuild / swc**, the `babel-loader` is replaced by `esbuild-loader` / `swc-loader` and the code that needs to be processed is sent to the native (go or rust) binary instead of babel.

### Benchmark

I added both approaches to one of my typescript application to see what are the results.

- default create-react-app build time: [2m 16s](https://github.com/pradel/twoblocks/runs/1242465589?check_suite_focus=true)
- esbuild build time: [1m 00s](https://github.com/pradel/twoblocks/runs/1242471386?check_suite_focus=true)
- swc build time: [1m 12s](https://github.com/pradel/twoblocks/runs/1242474018?check_suite_focus=true)

For a pretty small project, we can see that the build time is faster. For esbuild we can see that our build is **more than 2x faster**. esbuild is currently faster than swc as it also includes a minifier, so we can replace the default terser minifier with it.

If you are trying this on a bigger project I would love to know the results you get!

### Future

The [esbuild benchmark](https://github.com/evanw/esbuild#benchmarks) states that "esbuild is at least 10-100x faster than the other JavaScript bundlers", so why don't we get the same result?

In order to have the same results, these tools are not using webpack but rather their own implementation. In the future, I think we will see projects like create-react-app either drops webpack for another faster solution or see them moving the webpack loaders to these new tools written in go / rust.

But as these tools are quite new it will take some time to see them widely used. As of now replacing the webpack loaders seems like the best approach to get a nice performance improvement while still being able to use all the plugins that the webpack ecosystem provides.

### 📚 Ready to improve your app in 2 minutes?

- Follow the [installation guide](https://github.com/pradel/create-react-app-esbuild/tree/main/packages/craco-esbuild) to add `craco-esbuild`.
- Follow the [installation guide](https://github.com/pradel/create-react-app-swc/tree/main/packages/craco-swc) to add `craco-swc`.

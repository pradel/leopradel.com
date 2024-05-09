---
title: Dockerize a nitro application
date: '05/09/2024'
description: 'Create an optimised multi-stage Docker image for a Nitro application'
---

[Nitro](https://nitro.unjs.io/) is a server toolkit/framework that allows you to create web servers with ease and deploy them wherever you prefer.

In this tutorial, we will create an optimised Docker image so you can deploy your app on any VPS or provider.

## Create a new simple nitro server

Let's start by creating a new Nitro server. We will use a really simple "hello world" app for this tutorial. To create and install the template, run the following command in your terminal:

```sh
yarn dlx giget@latest nitro nitro-app --install
cd nitro-app
```

Let's try the application to make sure that everything is correct. To run the application in development mode, run this command:

```sh
yarn run dev
```

In your terminal, you can see from the logs that the application is running properly.

```sh
> dev
> nitro dev

  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose

✔ Nitro Server built in 181 ms
```

Now, open your browser and go to the URL [http://localhost:3000](http://localhost:3000), you should see the following message `Start by editing server/routes/index.ts.`.

Let's edit `server/routes/index.ts` and change it to the following:

```ts
export default eventHandler((event) => {
  return { message: 'Hello world!' };
});
```

Save the file and refresh your page and you should now see some JSON returned by the nitro server.

```json
{
  "message": "Hello world!"
}
```

Finally, let's close the development server by running `Ctrl+C` in your terminal.

## Dockerize the nitro app

Our application is now ready, let's create the docker config. First, we create a new `.dockerignore` file that will tell Docker to not copy these local files and folders when building the image.

```
# .dockerignore

node_modules
# Files generated by nitro
.nitro
.output
```

### Create the optimized Dockerfile

Next, let's create a new `Dockerfile` file that will contain the instructions for building the Docker image. We will use a multi-stage build to create an optimized image.

The fist step is to install the dependencies, this is done as a separate step to take advantage of Docker's caching mechanism, so that we don't have to reinstall the dependencies every time we rebuild the image.

```Dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
```

Then, we build the nitro app in a separate step. This will generate the optimized output in the `.output` folder.

```Dockerfile
# Dockerfile

# Install dependencies
# ... (same as before)

# Build the nitro app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn run build
```

Finally, we create an optimized runner image that will run the nitro app. We copy the optimized output from the builder image and set the user to `nitro` to run the app as a non-root user. If you are familiar with Docker, you will notice that we don't copy the `node_modules` folder to the runner image, this is because nitro already includes all the dependencies in the optimized .output folder.

```Dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies
# ... (same as before)

# Build the nitro app
# ... (same as before)

# Create an optimised runner image
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro
COPY --from=builder /app/.output ./.output
USER nitro
EXPOSE 3000
ENV PORT 3000
CMD ["node", ".output/server/index.mjs"]
```

Our final `Dockerfile` should look like this:

```Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the nitro app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn run build

# Create an optimised runner image
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro
COPY --from=builder /app/.output ./.output
USER nitro
EXPOSE 3000
ENV PORT 3000
CMD ["node", ".output/server/index.mjs"]
```

### Build the Docker image

Let's build our application Docker image, the `-t` flag is used to tag it with the name we want. Run the following command:

```sh
docker build . -t nitro-app
```

### Run the Docker container

Finally, we can run the docker container to test that the app is working properly. Run the following command:

```sh
docker run -p 3000:3000 nitro-app
```

In your terminal, you can see in the Docker logs that the application is running on port 3000.

```
Listening on http://[::]:3000
```

Open your browser at [http://localhost:3000](http://localhost:3000) and see the same "Hello world!" JSON as before.

## Conclusion

Dockerizing a nitro server is very similar to other Node.js applications, except that the optimised build step will generate a smaller Docker image. You can now deploy your Docker image whenever you want (VPS, fly.io, Render etc..).
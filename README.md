# shaderWEB

The website of the shaderLABS Discord server.

## Install Dependencies

```properties
bun install
```

## Building

```properties
bun run build
```

This will build a static single page application (SPA) to `./build/`. All files have precompressed variants: `x.gz` is compressed using gzip and `x.br` is compressed using Brotli.

The files in `./build/_app/` are suitable for cache bursting, which means that their name includes a content hash. They should be cached indefinitly by setting the maximum age to `31536000` and making the cache `immutable` using the Cache-Control header. Once the content of a file changes, its hash and thus its name changes, which means that the old and permanently cached version of that file won't be used anymore. The other files should not be stored in an `immutable` cache and their maximum age should be set to something like `3600`.

## Environment Variables

This project uses Vite and its [environment variable system](https://vitejs.dev/guide/env-and-mode.html). Only `VITE_API_URL` in `.env.development` should be adjusted to match the URL of the development server on which the HTTP API is running.

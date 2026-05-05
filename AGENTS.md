# Repository Guidelines

## Project Structure & Module Organization

This is a small Node.js proxy server project. Application source lives under `src/`.

- `src/index.js` starts the Express app on port `3001` and exposes the `/health` route.
- `src/proxyWithnode/reverseProxy.js` contains the Node-based reverse proxy setup using `http-proxy`.
- `src/nginx/nginx.conf` contains the Nginx reverse proxy configuration for forwarding traffic to the Node app.
- `package.json` and `package-lock.json` define runtime dependencies and npm scripts.

There is no dedicated `test/` directory yet. Add tests beside the feature or under `test/` when introducing a test framework.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: run the Express server with `node src/index.js`.
- `npm test`: currently a placeholder that exits with an error; replace it when adding a test suite.

The project has no build step at present. Run the app locally and verify `GET http://localhost:3001/health` after changes to server behavior.

## Coding Style & Naming Conventions

Use modern JavaScript with ES module `import` syntax, matching the current source files. Prefer `const` unless reassignment is required. Use two-space indentation, double quotes for strings, and semicolons. Keep route handlers and proxy configuration small and explicit.

Name files by responsibility, for example `reverseProxy.js` for proxy setup. Use camelCase for variables and functions. Avoid committing generated output, logs, local environment files, or dependency directories.

## Testing Guidelines

No test framework is configured yet. When adding tests, update `npm test` to run them and document any setup here. Prefer focused integration tests for HTTP routes and proxy behavior, including success and error paths. Use clear test names that describe the behavior, such as `returns health response` or `forwards proxy errors`.

## Commit & Pull Request Guidelines

Recent commits use short imperative messages, for example `create a node proxy server`. Continue using concise, present-tense commit subjects that describe the change.

Pull requests should include a short summary, the commands run for validation, and any configuration or port changes. Link related issues when available. Include screenshots only for user-facing UI changes; they are not expected for this server-only project.

## Security & Configuration Tips

Do not hard-code secrets or production hostnames in source. Keep local ports, allowed CORS origins, and proxy targets easy to review before deployment. Check Nginx and Node proxy port settings together so documentation, logs, and listeners stay consistent.

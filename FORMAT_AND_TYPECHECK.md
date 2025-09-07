# Code Formatting and Type Checking Guide

This project has been configured with complete code formatting and type checking functionality.

## Available Script Commands

### Root Directory Commands (Recommended)

Run the following commands in the project root directory:

#### Formatting Check
```bash
# Check formatting of all files (without modifying files)
npm run format

# Automatically fix formatting issues in all files
npm run format:write
```

#### TypeScript Type Checking
```bash
# Execute TypeScript type checking
npm run tsc

# TypeScript type checking in watch mode
npm run tsc:watch

# Execute TypeScript type checking (alias)
npm run type-check
```

#### ESLint Check
```bash
# Execute ESLint check
npm run lint

# Automatically fix ESLint issues
npm run lint:fix
```

#### Development Server
```bash
# Start both client and server development environments
npm run dev

# Start only client development environment
npm run dev:client

# Start only server development environment
npm run dev:server
```

### Project Specific Commands

#### Client Project (React + TypeScript)
```bash
cd client

# Formatting check
npm run format

# Automatic formatting fix
npm run format:write

# TypeScript type checking
npm run tsc

# Watch mode type checking
npm run tsc:watch

# ESLint check
npm run lint

# ESLint automatic fix
npm run lint:fix
```

#### Server Project (Node.js)
```bash
cd server

# Formatting check
npm run format

# Automatic formatting fix
npm run format:write

# Start server
npm run start
npm run dev
```

## Configuration File Description

### Prettier Configuration
- `.prettierrc` - Prettier formatting rules configuration
- `.prettierignore` - Files and directories to ignore for formatting

### TypeScript Configuration
- `client/tsconfig.json` - TypeScript main configuration file
- `client/tsconfig.app.json` - Application-specific TypeScript configuration
- `client/tsconfig.node.json` - TypeScript configuration for Node.js environment

### ESLint Configuration
- `client/eslint.config.js` - ESLint configuration (Prettier integrated)

## Recommended Workflow

1. **Pre-development check**: Run `npm run tsc` to ensure no type errors
2. **Code formatting**: Run `npm run format:write` to automatically format code
3. **Pre-commit check**: Run `npm run lint` and `npm run tsc` to ensure code quality
4. **Continuous integration**: Run `npm run format` and `npm run tsc` in CI/CD process

## Integration into Git Hooks

These commands can be integrated into Git hooks to automatically execute checks before committing code:

```bash
# Install husky and lint-staged (optional)
npm install --save-dev husky lint-staged

# Add in package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
}
```

## Troubleshooting

If you encounter issues, please check:
1. Whether all dependencies are installed: `npm install`
2. Whether you are running commands in the correct directory
3. Whether configuration files are set up correctly
4. Whether file permissions are correct

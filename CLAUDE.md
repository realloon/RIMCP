# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server that provides RimWorld game source code search and browsing capabilities for AI assistants. It uses TypeScript with Bun runtime and implements security measures to safely expose RimWorld's codebase.

## Essential Commands

```bash
# Install dependencies
bun install

# Build the Def database (required after fresh clone or when Defs change)
bun run index

# Run the MCP server
bun run start

# Development mode (auto-reload)
bun run dev
```

## Architecture

### Core Components

1. **MCP Server Entry** (`src/main.ts`): Registers four tools with the MCP framework
2. **Tool Implementations** (`src/tools/`):
   - `search.ts`: Regex search with file filtering via ripgrep
   - `read-file.ts`: File reading with pagination (100KB limit)
   - `list-directory.ts`: Directory listing with pagination (400 item limit)
   - `get-def-details.ts`: RimWorld Def resolution with XML inheritance

3. **Security Layer** (`src/utils/path-sandbox.ts`): Restricts all file operations to `assets/` directory only

4. **Def Database** (`dist/defs.db`): SQLite index of all RimWorld XML Defs for fast lookups

### Key Design Patterns

- **Path Sanitization**: All user paths are validated against sandbox before use
- **Pagination**: Large files/directories return paginated results to prevent memory issues
- **XML Inheritance**: Def resolution follows RimWorld's ParentName inheritance chain
- **Search Limits**: 400 result lines maximum, 100KB output maximum

### Data Flow

1. XML Def files in `assets/Defs/` are indexed into SQLite database
2. Search operations use ripgrep for fast text matching
3. Def resolution parses XML with inheritance support
4. All file operations validate against sandbox restrictions

## Development Notes

- Uses Bun runtime exclusively (not Node.js)
- Requires ripgrep (`rg`) command available in PATH
- No test framework currently implemented
- Database must be rebuilt when Defs change
- Security model assumes all user input is untrusted
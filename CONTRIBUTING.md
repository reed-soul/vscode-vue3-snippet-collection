# Contributing to Vue 3 Snippets Pro

## How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Adding New Snippets

1. Choose the appropriate category file in `snippets/`
2. Follow the naming convention: `v3[category]-[name]`
3. Include proper documentation and examples
4. Test the snippet before submitting

## Snippet Format

```json
{
  "Snippet Name": {
    "prefix": "v3example",
    "body": [
      "// Your snippet content"
    ],
    "description": "Clear description of the snippet"
  }
}
```

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Make your changes
4. Run tests: `pnpm test`
5. Build: `pnpm run compile`

## Code Style

- Follow TypeScript best practices
- Use consistent naming conventions
- Add proper documentation
- Include tests for new features

## Questions?

Feel free to open an issue for any questions or concerns. 
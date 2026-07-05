# Security Policy

## Reporting a Vulnerability

The Mikav team takes security seriously. If you discover a security vulnerability, we appreciate your responsible disclosure.

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Instead, report them via email:

📧 **security@mikav.info**

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 5 business days
- **Resolution target**: Within 30 days for critical issues

### Scope

This policy applies to the `mikav-web` repository and any services running under the `mikav.info` domain.

### Recognition

We're happy to credit researchers who responsibly disclose vulnerabilities (with your permission) in our changelog and security advisories.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | ✅        |
| < latest | ❌       |

## Best Practices

- Keep dependencies up to date
- Never commit secrets or credentials
- Use environment variables for sensitive configuration
- Review the `.env.example` for required variables

# Security Policy

## Security Considerations

This documentation site is a static site built with VitePress. Here are the security considerations:

### ✅ Safe Practices Implemented

1. **No Server-Side Code**: This is a static site with no backend, reducing attack surface
2. **No User Input Processing**: All content is static markdown files
3. **GitHub Username Validation**: Contributor GitHub usernames are sanitized through VitePress
4. **No External API Calls**: No sensitive data is transmitted
5. **HTTPS Only**: When deployed, should use HTTPS (configure in Coolify)

### ⚠️ Security Recommendations

1. **GitHub Username**: The GitHub username in `site.config.js` is public and safe to commit
2. **Domain Configuration**: Update the `url` in `site.config.js` when you have your domain
3. **Dependencies**: Regularly update npm dependencies:
   ```bash
   npm audit
   npm audit fix
   ```
4. **Content Security**: All markdown content is static - no code execution
5. **Contributor Avatars**: Avatar URLs are from GitHub CDN (trusted source)

### 🔒 Security Best Practices for Deployment

1. **Environment Variables**: If you add any environment variables later, never commit them
2. **Build Process**: Build happens in a controlled environment
3. **HTTPS**: Always use HTTPS in production
4. **CSP Headers**: Consider adding Content Security Policy headers when deploying

### Reporting Security Issues

If you discover a security vulnerability, please:
1. Do NOT open a public issue
2. Email security concerns to the repository maintainer
3. Include details about the vulnerability

## Dependency Security

Run `npm audit` regularly to check for vulnerabilities in dependencies.


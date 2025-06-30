# Deployment Guide

This guide covers how to deploy Mermaid Slides across different platforms and hosting providers.

## 🌐 Web Deployment Options

### GitHub Pages (Recommended)

**Pros**: Free, automatic deployments, custom domain support
**Cons**: Public repos only (for free tier)

```bash
# Enable GitHub Pages in repository settings
# Source: Deploy from a branch
# Branch: main / (root)
# Your site will be available at: https://yourusername.github.io/mermaid-slides
```

**Setup Steps**:

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Save and wait for deployment

**Custom Domain**:

1. Add `CNAME` file with your domain name
2. Configure DNS with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

### Cloudflare Pages

**Pros**: Global CDN, excellent performance, generous free tier
**Cons**: Requires Cloudflare account

```bash
# Build command: npm run build:web
# Build output directory: dist/web
# Environment variables: NODE_VERSION=18
```

**Setup Steps**:

1. Connect your GitHub repository
2. Set build command: `npm run build:web`
3. Set build output: `dist/web`
4. Deploy

### Vercel

**Pros**: Zero config, instant deployments, preview deployments
**Cons**: Limited bandwidth on free tier

```bash
# No build configuration needed for static files
# Just connect repository and deploy
```

**Setup Steps**:

1. Import GitHub repository
2. Framework preset: "Other"
3. Build command: Leave empty (static files)
4. Output directory: `./`
5. Deploy

### Netlify

**Pros**: Form handling, functions, split testing
**Cons**: Build minutes limited on free tier

```bash
# Build command: npm run build:web
# Publish directory: dist/web
```

**Setup Steps**:

1. Connect GitHub repository
2. Build command: `npm run build:web`
3. Publish directory: `dist/web`
4. Deploy

### Firebase Hosting

**Pros**: Google infrastructure, analytics integration
**Cons**: Requires Google account and Firebase project

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

### Surge.sh

**Pros**: Simple CLI deployment, custom domains
**Cons**: Limited features compared to other platforms

```bash
# Install Surge
npm install -g surge

# Deploy
surge dist/web yourdomain.surge.sh
```

## 📱 Self-Hosting Options

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY dist/web/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Deploy with Docker:

```bash
# Build image
docker build -t mermaid-slides .

# Run container
docker run -p 8080:80 mermaid-slides
```

### Apache/Nginx

**Apache (.htaccess)**:

```apache
Options -Indexes
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

**Nginx Configuration**:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/mermaid-slides;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript text/html;

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔒 Offline/Local Distribution

### Zip Package Distribution

Create offline package:

```bash
# Build offline version
npm run build:offline

# Create distribution package
cd dist/offline
zip -r mermaid-slides-offline.zip .

# Users can download, extract, and run:
# python -m http.server 8000
```

### Electron App (Future Enhancement)

For desktop application distribution:

```bash
# Install Electron
npm install electron --save-dev

# Package for different platforms
npm run build:electron-win
npm run build:electron-mac
npm run build:electron-linux
```

## ⚡ Performance Optimization

### CDN Configuration

**Cloudflare**:

```javascript
// Cache everything for 1 hour, browser cache for 1 day
Cache-Control: public, max-age=86400, s-maxage=3600

// For static assets (CSS, JS, images)
Cache-Control: public, max-age=31536000, immutable
```

**AWS CloudFront**:

```json
{
	"DefaultCacheBehavior": {
		"TargetOriginId": "mermaid-slides-origin",
		"ViewerProtocolPolicy": "redirect-to-https",
		"CachePolicyId": "managed-caching-optimized",
		"Compress": true
	}
}
```

### Build Optimizations

**Web Version** (`scripts/build-web.js`):

```javascript
// Minify HTML, inline critical CSS
// Bundle and compress JavaScript
// Optimize images and assets
// Generate service worker for caching
```

**Offline Version** (`scripts/build-offline.js`):

```javascript
// Bundle all dependencies locally
// Remove analytics and external calls
// Create self-contained package
// Add offline usage instructions
```

## 🔍 Monitoring & Analytics

### Google Analytics 4

Add to `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script
	async
	src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag("js", new Date());
	gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Performance Monitoring

**Web Vitals**:

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

**Error Tracking with Sentry**:

```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
	dsn: "YOUR_DSN_HERE",
	environment: "production",
});
```

## 🚀 CI/CD Pipeline

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build web version
        run: npm run build:web

      - name: Build offline version
        run: npm run build:offline

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/web

      - name: Create Release
        if: github.ref == 'refs/heads/main'
        uses: softprops/action-gh-release@v1
        with:
          files: |
            dist/offline/mermaid-slides-offline.zip
          tag_name: v${{ github.run_number }}
          name: Release v${{ github.run_number }}
```

### Deployment Checklist

Before deploying to production:

**Code Quality**:

- [ ] All features working correctly
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met

**Security**:

- [ ] No sensitive data in client code
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Content Security Policy set

**SEO & Meta**:

- [ ] Title and description tags
- [ ] Open Graph tags for social sharing
- [ ] Favicon and app icons
- [ ] Sitemap.xml (if applicable)

**Analytics**:

- [ ] Analytics tracking configured
- [ ] Error monitoring setup
- [ ] Performance monitoring enabled
- [ ] User feedback mechanism

## 🛠️ Troubleshooting

### Common Deployment Issues

**Issue**: Blank page after deployment

```bash
# Check console for errors
# Verify all assets are loading correctly
# Check for mixed content (HTTP/HTTPS) issues
```

**Issue**: Mermaid diagrams not rendering

```bash
# Verify CDN resources are accessible
# Check for Content Security Policy blocks
# Ensure proper error handling is in place
```

**Issue**: File upload not working

```bash
# Check file size limits on hosting platform
# Verify MIME type handling
# Test drag & drop functionality
```

### Performance Issues

**Slow Loading**:

- Enable gzip compression
- Optimize image sizes
- Use CDN for static assets
- Implement service worker caching

**Memory Issues**:

- Limit concurrent diagram rendering
- Implement virtual scrolling for large sets
- Clear unused SVG elements
- Monitor memory usage

## 📞 Support

For deployment issues:

- Check the [troubleshooting guide](docs/TROUBLESHOOTING.md)
- Search existing [GitHub issues](https://github.com/yourusername/mermaid-slides/issues)
- Create a new issue with deployment details
- Contact support: [your-email@example.com]

---

**Need help with a specific platform?** Create an issue with the "deployment" label and we'll help you get set up!

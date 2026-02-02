# Next.js CMS Configuration

This project uses a **dynamic Next.js setup** (not static export) to support the CMS admin dashboard with API routes.

## Important Notes

### Static Export Disabled

The `output: "export"` configuration has been **removed** from `next.config.ts` because:

- API routes require server-side rendering
- Admin authentication needs server functions
- Image uploads require server endpoints

### Deployment Options

**For GitHub Pages (Static Site):**
If you want to deploy the public-facing site as static HTML:

1. Keep the CMS admin on a separate deployment (Vercel, Netlify)
2. Use the CMS to manage content
3. Build static pages that fetch data at build time

**For Full-Stack Deployment (Recommended):**
Deploy to platforms that support Next.js server features:

- **Vercel** (recommended, made by Next.js creators)
- **Netlify**
- **Railway**
- **Render**

### Authentication Pattern

We use **proxy-based authentication** instead of middleware:

- `lib/proxy.ts` contains server-side auth helpers
- `requireAuth()` checks authentication in admin layouts
- More reliable than middleware for this use case

### Images

Images are set to `unoptimized: true` for development. For production:

- Vercel handles optimization automatically
- Other platforms may need additional configuration

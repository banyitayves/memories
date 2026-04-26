# Environment Configuration for Student Learning Platform

## Development
```bash
npm run dev
```

## Production Build for Vercel
```bash
npm run build
npm start
```

## Key Features
- ✅ React 18 with Next.js 16
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Server-side and client-side rendering
- ✅ API routes (backend)
- ✅ Automatic deployment to Vercel

## Deployment to Vercel

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Upgrade to React + Next.js backend"
   git push origin main
   ```

2. **Auto-deploy on Vercel**
   - Connect your repository to Vercel
   - Changes are automatically deployed when pushed

3. **Environment Variables**
   - Add any API keys in Vercel Settings → Environment Variables
   - Variables are automatically available to your app

## Troubleshooting

### API Routes Not Found
- Ensure files are in `app/api/` directory
- Restart dev server: `npm run dev`

### Build Errors
- Clear `.next` folder: `rm -r .next`
- Reinstall dependencies: `npm install`
- Rebuild: `npm run build`

## File Structure
```
app/
├── api/
│   ├── courses/
│   ├── notes/
│   └── health/
├── components/
├── lib/
├── layout.tsx
└── page.tsx
```

# Deployment Guide for Shop Website

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

1. **Test Build Locally**
   ```bash
   npm run build
   npm start
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shop-website.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)
   - Click "Deploy"

### Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NODE_ENV=production
DATABASE_URL=file:./dev.db
JWT_SECRET=your-super-secret-jwt-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
SMS_SERVICE=local
```

### Database Setup

For production, consider upgrading from SQLite to PostgreSQL:

1. **Create a database** (Vercel Postgres, PlanetScale, or Supabase)
2. **Update DATABASE_URL** to your production database
3. **Run migrations**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

## 🔧 Alternative Deployments

### Netlify
1. Build: `npm run build`
2. Publish directory: `.next`
3. Build command: `npm run build`

### Railway
1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

### DigitalOcean App Platform
1. Create new app
2. Connect GitHub
3. Configure build settings

## 📋 Pre-Deployment Checklist

- [ ] Build works locally (`npm run build`)
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Email/SMS services configured
- [ ] Domain name ready (optional)

## 🔒 Security Notes

- Never commit `.env` files
- Use strong JWT secrets
- Enable HTTPS (automatic on Vercel)
- Configure CORS if needed

## 📱 Post-Deployment

1. Test all functionality
2. Check admin panel access
3. Test email/SMS notifications
4. Verify cart functionality
5. Test user registration/login

## 🆘 Troubleshooting

### Build Errors
- Check Node.js version (use Node 18+)
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm ci`

### Database Issues
changeser  aftntdeploymet Restarnames
- le os in variabr typeck fo set
- Ch areed varsire all requ
- Ensurariablesnt Vmeron
### Envissions
se permik databate`
- Checeraprisma gen- Run `npx  format
TABASE_URL DA- Verify
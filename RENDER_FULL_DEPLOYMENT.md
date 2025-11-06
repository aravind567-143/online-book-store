# 🚀 Deploy Full Project on Render

## Complete Guide to Deploy Both Frontend & Backend on Render

---

## 📋 Prerequisites

✅ GitHub repository: https://github.com/aravind567-143/online-book-store
✅ Render account (free): https://render.com
✅ MongoDB Atlas cluster (already configured)

---

## 🎯 Deployment Method 1: Using render.yaml (Recommended)

This method deploys both frontend and backend together using a Blueprint.

### Step 1: Connect Repository to Render

1. **Go to Render Dashboard:**
   - Visit https://dashboard.render.com

2. **Create New Blueprint:**
   - Click "New +" → "Blueprint"
   - Or go directly to: https://dashboard.render.com/blueprints

3. **Connect GitHub Repository:**
   - Click "Connect GitHub"
   - Authorize Render to access your repositories
   - Select repository: `aravind567-143/online-book-store`
   - Click "Connect"

### Step 2: Configure Environment Variables

Render will detect the `render.yaml` file. You need to add environment variables:

#### For Backend (online-bookstore-api):

**MONGODB_URI:**
```
mongodb+srv://billanaaravind_db_user:NzxMXW5P78m7yrXm@cluster0.fmwsxrw.mongodb.net/online-book-store?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true&ssl=true
```

**JWT_SECRET:**
```
5040b12d5d9024b58ba439a823a1553e74e540759910b621fd4ecc58f3769048509c2cf0e0bcc5d0fc5a1d3cdb62f69fe05cf7354005cde3c5fdb26ad1e3cfcc
```

#### For Frontend (online-bookstore-frontend):

The `VITE_API_URL` will be automatically set to your backend URL.

### Step 3: Deploy

1. **Review Configuration:**
   - Render will show you both services that will be created:
     * `online-bookstore-api` (Backend - Node.js)
     * `online-bookstore-frontend` (Frontend - Static Site)

2. **Click "Apply":**
   - Render will start creating both services
   - This takes about 5-10 minutes

3. **Monitor Deployment:**
   - You can watch the build logs for each service
   - Backend deploys first, then frontend

### Step 4: Update Frontend API URL (if needed)

After backend is deployed:

1. **Get Backend URL:**
   - Your backend will be at: `https://online-bookstore-api.onrender.com`

2. **Update Frontend Environment Variable:**
   - Go to frontend service settings
   - Update `VITE_API_URL` to: `https://online-bookstore-api.onrender.com/api`
   - Trigger manual redeploy

---

## 🎯 Deployment Method 2: Deploy Services Separately

If Blueprint method doesn't work, deploy each service individually:

### Deploy Backend First:

1. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect repository: `aravind567-143/online-book-store`
   - Configure:
     ```
     Name: online-bookstore-api
     Region: Oregon (US West)
     Branch: main
     Root Directory: backend
     Runtime: Node
     Build Command: npm install
     Start Command: npm start
     Instance Type: Free
     ```

2. **Add Environment Variables:**
   ```
   NODE_ENV = production
   PORT = 4000
   MONGODB_URI = mongodb+srv://billanaaravind_db_user:NzxMXW5P78m7yrXm@cluster0.fmwsxrw.mongodb.net/online-book-store?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true&ssl=true
   JWT_SECRET = 5040b12d5d9024b58ba439a823a1553e74e540759910b621fd4ecc58f3769048509c2cf0e0bcc5d0fc5a1d3cdb62f69fe05cf7354005cde3c5fdb26ad1e3cfcc
   ```

3. **Create Web Service**
   - Wait for deployment (3-5 minutes)
   - Note your backend URL: `https://online-bookstore-api.onrender.com`

### Deploy Frontend Second:

1. **Create Static Site:**
   - Click "New +" → "Static Site"
   - Connect repository: `aravind567-143/online-book-store`
   - Configure:
     ```
     Name: online-bookstore-frontend
     Branch: main
     Root Directory: frontend
     Build Command: npm install && npm run build
     Publish Directory: dist
     ```

2. **Add Environment Variable:**
   ```
   VITE_API_URL = https://online-bookstore-api.onrender.com/api
   ```
   (Use the actual backend URL from previous step)

3. **Create Static Site**
   - Wait for deployment (2-3 minutes)

---

## ✅ After Deployment

### Your Live URLs:

**Backend API:**
```
https://online-bookstore-api.onrender.com
```

**Frontend App:**
```
https://online-bookstore-frontend.onrender.com
```

### Test Your Deployment:

1. **Test Backend:**
   ```bash
   # Health check
   curl https://online-bookstore-api.onrender.com/api/health
   
   # Get books
   curl https://online-bookstore-api.onrender.com/api/books
   ```

2. **Test Frontend:**
   - Open: https://online-bookstore-frontend.onrender.com
   - Browse books
   - Try login with: test@bookstore.com / test123
   - Add to cart
   - Test checkout

---

## 🔧 Post-Deployment Configuration

### 1. MongoDB Atlas IP Whitelist

Ensure Render can connect to MongoDB:

1. Go to MongoDB Atlas Dashboard
2. Navigate to: Network Access
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

### 2. Update CORS (if needed)

If you get CORS errors, update `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://online-bookstore-frontend.onrender.com'
  ],
  credentials: true
}));
```

Then commit and push:
```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push
```

Render will auto-redeploy.

---

## 🔄 Continuous Deployment

Every time you push to GitHub, Render automatically redeploys:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Render automatically redeploys both services
```

---

## ⚠️ Important Notes

### Free Tier Limitations:

**Backend (Web Service):**
- ✅ 750 hours/month (enough for 1 service)
- ⚠️ Spins down after 15 minutes of inactivity
- ⏱️ First request after sleep: ~30 seconds
- 💾 512MB RAM

**Frontend (Static Site):**
- ✅ Unlimited bandwidth
- ✅ No spin-down (always available)
- ✅ Global CDN
- ✅ Free SSL certificate

### Keep Backend Active:

**Option 1: UptimeRobot (Free)**
1. Sign up at: https://uptimerobot.com
2. Add monitor: https://online-bookstore-api.onrender.com/api/health
3. Set interval: 14 minutes
4. This keeps your backend awake 24/7

**Option 2: Render Cron Job (Free)**
Create a cron job that pings your API every 14 minutes

**Option 3: Upgrade to Paid Plan ($7/month)**
- No cold starts
- More resources
- Priority support

---

## 📊 Monitor Your Services

### Render Dashboard:
- View logs in real-time
- Monitor metrics (CPU, Memory, Bandwidth)
- Check deployment history
- View environment variables

### Set Up Alerts:
1. Go to service settings
2. Enable notifications
3. Add email for alerts
4. Get notified of deployment failures

---

## 🔐 Security Best Practices

1. **Environment Variables:**
   - ✅ Never commit `.env` files
   - ✅ Use Render's environment variables feature
   - ✅ Rotate JWT secrets regularly

2. **MongoDB:**
   - ✅ Use strong passwords
   - ✅ Enable IP whitelist
   - ✅ Use connection string with SSL

3. **HTTPS:**
   - ✅ Automatic on Render (free SSL)
   - ✅ Enforce HTTPS in production

4. **Rate Limiting:**
   - Consider adding rate limiting middleware
   - Protect against DDoS attacks

---

## 🐛 Troubleshooting

### Backend won't start:
- Check logs in Render dashboard
- Verify all environment variables are set
- Check MongoDB Atlas connection
- Ensure IP whitelist includes 0.0.0.0/0

### Frontend shows API errors:
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Open browser console for errors
- Test backend API directly

### Build fails:
- Check build logs for errors
- Verify `package.json` has all dependencies
- Ensure Node version compatibility
- Check root directory settings

### Database connection fails:
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist
- Ensure database name is included in URI
- Check MongoDB Atlas cluster status

---

## 💰 Cost Breakdown (Free Tier)

| Service | Cost | Limits |
|---------|------|--------|
| Backend Web Service | Free | 750 hrs/month, sleeps after 15 min |
| Frontend Static Site | Free | Unlimited |
| MongoDB Atlas | Free | 512MB storage, Shared cluster |
| **Total** | **$0/month** | Suitable for development/testing |

### When to Upgrade:

**Backend to Paid ($7/month):**
- When you need 24/7 availability
- When cold starts are unacceptable
- For production applications

**MongoDB to Paid ($9/month):**
- When you need more than 512MB storage
- For better performance
- For production workloads

---

## 🎯 Deployment Checklist

**Pre-Deployment:**
- [x] Code pushed to GitHub
- [x] MongoDB Atlas configured
- [x] Environment variables documented
- [x] `render.yaml` created

**Backend Deployment:**
- [ ] Web service created on Render
- [ ] Environment variables added
- [ ] Service deployed successfully
- [ ] API endpoints tested
- [ ] MongoDB connection verified

**Frontend Deployment:**
- [ ] Static site created on Render
- [ ] API URL configured
- [ ] Build successful
- [ ] Site accessible
- [ ] API integration working

**Post-Deployment:**
- [ ] CORS configured
- [ ] MongoDB IP whitelist updated
- [ ] UptimeRobot monitor added (optional)
- [ ] Custom domain added (optional)
- [ ] SSL certificate verified

---

## 🎉 Success!

Your full-stack online bookstore is now live on Render!

**Share your links:**
- Backend: `https://online-bookstore-api.onrender.com`
- Frontend: `https://online-bookstore-frontend.onrender.com`

**Next Steps:**
1. Test all features thoroughly
2. Share with friends/portfolio
3. Add to your resume
4. Consider custom domain
5. Monitor usage and performance

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Web Services Guide](https://render.com/docs/web-services)
- [Render Static Sites Guide](https://render.com/docs/static-sites)
- [Render Blueprints Guide](https://render.com/docs/infrastructure-as-code)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

---

**🚀 Happy Deploying!**

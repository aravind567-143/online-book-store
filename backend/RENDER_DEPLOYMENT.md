# 🚀 Deploy Backend to Render

## Step-by-Step Deployment Guide

### 1️⃣ **Prerequisites**
- ✅ GitHub account
- ✅ Render account (sign up at https://render.com)
- ✅ MongoDB Atlas cluster (already set up)

### 2️⃣ **Push Code to GitHub**

1. **Initialize Git (if not already done):**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend setup"
   ```

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Create a new repository named `online-bookstore-backend`
   - Don't initialize with README (we already have code)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/online-bookstore-backend.git
   git branch -M main
   git push -u origin main
   ```

### 3️⃣ **Deploy on Render**

1. **Go to Render Dashboard:**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

2. **Connect GitHub Repository:**
   - Select your `online-bookstore-backend` repository
   - Click "Connect"

3. **Configure Web Service:**
   ```
   Name: online-bookstore-api
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: (leave empty or use "backend" if you pushed the whole project)
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Select Plan:**
   - Choose "Free" plan
   - Click "Advanced" to add environment variables

5. **Add Environment Variables:**
   Click "Add Environment Variable" for each:
   
   ```
   Key: NODE_ENV
   Value: production
   
   Key: PORT
   Value: 4000
   
   Key: MONGODB_URI
   Value: mongodb+srv://billanaaravind_db_user:NzxMXW5P78m7yrXm@cluster0.fmwsxrw.mongodb.net/online-book-store?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true&ssl=true
   
   Key: JWT_SECRET
   Value: 5040b12d5d9024b58ba439a823a1553e74e540759910b621fd4ecc58f3769048509c2cf0e0bcc5d0fc5a1d3cdb62f69fe05cf7354005cde3c5fdb26ad1e3cfcc
   ```

6. **Create Web Service:**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)

### 4️⃣ **After Deployment**

Once deployed, Render will give you a URL like:
```
https://online-bookstore-api.onrender.com
```

**Test your API:**
```bash
# Health check
curl https://online-bookstore-api.onrender.com/api/health

# Get books
curl https://online-bookstore-api.onrender.com/api/books
```

### 5️⃣ **Update Frontend to Use Deployed Backend**

Update `frontend/.env`:
```env
VITE_API_URL=https://online-bookstore-api.onrender.com/api
```

### 6️⃣ **Important Notes**

⚠️ **Free Tier Limitations:**
- Service spins down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month free (then service stops)

✅ **Keep Service Active:**
- Use a service like UptimeRobot to ping your API every 14 minutes
- Or upgrade to paid plan ($7/month)

🔒 **Security Tips:**
1. Use Render's "Secret Files" for sensitive data
2. Enable automatic deploys on GitHub push
3. Set up custom domain (optional)
4. Enable HTTPS (automatic on Render)

### 7️⃣ **Seed Database on Render**

After deployment, seed your MongoDB Atlas database:

1. Open Render Shell (from service dashboard)
2. Run: `npm run seed`

Or run it locally (it will seed the cloud database):
```bash
npm run seed
```

### 8️⃣ **Continuous Deployment**

Render automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update API"
git push
```

### 9️⃣ **Monitor Your Service**

- View logs in Render Dashboard
- Set up email alerts for downtime
- Monitor metrics (CPU, Memory, Requests)

---

## 🔥 Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Add environment variables
- [ ] Deploy service
- [ ] Test API endpoints
- [ ] Seed database
- [ ] Update frontend API URL
- [ ] Test full application

---

## 📞 Troubleshooting

**Build Fails:**
- Check build logs in Render dashboard
- Verify `package.json` has all dependencies
- Ensure Node version compatibility

**MongoDB Connection Fails:**
- Verify MongoDB Atlas connection string
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Render)
- Ensure connection string includes database name

**Service Crashes:**
- Check application logs
- Verify environment variables are set correctly
- Ensure PORT is set to 4000

---

**🎉 That's it! Your backend is now deployed on Render!**

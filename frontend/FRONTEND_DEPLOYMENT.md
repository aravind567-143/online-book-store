# 🚀 Deploy Frontend to Vercel/Netlify

## Option 1: Deploy to Vercel (Recommended)

### 1️⃣ **Prerequisites**
- ✅ GitHub account
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Backend deployed on Render (with URL)

### 2️⃣ **Prepare Frontend**

1. **Update API URL in `.env`:**
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

2. **Create `vercel.json` configuration:**
   (Already created - see file)

3. **Test build locally:**
   ```bash
   cd frontend
   npm run build
   ```

### 3️⃣ **Push to GitHub**

```bash
cd frontend
git init
git add .
git commit -m "Initial frontend setup"
git remote add origin https://github.com/YOUR_USERNAME/online-bookstore-frontend.git
git branch -M main
git push -u origin main
```

### 4️⃣ **Deploy on Vercel**

1. **Go to Vercel:**
   - Visit https://vercel.com/new
   - Import your GitHub repository

2. **Configure Project:**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Add Environment Variable:**
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes

5. **Your site will be live at:**
   ```
   https://your-project-name.vercel.app
   ```

---

## Option 2: Deploy to Netlify

### 1️⃣ **Prerequisites**
- ✅ GitHub account
- ✅ Netlify account (sign up at https://netlify.com)

### 2️⃣ **Deploy Steps**

1. **Go to Netlify:**
   - Visit https://app.netlify.com
   - Click "Add new site" → "Import an existing project"

2. **Connect GitHub:**
   - Select your repository
   - Click "Deploy site"

3. **Configure Build Settings:**
   ```
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variable:**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

5. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes

6. **Your site will be live at:**
   ```
   https://your-site-name.netlify.app
   ```

---

## 🔧 Post-Deployment Configuration

### Update CORS on Backend

If you get CORS errors, update backend `server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app',
    'https://your-frontend.netlify.app'
  ],
  credentials: true
}));
```

### Custom Domain (Optional)

Both Vercel and Netlify support custom domains:
1. Buy domain from Namecheap, GoDaddy, etc.
2. Add domain in dashboard
3. Update DNS records

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Update `VITE_API_URL` in frontend `.env`
- [ ] Push frontend to GitHub
- [ ] Deploy to Vercel/Netlify
- [ ] Test API connection
- [ ] Test all features (login, cart, checkout)
- [ ] Configure custom domain (optional)

---

## 🎉 Your Full-Stack App is Live!

- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://your-api.onrender.com
- **Database:** MongoDB Atlas

**Share your live app with the world! 🌍**

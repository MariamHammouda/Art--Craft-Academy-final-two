# Deployment & Cache Management Guide

## 🎯 How Cache Works After Deployment

### For NEW Visitors:
✅ **See new videos IMMEDIATELY**
- No cache exists
- Fresh data is fetched from YouTube

### For RETURNING Visitors:
⏰ **See new videos after 30 minutes**
- Old cache expires
- New data is automatically fetched

---

## 🚀 Deployment Process

### When Adding New YouTube Videos:

#### **Option 1: Automatic Cache Invalidation (RECOMMENDED)**

**Before deploying:**

1. Open `src/services/cacheManager.js`
2. Find line 14: `const CACHE_VERSION = 'v2_2025';`
3. Change to a new version: `const CACHE_VERSION = 'v3_2025';`
4. Deploy

**Result:** All users (new and returning) will see new videos immediately!

---

#### **Option 2: Wait for Natural Cache Expiration**

**Just deploy** - No code changes needed

**Result:** 
- New visitors: See videos immediately
- Returning visitors: See videos after 30 minutes

---

#### **Option 3: Manual Cache Clear (For Testing)**

**In browser console, run:**
```javascript
window.clearVideoCache()
```

Or:
```javascript
localStorage.clear(); sessionStorage.clear(); window.location.reload(true);
```

---

## 📋 Cache Duration Settings

Current settings in code:

- **YouTube API Cache**: 30 minutes (`src/services/youtubeApi.js` line 249)
- **In-memory Cache**: 30 minutes (`src/hooks/useYouTubeVideos.js` line 8)
- **Default Cache**: 2 hours (`src/services/cacheManager.js` line 17)

---

## 💡 Best Practice

### For Regular YouTube Updates:

1. Add new videos to YouTube playlists
2. Update `CACHE_VERSION` in `src/services/cacheManager.js`
3. Deploy
4. ✅ All users see new videos immediately!

### Example:
```javascript
// Before deployment:
const CACHE_VERSION = 'v2_2025';

// After adding videos, change to:
const CACHE_VERSION = 'v3_2025';

// Or use date for easy tracking:
const CACHE_VERSION = 'v_2025_01_15'; // January 15, 2025
```

---

## 🔍 Troubleshooting

### Videos still not showing after deployment?

1. **Check cache version was updated**
   - Open browser console
   - Should see: "🔄 Cache version changed from v2_2025 to v3_2025, clearing old cache..."

2. **Hard refresh browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

3. **Clear browser cache manually**
   - `Ctrl + Shift + Delete` (Windows) / `Cmd + Shift + Delete` (Mac)
   - Select "Cached images and files"
   - Click "Clear data"

4. **Check console for errors**
   - Press F12
   - Look for red error messages
   - Check if YouTube API quota is exceeded

---

## 📊 Cache Architecture

```
┌─────────────────────────────────────┐
│         User Visits Site            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Check Cache Version in localStorage│
└──────────────┬──────────────────────┘
               │
          ┌────┴────┐
          │ Match?  │
          └────┬────┘
               │
        ┌──────┴───────┐
        │              │
       YES             NO
        │              │
        ▼              ▼
   Use Cache      Clear All Cache
   (30 min)       Fetch Fresh Data
        │              │
        └──────┬───────┘
               │
               ▼
      Display Videos to User
```

---

## ⚙️ Advanced: Change Cache Duration

To change how long data is cached:

### 1. YouTube API Cache (30 minutes)
**File:** `src/services/youtubeApi.js`
**Line:** 249
```javascript
setCache(cacheKey, videos, 30 * 60 * 1000); // Change 30 to desired minutes
```

### 2. In-Memory Cache (30 minutes)
**File:** `src/hooks/useYouTubeVideos.js`
**Line:** 8
```javascript
const CACHE_DURATION = 30 * 60 * 1000; // Change 30 to desired minutes
```

### 3. Default Cache (2 hours)
**File:** `src/services/cacheManager.js`
**Line:** 17
```javascript
const DEFAULT_CACHE_DURATION = 2 * 60 * 60 * 1000; // Change to desired milliseconds
```

---

## 📝 Notes

- Shorter cache = More API calls = Higher YouTube API quota usage
- Longer cache = Better performance but slower to show new content
- 30 minutes is a good balance between freshness and quota usage
- Always increment CACHE_VERSION when deploying new content


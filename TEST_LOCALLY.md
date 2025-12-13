# Testing Widget Locally with Your Server as Provider

## ✅ Server Status

Your Next.js dev server is running on:
- **Local**: `http://localhost:3000`
- **Network**: `http://192.168.31.29:3000`

---

## 📍 Access the Widget in 3 Ways

### Option 1: Test with Built-in Demo Page
Visit: **http://localhost:3000/demo**

This page has the widget already embedded and shows it in action.

---

### Option 2: Test with Custom Embed Page
Visit: **http://localhost:3000/test-embed.html**

This is a standalone HTML page that demonstrates:
- How to embed the widget from your localhost
- Test controls (Open, Close, Reinitialize)
- Server connectivity check
- Network request inspection

---

### Option 3: Create Your Own Test Page

Create any HTML file and add this embed code:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Widget Test</title>
</head>
<body>
  <h1>Welcome to My Site</h1>
  <p>The widget should appear in the bottom right corner</p>

  <!-- Widget Embed Code -->
  <script
    src="http://localhost:3000/widget-init.js"
    data-board-id="my-test-project"
    data-user-id="test-user"
    async
  ></script>
</body>
</html>
```

---

## 🧪 Testing Checklist

- [ ] Visit `http://localhost:3000/demo`
- [ ] See floating button in bottom right corner
- [ ] Click the button to open the widget
- [ ] Fill out the form:
  - Title: "Test Feedback"
  - Content: "This is a test"
  - Category: Select one
- [ ] Click "Send Feedback"
- [ ] See success message
- [ ] Check browser console for any errors (F12)
- [ ] Check Network tab to see POST to `/api/feedback`

---

## 📡 How the Widget Works

1. **Widget Script**: `http://localhost:3000/widget-init.js`
   - Initializes the widget on any page
   - Configurable via data attributes

2. **Widget Component**: `http://localhost:3000/[widget-component]`
   - React component that renders the UI
   - Built with React 19 hooks

3. **API Endpoint**: `http://localhost:3000/api/feedback`
   - Receives form submissions
   - Processes feedback data

---

## 🔧 Configuration Options

Use these data attributes when embedding:

```html
<script
  src="http://localhost:3000/widget-init.js"
  data-board-id="required-id"           <!-- Required -->
  data-user-id="optional-id"             <!-- Optional -->
  data-theme="light"                     <!-- Optional: light|dark -->
  data-api-url="http://localhost:3000/api/feedback"  <!-- Optional -->
  async
></script>
```

---

## 💻 Test the API Directly

Use curl or Postman to test the feedback endpoint:

```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Title",
    "content": "Test content",
    "category": "idea",
    "boardId": "test-board",
    "userId": "test-user"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Feedback received successfully"
}
```

---

## 🔍 Debugging

### Check Console Errors
Press `F12` to open Developer Tools:
- **Console tab**: Look for JavaScript errors
- **Network tab**: Check requests to `/api/feedback`
- **Elements tab**: Inspect the widget structure

### Common Issues

**Widget not appearing?**
- Make sure script URL is correct: `http://localhost:3000/widget-init.js`
- Check console for 404 errors
- Verify `data-board-id` attribute is present

**Form not submitting?**
- Check Network tab for POST requests
- Look for API response status (should be 200)
- Check server logs for errors

**CORS errors?**
- Widget loads from same origin, so CORS shouldn't be an issue
- If using different port, check headers in API response

---

## 🚀 Server Commands

### Start Server
```bash
npm run dev
```

### Stop Server
Press `Ctrl+C` in the terminal running the server

### View Logs
Check the terminal where `npm run dev` is running for server logs

### Rebuild
```bash
npm run build
npm run build:widget
```

---

## 📊 File Structure

```
widget/
├── public/
│   ├── widget-init.js          ← Widget initialization script
│   └── test-embed.html         ← Test page
├── app/
│   ├── components/
│   │   └── FeedbackWidget.tsx  ← Widget component
│   ├── api/
│   │   └── feedback/
│   │       └── route.ts        ← API endpoint
│   ├── demo/page.tsx           ← Demo page
│   └── page.tsx                ← Home page
```

---

## 📋 URLs Reference

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Home page |
| `http://localhost:3000/demo` | Built-in demo with widget |
| `http://localhost:3000/test-embed.html` | Custom test page |
| `http://localhost:3000/widget-init.js` | Widget initialization script |
| `http://localhost:3000/api/feedback` | Feedback submission endpoint |

---

## ✨ What You Can Do Now

1. **View the widget**: Visit `/demo` or `/test-embed.html`
2. **Submit feedback**: Fill the form and submit
3. **Check API**: Make POST requests to `/api/feedback`
4. **Customize**: Edit `app/components/FeedbackWidget.tsx` and save (hot reload)
5. **Deploy**: When ready, `npm run build:widget` and deploy to production

---

## 🎯 Next Steps

1. ✅ **Test locally** - Visit `http://localhost:3000/demo`
2. **Customize** - Edit widget colors, categories, fields
3. **Configure API** - Set your feedback storage endpoint
4. **Build for production** - `npm run build:widget`
5. **Deploy** - Push to Vercel or CDN
6. **Share** - Give clients the embed code

---

## 📞 Quick Access

- **Demo Page**: http://localhost:3000/demo
- **Test Page**: http://localhost:3000/test-embed.html
- **Home**: http://localhost:3000
- **Widget Script**: http://localhost:3000/widget-init.js
- **API Endpoint**: http://localhost:3000/api/feedback

---

**Your server is ready! Open http://localhost:3000 in your browser to get started! 🚀**

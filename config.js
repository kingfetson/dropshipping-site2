/* ============================================================
   config.js — TrendKe Fashion Configuration
   ⚠️ REPLACE ALL PLACEHOLDERS BEFORE GOING LIVE
   ============================================================ */

const CONFIG = {
  /* ── CONTACT & PAYMENT ─────────────────────────────────── */
  
  // 👇 WhatsApp business number (country code, no + or spaces)
  // Example: "254712345678" for +254 712 345 678
  WHATSAPP_NUMBER: "254700000000",

  // 👇 Your M-Pesa Till Number or Paybill
  // Customers will see this in payment instructions
  MPESA_TILL: "123456",

  /* ── BACKEND INTEGRATION ───────────────────────────────── */
  
  // 👇 Google Apps Script Web App URL for order logging
  // Deploy your script as "Web App" → "Anyone" access
  // Format: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",

  /* ── DELIVERY PRICING (KES) ────────────────────────────── */
  
  // Delivery fee for Nairobi CBD & surrounding areas
  DELIVERY_NAIROBI: 150,
  
  // Delivery fee for outside Nairobi (upcountry)
  DELIVERY_OUTSIDE: 350,

  /* ── MARKETING & URGENCY ───────────────────────────────── */
  
  // Countdown timer duration in hours (resets per session)
  COUNTDOWN_HOURS: 2,

  // Business name displayed in header/footer
  BUSINESS_NAME: "TrendKe Fashion",

  // Optional tagline for SEO/meta
  TAGLINE: "Kenya's #1 Fashion Drop-shop",

  /* ── OPTIONAL: ANALYTICS IDs ───────────────────────────── */
  
  // Google Analytics 4 Measurement ID (starts with G-)
  // GA_MEASUREMENT_ID: "G-XXXXXXXXXX",
  
  // Facebook Pixel ID (if using Meta ads)
  // FB_PIXEL_ID: "1234567890",

  /* ── OPTIONAL: BUSINESS DETAILS ────────────────────────── */
  
  // Physical location for footer/SEO
  // BUSINESS_ADDRESS: "Nairobi, Kenya",
  
  // Business hours for customer expectations
  // BUSINESS_HOURS: "Mon-Sat: 9AM-7PM, Sun: 10AM-4PM",
};

/* ============================================================
   🔐 SECURITY NOTES:
   
   1. NEVER commit real phone numbers/Till numbers to public repos
   2. Use environment variables in production if possible
   3. Validate all form inputs server-side (Google Script)
   4. Rate-limit WhatsApp API calls to avoid bans
   
   ✅ This config is client-side only - sensitive logic 
      (payment verification, order processing) should 
      happen on your secure backend.
   ============================================================ */

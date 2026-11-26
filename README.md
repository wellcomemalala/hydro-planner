# 🥬 HydroPlan – วางแผนวันปลูกผักไฮโดร

ไฟล์เดียว `index.html` (HTML + CSS + JS ล้วน) ใช้ Firebase Realtime Database ซิงก์ข้อมูลทุกเครื่อง

## ขั้นตอนค่าเริ่มต้น (รวม 44 วัน)
| ขั้นตอน | วัน |
|---|---|
| 🌱 เพาะเมล็ด → ❄️ แช่ตู้เย็น | 2 |
| 🌑 พักในที่มืด | 1 |
| 🧽 ลงฟองน้ำ | 7 |
| 💧 เติมน้ำปุ๋ย | 7 |
| 📦 ลงกล่อง | 20 |
| 🌿 แช่น้ำชีวภาพ (น้ำดี) | 7 |
| 🥬 เก็บเกี่ยว | – |

ตัวอย่าง: เพาะ 26 พ.ย. 69 → เก็บ 9 ม.ค. 70

## Deploy
1. สร้าง repo ใหม่บน GitHub แล้วอัปโหลดโฟลเดอร์นี้
2. app.netlify.com → Add new site → Import from GitHub → เลือก repo
3. Build command: เว้นว่าง · Publish directory: `/` (หรือเว้นว่าง) → Deploy

## 📲 ติดตั้งเป็นแอปบนมือถือ (PWA)
- **Android (Chrome):** เปิดเว็บ → กดปุ่ม "📲 ติดตั้งแอป" มุมขวาบน หรือเมนู ⋮ → "ติดตั้งแอป / เพิ่มลงในหน้าจอหลัก"
- **iPhone (Safari):** ปุ่มแชร์ ⬆️ → "เพิ่มไปยังหน้าจอโฮม"
- ต้องเปิดผ่านลิงก์ https ของ Netlify (เปิดไฟล์จากเครื่องตรง ๆ จะติดตั้งไม่ได้)
- แก้ index.html แล้วอยากให้มือถืออัปเดตเร็ว → เปลี่ยน `hydroplan-v1` ใน `sw.js` เป็น `v2`, `v3` ...

## Firebase Realtime Database Rules
Firebase Console → Realtime Database → Rules (ให้แอปอ่าน/เขียนเฉพาะโหนด `hydroPlanner`):

```json
{
  "rules": {
    "hydroPlanner": {
      ".read": true,
      ".write": true
    }
  }
}
```

> ⚠️ แบบนี้ใครมีลิงก์เว็บก็แก้ข้อมูลได้ ถ้าต้องการความปลอดภัยเพิ่ม ให้เพิ่ม Firebase Authentication (เช่น login ด้วย Google) แล้วเปลี่ยนเป็น `"auth != null"`

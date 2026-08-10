# 🌍 StayComfy - Travel Listings and Reviews

StayComfy is a full-stack travel web application that allows users to explore, create, and manage travel destination listings. Authenticated users can post new places, upload images, leave reviews, and interact with other travelers.

---

## 🖼️ youtube video link.. TO WATCH TO WEBSITE FUNCIONS
https://youtu.be/aIO_Bz2INzc



---

## 🔧 Tech Stack

**Frontend**
- EJS (Embedded JavaScript Templates)
- Bootstrap 5
- Vanilla JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB with Mongoose

**Other Tools**
- Cloudinary (Image Hosting)
- Multer (File Uploads)
- Passport.js (Authentication)
- Joi (Server-side Validation)
- connect-flash (Flash Messages)
- Method-Override (Support PUT & DELETE in forms)

---

## 🚀 Features

✅ User Authentication (Register/Login/Logout)  
✅ Secure Listing Creation (Only logged-in users can post)  
✅ Image Upload Support via Cloudinary  
✅ Edit/Delete your listings  
✅ Review System with full CRUD functionality  
✅ Flash Notifications (e.g., success/error messages)  
✅ Responsive UI using Bootstrap  
✅ Server-side validation with Joi  


---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust

2. Install dependencies
npm install


3.Set up environment variables
Create a .env file in the root with the following:
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
DB_URL=mongodb://localhost:27017/wanderlust
SECRET=your_secret_key


npm start
http://localhost:3000


wanderlust/
│
├── models/
├── routes/
├── controllers/
├── public/
├── views/
│   ├── listings/
│   └── partials/
├── utils/
├── schemas.js
├── app.js
├── package.json
└── README.md


📃 License
This project is licensed under the MIT License.
---

Let me know if you want this as a downloadable `.md` file or want to customize any sections like screenshots, demo links, or author.

# 🏨 Hotel & Apartment Management System  

> A **full-featured booking & management platform** built with **Spring Boot & React.js** 🏢🛏️  

*(Built with ❤️ by Darsh MosTaFa)*  

🔗 **Demo Video:** [Watch on LinkedIn](#)  

---

## ✨ Features Overview  

### 🔐 Authentication & Users  
- 👤 User registration & login (**JWT + Spring Security**)  
- ✏️ Update profile (name, email, phone, city, profile image)  
- ❌ Delete account  
- 📑 Get all users with pagination (**Admin only**)  
- 🛡️ Role-based access control (**ADMIN / USER / HOTEL_OWNER**)  

---

### 🏨 Hotels & Apartments  
- ➕ Create / Update / Delete hotels (**Admin / Hotel Owner**)  
- ➕ Create / Update / Delete apartments (**Admin / Hotel Owner**)  
- 🔎 Search & filter hotels/apartments by location, price, rating  
- 🖼️ Upload images for hotels/apartments  
- 📄 Fetch single / all hotels & apartments with pagination  

---

### 🛏️ Rooms & Bookings  
- ➕ Add / Update / Delete rooms (**Hotel Owner**)  
- 📝 Create bookings (**Authenticated users**)  
- 📦 Track booking status (**User / Admin / Hotel Owner**)  
- 🧾 View all bookings for **current user**  
- 📊 Admin view: fetch all bookings and update status  
- ❌ Cancel bookings  

---

### 💳 Payments  
- 💳 Stripe integration for payments  
- 🧾 Track payment status  
- 🟢 Automatic email confirmation for bookings  

---

### 🎨 Frontend Tech (React.js)  
- ⚡ React + Redux Toolkit → global state management  
- 🌐 Axios → API calls to Spring Boot backend  
- 🎭 SCSS (Sass) → responsive, themable styling  
- 💳 Stripe checkout → payment integration  
- 🟢 React Hot Toast → alerts for success/error  
- 🖌️ Lucide Icons → modern icons  
- 🖥️ MUI DataGrid → admin panel tables  

---

## 🛠️ Tech Stack  

**Backend (Spring Boot)**  
- Spring Boot + Spring Security + JWT authentication  
- Spring Data JPA + Hibernate ORM + MySQL/PostgreSQL  
- Lombok → boilerplate code reduction  
- Validation → Hibernate Validator  
- Spring Mail → email notifications  

**Frontend (React.js)**  
- React + Redux Toolkit + Redux Persist  
- Axios → HTTP requests  
- SCSS (Sass) → styling & theming  
- React Hot Toast → notifications  
- Stripe → payment processing  
- MUI → admin panel components  

---

## 🚀 Getting Started  

### Backend (Spring Boot)  
```bash
# Clone repo
git clone https://github.com/your-username/hotel-management-backend.git
cd hotel-management-backend

# Build project
./mvnw clean install

# Configure application.properties (.env equivalent)
# Set DB connection, JWT secret, Stripe keys, etc.

# Run backend
./mvnw spring-boot:run

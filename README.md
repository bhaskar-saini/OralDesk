# OralDesk -  Dental Center Management

A fully responsive **Dental Clinic Management** system built with **React**, **Tailwind CSS**, and `localStorage`. Designed for both **Admin** and **Patient** roles with dashboards, appointment calendar, and full CRUD functionality.

### 🚀 Live Demo

https://oraldesk.vercel.app/

---

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/oraldesk.git
cd oraldesk

# 2. Install dependencies
npm install

# 3. Run the app locally
npm run dev
```

## Project Structure

- Assets - Icons and Images
- Components/Admin - Holds all admin reusable components
- Pages - Handle Login and Dashboards
- context - Handles simulated authentication and user roles
- App - Main App component
- index.css - Tailwind CSS + global styles

## Common Issues
- Form default behaviour of submit - handle use e.preventDefault ()
- Importing fonts after the tailwind utilities gives an error
- Appointments not showing for patient - Ensure user.id === appointment.pid as string comparison
- Files not downloading correctly - Convert file to base64 on upload and reconstruct via data: URL
- Sidebar breaking layout on small screens - Sidebar set to hidden sm:flex and toggled only on sm and above
- Empty data on refresh - Ensure localStorage is populated and check JSON parsing logic

  ## Login Details
  ### Admin
  ```
  {
  username - admin@entnt.in
  password - admin123
  }
  ```
  ### Patient
  ```
    {
  username - john@entnt.in
  password - patient123
  }
  ```

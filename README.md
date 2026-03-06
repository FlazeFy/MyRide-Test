# 🚗 MYRIDE

> **MyRide** is your all-in-one **vehicle management solution—designed** to help you effortlessly **store vehicle** details, **track journeys**, **monitor fuel** usage, schedule **washes and services**, and manage multiple **drivers**. Smart reminders ensure you never miss a routine check-up, keeping your car or fleet in top condition. You can access MyRide from anywhere: through our **Mobile App** (Android & iOS), via **Telegram Bot** for quick access right from your chats, or directly from your Web Browser. Stay in control, wherever the road takes you.

## 📋 Basic Information

If you want to see the project detail documentation, you can read my software documentation document. 

1. **Pitch Deck**
https://docs.google.com/presentation/d/12D1PBlqCsYw7Cdynasb9Q8dLB8aKsf9jBN7YmmG_bGE/edit?usp=sharing

2. **Diagrams**
https://drive.google.com/file/d/1vnLsQrQzgCNq_nUeyhhc7uIvDax9SfL1/view?usp=drive_link 

3. **Software Requirement Specification**
https://docs.google.com/document/d/1zy1D59uCgKadgyZg_Ek3k0ITsyaNkQV10YE2VN5jur8/edit?usp=sharing   

4. **User Manual**
https://docs.google.com/presentation/d/1nEcFIxMomTQFx8Y6Xq68eiAc_L3PMdfMJqwgi_1bxks/edit?usp=sharing 

5. **Test Cases**
https://docs.google.com/spreadsheets/d/1waMk940fnZddBjjoQZJ8tIeI1wHz94vkwucoLIoGko8/edit?usp=drive_link 

### 🌐 Deployment URL

- Web : https://myride.leonardhors.com 
- Backend (Swagger Docs) : https://myride.leonardhors.com/api/documentation#/

### 📱 Demo video on the actual device

[URL]

---

## 🎯 Product Overview
- **Manage Vehicle**
You can add your vehicle details such as brand, type, category, and other specifications. Based on this data, you can track fuel consumption, set service or washing schedules, and much more.

- **Assign Driver**
Easily assign drivers to specific vehicles and monitor their usage, making it ideal for families, teams, or fleet operations.

- **Fuel Monitoring**
Track fuel volume, brand, type, and cost to analyze consumption patterns and optimize efficiency.

- **Record Your Trip History**
Log your travel routes, visited places, and trip durations to keep a complete journey history.

- **Dashboard & Analytics**
Get a visual overview of your vehicle usage, fuel stats, service & wash schedules, and travel history all in one place.

- **Services Schedule**
Set up and manage routine service appointments like oil changes, tire rotations, and inspections with timely reminders.

- **Set Reminder**
Create custom reminders for anything vehicle-related things. Such as insurance renewals, document updates, travel plan, or personal notes.

- **Wash Schedule**
Plan and track your vehicle washing routines to keep it fresh and well-maintained.

## 🚀 Target Users

1. **Vehicle Owners**
Individuals who want to keep track of their personal vehicle’s details, fuel usage, service schedules, and trip history all in one place.

2. **Car Rentals**
Companies that manage multiple vehicles and drivers, needing tools to assign vehicles, monitor usage, schedule maintenance, and track fuel consumption efficiently.

3. **Delivery Companies**
Businesses that rely on vehicles for daily operations and benefit from features like driver assignment, route tracking, fuel monitoring, and service reminders.

4. **Taxi Companies**
Operators managing fleets of taxis and drivers who need to monitor vehicle health, usage patterns, and ensure timely maintenance.

5. **Travel Agents**
Agencies that use vehicles for client transportation and tours, requiring tools to manage trip history, vehicle assignments, and service schedules.

6. **Drivers**
Professional or personal drivers who want to log their trips, monitor fuel usage, receive reminders, and stay informed about vehicle status.

## 🧠 Problem to Solve

1. People often **forget vehicle details**, such as service history, fuel usage, or driver assignments, leading to **missed maintenance** and **inefficient tracking**.
2. It's difficult to **monitor fuel consumption and costs** over time, which can result in unnecessary expenses and **poor planning**.
3. Without a centralized system, users rely on **manual notes** or memory to manage vehicles, drivers, and trips—causing **disorganization** and errors.
4. Scheduling **routine services or washings** is often neglected, which affects vehicle performance and longevity.
5. Users lack tools to **analyze vehicle usage**, **track trip history**, or **generate reports**, making it hard to gain insights or optimize operations.

## 💡 Solution

1. Provide a way to **store and manage detailed vehicle** data, including brand, type, category, and specifications, enabling smarter tracking and planning.
2. Allow users to **monitor fuel consumption**, including volume, brand, type, and cost, to help optimize fuel efficiency and budgeting.
3. Offer a **cross-platform solution (Web, Mobile App, Telegram Bot)** that lets users sync and manage vehicle data seamlessly.
4. Enable users to **schedule services and washings**, with smart reminders to ensure timely maintenance and upkeep.
5. Include tools to **record trip history**, **assign drivers**, and analyze vehicle usage through **dashboards and reports** for better decision-making.

## 🔗 Features

- 🚗 Vehicle Data Management
- ⏰ Reminder & History
- 📅 Sync with Google Calendar
- 🌍 Location Tracking
- 🤖 Telegram Bot Chat Integration
- 📄 Data Export
- 📊 Analytics & Summaries

---

## 🛠️ Tech Stack

### Web

- Laravel 10 (PHP) for Backend
- Laravel 10 (HTML, CSS, JS, Jquery, Bootstrap 5) for Frontend
- PHP - Telegram Bot

### Database

- MySQL

### Others Data Storage

- Firebase Storage (Cloud Storage for Asset File)

### Infrastructure & Deployment

- Cpanel (Deployment)
- Github (Code Repository)
- Firebase (External Services)

### Other Tools & APIs

- Postman
- Swagger Docs

---

## 🏗️ Architecture
### Structure

### 📁 Project Structure

### 📁 Project Structure

| Directory/File | Purpose |
|----------------|--------|
| `audit/` | Stores audit logs or exported test results for tracking test executions. |
| `cypress/` | Main directory containing Cypress automation tests and configurations. |
| `cypress/downloads/` | Stores files downloaded during Cypress test execution. |
| `cypress/e2e/` | Contains all end-to-end and integration test scenarios. |
| `cypress/e2e/api/integration/` | API integration tests using Cypress `cy.request()` for backend validation. |
| `cypress/e2e/gherkin/` | UI automation (E2E) tests written using Gherkin syntax (Cucumber BDD style). |
| `cypress/support/` | Shared utilities and custom Cypress commands used across tests. |
| `cypress/support/command.js` | Custom Cypress commands to simplify repeated test actions. |
| `cypress/support/e2e.js` | Global Cypress configuration and hooks executed before test runs. |
| `cypress/support/template.js` | Helper validation templates used in API response validation. |
| `k6/scripts/` | Performance testing scripts using k6 for load and stress testing APIs. |
| `node_modules/` | Project dependencies installed via npm. |
| `.env` | Environment variables used for credentials and base URLs during testing. |
| `.env.example` | Example environment variables template for setting up the project. |
| `.gitignore` | Specifies files and directories that should not be tracked by Git. |
| `cypress.config.js` | Cypress configuration file defining base URL, plugins, and test settings. |
| `package.json` | Node.js project configuration including dependencies and scripts. |
| `package-lock.json` | Lock file ensuring consistent dependency versions across environments. |
| `README.md` | Project documentation including setup instructions and usage guidelines. |                                  |                                             |

---

### 🧾 Environment Variables

To set up the environment variables, just create the `.env` file in the root level directory.

| Variable Name        | Description                                                     | Example                    |
|----------------------|-----------------------------------------------------------------|----------------------------|
| `BASE_URL`           | Base URL of the API that will be tested.                        | `http://localhost:3000`    |
| `K6_LOGIN_USERNAME`  | Username used for the login performance test.                   | `jhondoe`                  |
| `K6_LOGIN_PASSWORD`  | Password used for the login performance test.                   | `tester123`                |
---

## 🗓️ Testing Process

### Technical Challenges

- **Daily Limitation** for data transaction in Firebase Storage
- Feature that return the **output in Telegram Chat or Exported File** must be **tested manually** 

---

## 🚀 Setup & Installation

### Prerequisites

#### 🔧 General
- Git installed
- A GitHub account
- Basic knowledge of JS, Software Testing, Firebase Service, and the App Business Process
- Code Editor
- Telegram Account
- Postman
- Google Console Account

#### 🧠 Automation Test
- JavaScript
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- Cypress (installed via project dependencies)
- k6 (for performance testing)
- Git (for cloning the repository)

### Installation Steps

**Local Init**
1. Download this Codebase as ZIP or Clone to your Git
2. Set Up Environment Variables `.env` at the root level directory. You can see all the variable names to prepare in `.env.example`
3. Install Dependencies using `npm install`

---

## 📝 Notes & Limitations

### ⚠️ Precautions When Running the Tests
- Ensure the **target API / application server is running** and accessible via the configured `BASE_URL` before executing any test.
- Do not expose **testing credentials or environment variables** (e.g., login username/password, tokens, API keys) in public repositories. Always store them in `.env`.
- Avoid running tests against **production environments**, especially for **k6 performance tests**, as they can generate high traffic and affect real users.
- Ensure the **test account data** used for authentication exists and is valid before running the tests.
- Avoid running **multiple heavy performance tests simultaneously**, as they may overload the target environment and produce inaccurate results.
- Ensure the **database or test environment is in a consistent state** before running integration or E2E tests to prevent flaky results.

### 🧱 Technical Limitations
- Telegram bot polling may cause delays or downtime if the server experiences high load. 
- Google Map's interface shows an alert popup and logs errors in the console due to the free plan limitations.

### 🐞 Known Issues
- Limitation when using Firebase Storage for free plan Firebase Service, upgrade to Blaze Plan to use more.
- There are limitations when using the Google Maps API with the free plan. Upgrade your plan in the Google Cloud Console to access additional features.

---

## 🧪 How To Run The Test
### API Integration Test and UI (E2E) Testing
Tools : Cypress JS
- To execute tests via UI
`npx cypress open` 
- To execute all tests in CLI mode
`npx cypress run` 

### Performance Test
Tools : K6 Grafana
- Run this command first to export the env
`export $(cat .env | xargs)`
- Execute the k6 script
`k6 run scripts/post_login.js`

_Made with ❤️ by Leonardho R. Sitanggang_
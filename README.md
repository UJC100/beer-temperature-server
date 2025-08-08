# 🍺 Beer Temperature Monitoring API

A NestJS backend service for monitoring beer container temperatures during regional deliveries for a craft brewery.

## 🚀 Features

- Add new beers with name, temperature range, and image
- View all beers, current simulated temperature, and in-range status
- Automatically simulate and store random temperature readings (0–7°C)
- Persist historical temperature readings per beer
- Built with modular architecture, clean code practices, and scalability in mind

---


## Design Decisions & Highlights
Separated logic into modules (BeerModule, TemperatureModule) for maintainability

Used Mongoose schemas with embedded subdocuments (like TempRange)

Designed services to be easily unit-testable

Created DTOs for input validation and structure

Polling simulation is run manually (could be automated via cron or interval)



## Questions & Assumptions
Q: Should temperature history be retrievable?

Q: What’s the polling strategy?

Q: Are multiple beer containers of the same type supported?


## Improvements (If I Had More Time)
Add automated polling with scheduling (e.g. with @nestjs/schedule)

Added jwtGuards to protect sensitive routes

Add temperature history retrieval endpoints

Add validation and transformation via class-validator

Add Swagger/OpenAPI docs

Add Docker support

Add authentication layer if needed

Add redis for Caching





## 🏗️ Tech Stack

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) via Mongoose
- [Jest](https://jestjs.io/) for testing

---

## 🔧 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourname/beer-temp-api.git
cd beer-temp-api
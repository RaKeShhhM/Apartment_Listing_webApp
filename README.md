# StayComfy

**StayComfy** is a full-stack apartment and short-stay rental listing platform. It gives visitors a simple way to discover places to stay, while registered users can publish their own apartment listings, upload property photos, and share trusted feedback through ratings and reviews.

> This project focuses on discovering, publishing, and reviewing stays. Booking, payments, availability calendars, and host messaging are not currently included.

## Demo

[Watch the application walkthrough on YouTube](https://youtu.be/aIO_Bz2INzc)

## What you can do

- Browse apartment and stay listings in a responsive card layout.
- Search listings by title, description, location, or country.
- See an individual listing's photo, host, description, nightly price, location, country, and reviews.
- Toggle the display of the 18% GST estimate on listing cards.
- Create an account, sign in, and sign out securely.
- Publish a listing with a photo uploaded to Cloudinary.
- Edit or remove only the listings you own.
- Leave a 1–5 star review with a comment when signed in.
- Remove only the reviews you authored.
- Receive clear success and error messages after important actions.

## Application flow

```text
Visitor
  │
  ├── Explore listings ──> Search / filter by keyword ──> Open listing details
  │                                                       │
  │                                                       └── View host details and community reviews
  │
  └── Sign up or log in
        │
        ├── Add listing ──> Upload image to Cloudinary ──> Listing appears in Explore
        │                         │
        │                         └── Owner can later edit or delete the listing
        │
        └── Open a listing ──> Submit rating + comment ──> Review appears on that listing
                                      │
                                      └── Author can delete their own review
```

### Access and ownership rules

| Action | Who can do it? |
| --- | --- |
| Browse, search, and view listings | Anyone |
| Create a listing | Signed-in users |
| Edit or delete a listing | The listing owner only |
| Add a review | Signed-in users |
| Delete a review | The review author only |

When a user tries to access a protected action, StayComfy sends them to the sign-in page and keeps the original destination so they can return after authentication.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Server | Node.js, Express.js |
| Views | EJS, EJS-Mate, Bootstrap 5, vanilla JavaScript |
| Database | MongoDB, Mongoose |
| Authentication | Passport.js, Passport Local, Passport Local Mongoose |
| Uploads | Multer, Cloudinary |
| Validation and UX | Joi, connect-flash, express-session, connect-mongo, method-override |

## Architecture

The project follows an MVC-style structure:

```text
StayComfy/
├── app.js                 # Express setup, database/session/auth configuration
├── controllers/           # Listing, review, and user request handlers
├── models/                # Mongoose models: Listing, Review, User
├── routes/                # Express routes for listings, reviews, and authentication
├── middleware.js          # Authentication, ownership, and Joi validation guards
├── schema.js              # Listing and review validation schemas
├── cloudConfig.js         # Cloudinary and Multer storage configuration
├── views/                 # EJS layouts, shared UI, and page templates
├── public/                # CSS, client-side JavaScript, and static assets
└── init/                  # Optional sample listing data
```

### Request lifecycle

1. A route receives a request for a listing, account action, or review.
2. Middleware checks authentication, ownership, and submitted data where needed.
3. The controller reads or updates MongoDB through Mongoose models.
4. Listing images are stored in Cloudinary and their URL/filename are saved with the listing.
5. The app renders an EJS view or redirects with a flash message.

## Getting started

### Prerequisites

- Node.js 22 or later
- A MongoDB database (local MongoDB or MongoDB Atlas)
- A Cloudinary account for property-image uploads

### 1. Clone and install

```bash
git clone https://github.com/RaKeShhhM/StayComfy.git
cd StayComfy
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root. Never commit it.

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ATLUSDB_URL=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
SECRET=replace_with_a_long_random_session_secret
```

`ATLUSDB_URL` is the database variable currently read by `app.js`. For a local database, use a value such as:

```env
ATLUSDB_URL=mongodb://127.0.0.1:27017/staycomfy
```

### 3. Run the app

```bash
node app.js
```

Open [http://localhost:8080/listings](http://localhost:8080/listings) in your browser.

## Routes at a glance

| Method | Route | Purpose | Access |
| --- | --- | --- | --- |
| GET | `/listings` | Browse all listings | Public |
| GET | `/listings/search?query=...` | Search listings | Public |
| GET | `/listings/new` | Show the listing form | Signed in |
| POST | `/listings` | Create a listing | Signed in |
| GET | `/listings/:id` | View one listing and its reviews | Public |
| GET | `/listings/:id/edit` | Show the edit form | Owner |
| PUT | `/listings/:id` | Update a listing | Owner |
| DELETE | `/listings/:id` | Delete a listing and its reviews | Owner |
| POST | `/listings/:id/reviews` | Add a review | Signed in |
| DELETE | `/listings/:id/reviews/:reviewsId` | Delete a review | Review author |
| GET / POST | `/signup` | Register an account | Public |
| GET / POST | `/login` | Sign in | Public |
| GET | `/logout` | Sign out | Signed in |

## Data model

```text
User
  ├── username
  ├── email
  └── authentication fields managed by Passport Local Mongoose

Listing
  ├── title, description, price
  ├── location, country
  ├── image { url, filename }
  ├── owner ───────────────> User
  └── reviews[] ───────────> Review

Review
  ├── rating (1–5)
  ├── comment
  ├── createdAt
  └── author ──────────────> User
```

Deleting a listing also removes its associated reviews through a Mongoose deletion hook.

## Security and validation

- Password handling and sessions are managed through Passport Local Mongoose and `express-session`.
- Sessions are persisted in MongoDB with `connect-mongo`.
- Protected routes require an authenticated session.
- Listing and review mutations check resource ownership before allowing edits or deletes.
- Joi validates required listing details, non-negative price, review comments, and ratings from 1 to 5.
- Multer accepts image uploads and Cloudinary hosts the uploaded assets.

## Future enhancements

- Booking dates, availability, and reservation management
- Payments and cancellation workflows
- Map-based discovery and location geocoding
- Saved favourites and user profiles
- Review editing, sorting, and aggregate rating summaries
- Automated tests and deployment configuration

## License

This project is available under the [ISC License](https://opensource.org/license/isc-license-txt/), as declared in `package.json`.

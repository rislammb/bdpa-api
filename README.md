# Bangladesh Diploma Pharmacist Association

## For open live

[Click](https://bdpa.netlify.app)

## Requirements

## Functional Requirements

### Admin

- For Pharmacist collection
  - Admin can create a Pharmacist
  - Admin can delete, update and check Pharmacist profile
- For User collection
  - Admin can change status of a user
  - Admin can add roles of a user to admin
  - Admin can set user adminDetails information

### User

- User can register themselves if Pharmacist exist with provided email
- There will be following account status for a user
  - Pending
  - Active
  - Suspend
  - Rejected
- User can login with their credentials
- Active user can update their own Pharmacist profile without email and registration number
- Pending, Suspend and Rejected user can not update their Pharmacist profile
- Active user can update/change own password
- User can logout

## Requirements Analysis

Pharmacist model-

- name
- bn_name
- email
- mobile
- dateOfBirth
- gender
- passingYear
- regNumber
- dateOfJoin
- jobDepertment
- postingDivision
- postingDistrict
- postingUpazila
- postingPlace
- voterDivision
- voterDistrict
- onDeputation
- deputationDivision
- deputationDistrict
- deputationUpazila
- deputationPlace

User model-

- email
- password
- regNumber
- pharmacistId
- accountStatus
- roles
- adminDetails

## Endpoints/Routes

Pharmacist routes

- POST /pharmacist [public]
- GET /pharmacist [public]
- GET /pharmacist/:regNumber [public]
- PUT /pharmacist/:regNumber [private]
- PATCH /pharmacist/:regNumber [private]
- DELETE /pharmacist/:regNumber [private]

Auth routes

- POST /auth/register [public]
- POST /auth/login [public]
- GET /auth/logout [private]

User routes

- POST /user [private]
- GET /user [private]
- GET /user/:userId [private]
- PUT /user/:userId [private]
- PATCH /user/:userId [private]
- DELETE /user/:userId [private]

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
- user
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
- accountStatus
- roles
- adminDetails

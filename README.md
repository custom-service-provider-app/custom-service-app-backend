** SELLER **
email : jyotirmoydas12@gmail.com
password : 123456

** CUSTOMER **
email : 
password : 

** ADMIN **
email : jdxcodedev@gmail.com
password : 123456

##########################################################################

# Create admin
curl -X POST https://custom-service-app-backend.onrender.com/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@gmail.com",
    "password": "admin123"
  }'
{"message":"Admin registered","user":{"id":"70278e93-b123-42cb-aace-2cb698962e5c","name":"Admin User","email":"admin@gmail.com","password":"$2b$10$xAZkXGwZcXrupn1vvFnE7e1iDfoGP2YCq4Und1goZUPYESS8ikKTm","role":"ADMIN","createdAt":"2026-05-21T09:18:54.528Z"}}

# Login as admin
curl -X POST http://localhost:5000/api/admin/login \
-H "Content-Type: application/json" \
-d '{
  "email": "jdxcodedev@gmail.com",
  "password": "123456"
}'

Response example : 
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTM1MmZkMC01YjA5LTQ1MTItYmJhMS1hMDNhYWVlMWFmZGUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjM0NjYzMzgsImV4cCI6MTc2MzU1MjczOH0.hE00qMHcT5VWi6H3Ya_Qb1MYrDWFvi1YTHpPtxuvxts","user":{"id":"9e352fd0-5b09-4512-bba1-a03aaee1afde","name":"Jd Admin","email":"jdxcodedev@gmail.com","password":"$2b$10$0Jg7CLlbqRs1fZ4DlHjWKuMCz6T8poHUdI2g9UZALHcCibMTxOkpG","role":"ADMIN","createdAt":"2025-03-11T09:00:33.089Z"}}

# To create a new category
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "To-let"}'

Response example : 
{"message":"Category created","category":{"id":"a9f36cd9-f221-4f23-ab78-0f82c2dd3e75","name":"To-let","createdAt":"2025-10-11T07:36:28.308Z"}}

# To create a new sub-category for a category
curl -X POST http://localhost:5000/api/subcategories \
  -H "Content-Type: application/json" \
  -d '{"name": "PG", "categoryId": "a9f36cd9-f221-4f23-ab78-0f82c2dd3e75"}'

Response Example :  
{"message":"Subcategory created","subcategory":{"id":"aeba9115-2ff3-4591-ae66-9209041899fb","name":"PG","categoryId":"a9f36cd9-f221-4f23-ab78-0f82c2dd3e75","createdAt":"2025-10-11T07:38:03.572Z"}}








================================================================

New requirements - 
- searchbox from home screen to be removed.
- search glass to be added in footer menu.
- select location - pin codes to be removed.
- icons on homescreen to be bigger like the listing creation screen.

NEW ISSUES IN APK - 
- when we are adding a new listing we are NOT ABLE to type and search for the exact location.
- listings are returned based on only sub-categories, it is not taking the location into account.
- other small adjustments in font color getting unseen due to bgColor being white.



# After you deploy do this -

# Create admin
curl -X POST https://custom-service-app-backend.onrender.com/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@gmail.com",
    "password": "admin123"
  }'

Expected Response -
{"message":"Admin registered","user":{"id":"70278e93-b123-42cb-aace-2cb698962e5c","name":"Admin User","email":"admin@gmail.com","password":"$2b$10$xAZkXGwZcXrupn1vvFnE7e1iDfoGP2YCq4Und1goZUPYESS8ikKTm","role":"ADMIN","createdAt":"2026-05-21T09:18:54.528Z"}}

# Login as admin
curl -X POST https://custom-service-app-backend.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmail.com",
    "password": "admin123"
  }'

Expected Response -
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MDI3OGU5My1iMTIzLTQyY2ItYWFjZS0yY2I2OTg5NjJlNWMiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NzkzNTUyNzcsImV4cCI6MTc3OTQ0MTY3N30.QK9F7kNd7NNDaimxyFKIzqnZC5dkN5EsJm72lHI2lVE","user":{"id":"70278e93-b123-42cb-aace-2cb698962e5c","name":"Admin User","email":"admin@gmail.com","password":"$2b$10$xAZkXGwZcXrupn1vvFnE7e1iDfoGP2YCq4Und1goZUPYESS8ikKTm","role":"ADMIN","createdAt":"2026-05-21T09:18:54.528Z"}}

# Create a category
curl -X POST https://custom-service-app-backend.onrender.com/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "To-let"
  }'

Expected Response -
{"message":"Category created","category":{"id":"0b49ac06-f3bb-49e9-90ca-7cb9d634784f","name":"To-let","createdAt":"2026-05-21T09:24:23.751Z"}}

# Create sub-category (here shown only one, likewise create other subcategories as required)
curl -X POST https://custom-service-app-backend.onrender.com/api/subcategories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PG",
    "categoryId": "0b49ac06-f3bb-49e9-90ca-7cb9d634784f"
  }'

Expected Response -
{"message":"Subcategory created","subcategory":{"id":"93a28d3e-3a34-44de-820f-a2ac6c8ff8c5","name":"PG","categoryId":"0b49ac06-f3bb-49e9-90ca-7cb9d634784f","createdAt":"2026-05-21T09:27:44.061Z"}}

# Add a driver (You need to login as Admin and paste the token here)
curl -X POST https://custom-service-app-backend.onrender.com/api/drivers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <PASTE_ADMIN_TOKEN_HERE>" \
  -d '{                   
    "name": "Rahul Sharma",
    "phone": "9876543210",
    "licenseNo": "DL-0420110149646",
    "vehicleNo": "AS01AB1234",
    "isAvailable": true,
    "drivingAreas": ["Guwahati", "Tezpur", "Shillong"],
    "drivingExperience": 5,
    "driverPhoto": "https://www.shutterstock.com/image-photo/head-shot-portrait-millennial-30s-260nw-2555494759.jpg",                        
    "dateOfBirth": "1995-06-15",                                                                   
    "drivingLicenceDocument": "https://ibgnews.com/wp-content/uploads/2018/10/Driving-License.jpg",
    "aadhaarCardDocument": "https://upload.wikimedia.org/wikipedia/commons/3/3f/A_sample_of_Aadhaar_card.jpg"
    
  }'

  Expected Response -
  {"message":"Driver added successfully","driver":{"id":"6328a923-1a30-4305-b8f1-e05424c80713","name":"Rahul Sharma","phone":"9876543210","licenseNo":"DL-0420110149646","vehicleNo":"AS01AB1234","isAvailable":true,"drivingAreas":["Guwahati","Tezpur","Shillong"],"drivingExperience":5,"driverPhoto":"https://www.shutterstock.com/image-photo/head-shot-portrait-millennial-30s-260nw-2555494759.jpg","dateOfBirth":"1995-06-15T00:00:00.000Z","drivingLicenceDocument":"https://ibgnews.com/wp-content/uploads/2018/10/Driving-License.jpg","aadhaarCardDocument":"https://upload.wikimedia.org/wikipedia/commons/3/3f/A_sample_of_Aadhaar_card.jpg","createdAt":"2026-05-21T09:58:43.244Z"}}

  

** SELLER Registration (You can do this from the app itself) **
name : Amit Baruah
email : amit@gmail.com
password : Amit@12345

** SELLER Login (You can do this from the app itself) **
email : amit@gmail.com
password : Amit@12345

** Next you can start posting an ad/listing as seller **

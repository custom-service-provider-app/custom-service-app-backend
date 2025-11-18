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

# To login as admin
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

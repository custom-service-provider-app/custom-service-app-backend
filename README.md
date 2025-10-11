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
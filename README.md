<h1 align="center">Welcome to readme Square etail project 👋</h1>
<p align="center">
  <img src="https://img.shields.io/npm/v/readme-md-generator.svg?orange=blue" />
  <a href="https://www.npmjs.com/package/readme-md-generator">
    <img alt="downloads" src="https://img.shields.io/npm/dm/readme-md-generator.svg?color=blue" target="_blank" />
  </a> 
  <a href="https://codecov.io/gh/kefranabg/readme-md-generator">
    <img src="https://codecov.io/gh/kefranabg/readme-md-generator/branch/master/graph/badge.svg" />
  </a> 
</p>
This is a shop for fashion using search image project build base on 
    + Backend: Microservices architecture: Django, NestJS
    + Frontend: ReactJS
    + Database: SQLite and MongoDB
    + Image Recognition: VGG16 model
 

## 🍀 User interface 
- Role user
<img src="https://github.com/user-attachments/assets/1175a832-edc3-4977-a577-28934664ef78" width="500" height="300">
<img src="https://github.com/user-attachments/assets/fd6fb745-1880-4564-ae76-93aed39a2b7d" width="500" height="300">

<img src="https://github.com/user-attachments/assets/ce980172-e236-4be7-8f91-f7c88d62809f" width="500" height="300">
<img src="https://github.com/user-attachments/assets/78450453-1871-432a-a3ed-2cec6b280c3f" width="500" height="300"> 

<img src="https://github.com/user-attachments/assets/32f0bace-9f67-4ee5-96c3-7a918b7b90aa" width="500" height="300"> 
<img src="https://github.com/user-attachments/assets/a6dce0ac-57fd-4cd1-a026-76b6f2bdfe3c" width="500" height="300">

- Role seller
<img src="https://github.com/user-attachments/assets/70ef06de-afc8-400f-9eea-57690c359a45" width="500" height="300"> 
<img src="https://github.com/user-attachments/assets/37716303-bdfd-4075-a74d-85ff95cf39b1" width="500" height="300">

## 🚀 To Getting Started

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since npm `10.2.2`)
Just run the following command at the root of your project:

First, run the development client:

```bash 
#Navigation to Client folder 
1. cd client 
# Install package-lock.json and library
2. npm i 
# Run client host
3. npm run dev
   # or
   yarn dev
   # or
   pnpm dev
``` 

Second, run the development server user:

```bash
# Navigation to api folder 
1. cd api  
# Install package-lock.json and library 
2. npm i
# Connect to database MongoDB. Navigate to app.module.ts
3.Add url database in this line MongooseModule.forRoot('YOUR_URL_DATABASE')
# Run server host
4. npm run dev --watch
   # or
   yarn dev
   # or if already install nest: npm install -g @nestjs/cli
   nest start --watch
```

The final, run the development server seller:

```bash
# Navigation to Server folder 
1. cd api  
# Install package-lock.json and library 
2. npm i
# Run server host
3. npm run dev --watch
   # or
   yarn dev
   # or if already install nest: npm install -g @nestjs/cli
   nest start --watch
```

Open [http://localhost:3000](http://localhost:5107) with your browser to see the result client.
Open [http://localhost:3333](http://localhost:3333) with your browser to see the result server user.
Open [http://localhost:3333](http://localhost:8000) with your browser to see the result server seller.

## ⭐️ Run test

Run test on Server side with Jest.js has build with Nest.js Project:

```bash
    npm run test:watch
``` 

## Author
👤 **--Jihto--**

- Linked In: [@Huy Phúc](https://www.linkedin.com/in/phuc-nguyen-9ba849266/)
- Github: [@Jihto](https://github.com/jihto)
 ---
 


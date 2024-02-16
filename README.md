# E-Commerce-Backend [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Handle the back end for an e-commerce site

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#Contributing)
- [Questions](#Questions)

## Installation

To install this project, you need Node.js to run it in the command line, and either GitBash or a ZIP extracter to download it. You need Node Package Manager to install the dependencies and run various scripts. You also need mysql set up on your computer. Once the server is running, you need Thunder Client or another REST API to make calls to it.

## Usage

To run this project, download it, either by cloning the repository or by downloading a ZIP of it and extracting it. Then use the command line to navigate to the folder it is in. First, type 'npm i' to install the dependencies, which might take a moment. Rename the .env.EXAMPLE file to just .env, and add your mysql username and password in it by opening it in any text editing software. Type 'npm run schema' to create the database. Note that if a database with the same name already exists, this will delete it and create a new one. Type 'npm run seed' to create the initial seed data. This also removes any existing data from the database. Once everything is set up, type 'npm start' to run the server.

Open Thunder Client or any other REST API.

All routes start with '`http://localhost:3001/api`', so fill this in for the '...' in the routes below.   
\*endpoint\* can be products, tags, or categories, to go to that specific endpoint.  
\*id\* is a number starting at 1, and is for dealing with a specific product, tag, or category.

GET  .../\*endpoint\*  
Returns all products, tags, or categories, including the information from connected tables.

GET .../\*endpoint\*/\*id\*  
Returns the specific product, tag, or category with the specified id.

DELETE .../\*endpoint\*/\*id\*  
Deletes the specific product, tag, or category with the specified id, removing all of it's information but not deleting any other products, tags, and/or categories associated with it.

POST/PUT .../\*endpoint\* for POST or .../\*endpoint\*/\*id\* for PUT  
Creates or updates a product, tag, or category. These routes require JSON content, which is specified for each endpoint below. The POST route needs all fields unless marked as optional, while PUT only needs the ones that are being updated.

products:  
"product_name": string  
"price": decimal  
"stock": integer  
"tagIds": array of integers (optional)  
"categoryId": integer (optional)

tags:  
"tag_name": string  
"productIds":  array of integers (optional)

categories:  
"category_name": string


[Demonstration Video](https://drive.google.com/file/d/1YnTW-MXa7RFLE3PXTVjINXEsmvk0YVmo/view)

## License

This project is covered under the MIT License.

[Link to License Page](/LICENSE)

## Contributing

Feel free to contribute to this project by cloning it and making a fork. You can contact me at the email address listed below if you wish to merge the fork into the main branch.

## Questions

If you have any questions, you can reach me at one of these place(s):  

GitHub: [CountDuckoo](github.com/CountDuckoo)

Email: [countsuperc@gmail.com](mailto:countsuperc@gmail.com)
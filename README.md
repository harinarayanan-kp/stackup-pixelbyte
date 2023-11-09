![StackUp Banner]([https://tinkerhub.frappe.cloud/files/stackup%20banner.jpeg])
# Trek-Step Into Style

[https://trek-stepintostyle.web.app/]
[https://trek-stepintostyle.firebaseapp.com/]

"Trek-StepIntoStyle" is an ambitious e-commerce website that has been meticulously crafted to deliver an exceptional online shopping experience. The project is built on a modern technology stack, blending the power of React and Firebase for a seamless and secure shopping journey. At its core, the website caters to shoe enthusiasts and fashion-forward individuals looking to step into style.

Key Features:

User Authentication: The website offers a robust authentication system using Firebase Authentication, enabling users to create accounts or log in securely. In addition to email/password authentication, we provide the convenience of signing in through Google and Facebook, ensuring accessibility to a wider audience.

Product Catalog: The heart of "Trek-StepIntoStyle" is its extensive product catalog. With a wide range of shoe styles, sizes, and brands, users can browse, compare, and select their favorite footwear items. Product details include high-resolution images, descriptions, prices, and user reviews.

Real-Time Updates: Firebase Firestore serves as our data storage solution, allowing real-time updates to product availability, prices, and stock levels. Users experience instantaneous changes in product information, ensuring they have the most up-to-date information at all times.

Intuitive User Interface: The user interface has been thoughtfully designed, providing a visually appealing and intuitive experience. We've incorporated user-friendly navigation, filtering, and search features, making it easy for customers to find the perfect pair of shoes.

Shopping Cart: A feature-rich shopping cart enables users to add products, manage quantities, and proceed to a seamless checkout process. Users can review their selected items, apply discounts, and make secure payments with confidence.

Responsive Design: "Trek-StepIntoStyle" boasts a responsive design that ensures compatibility with a wide range of devices, from desktops to mobile phones, enabling users to shop from anywhere.

## Team members
1. Harinarayanan K P [https://github.com/harinarayanan-kp]
2. Felix Geemon [https://github.com/geemonfelix]
3. Pranav K Nair [https://github.com/20Pranav04]
4. Syamkrishna K V [https://github.com/Syamkrishna2004]

## Team Id
pixelbyte
## Link to product walkthrough
[link to video]
## How it Works ?
  Trek-StepIntoStyle, our E-commerce shoe selling website is built using the React Firebase stack. React for the front-end, Firebase Authentication ensures safe and easy user registration and login. Meanwhile, Firebase Firestore stores product data, providing real-time updates and secure data handling. Users can explore our wide range of shoes, add items to their cart, and complete secure payments. With an intuitive user interface, efficient search and filtering options, and robust order management, our website ensures a seamless shopping journey. Security measures and performance optimizations guarantee a safe and responsive platform for all users
  
  Users can login/SignUp through navbar. Login/SignUp page contains authentication from firebase. Its setup using firebase/auth library. The men, women, kids, sports section on the navbar is built using variable link which sorts out the category from firebase data collection. User's unique User ID is used to prepare the respective users cart which links to a data section which stores the list of products added. On clicking a product item in the list, it redirect to the product details section which contains a add to cart button. On Clicking the add to cart button, the product append to users cart.The delete icon on the cart screen removes the product id form users cart.

for demonstration purpose the website is hosted in firebase.
link to the hosted website:  [https://trek-stepintostyle.web.app/]
  
3. Embed video of project demo
## Libraries used
Library Name - Version

"firebase": "^10.5.2",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.18.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"

## How to configure
Instructions for setting up project
> Ensure Node.JS is installed on system
> cmd line - "cd trek" to get into project folder
> cmd line - "npm install react" to initialise the project

## How to Run
Instructions for running
> fork this repository into a local folder on system
> Ensure Node.js installed.
> cmd line - "npm start" to start local host of development build
> cmd line - "serve -s build" to start production build(recommended to run through windows terminal)

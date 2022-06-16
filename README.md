# contact_form_backend
steps:
1. clone the repository
2. run "npm install"
3. go to mongodb atlas, create a project, cluster and select "connect with application" option to get username, password link of mongodb atlas. use it in place of process.env.MONGO_URI in config/keys.js. (also whitelist ur IP or allow all IP's for accesing mongodb atlas)
4. go to mailtrap account, signup, SMPT settings- > integrations -> nodejs (which will give username and password for mailtrap). use those username and password in routes/api/forms.js  --> nodemailer createTransport method (process.env.USER_NAME, process.env.PASSWORD)
5. run "npm start" ( for running the server)
6. Backend part is ready. Now go to config_form_frontend and follow remanining steps)
7.now open another terminal . run "cd client"
8. run "npm install" (to install the dependencies)
9. run "npm start"
10.run  "npm run test" (for runnning jest test case)

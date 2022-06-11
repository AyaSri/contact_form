const supertest = require('supertest');
const app = require('../../app');
//use the supertest object as our API
const api = supertest(app);
const Form = require('../../models/Form');

//run npm test -- -t "POST call"
test('POST call', async () => {
    //build a new form
    const newContactForm = {
        first_name: "First Name for testing with Jest",
        last_name: "Last Name for testing with Jest",
        email: "testing@jest.com",
        message: "Sending Message while testing with Jest",
    }
    //we send the form object to the DB through the API
    //we expect a successful result
    await api
        .post('/api/forms/')
        .send(newContactForm)
        .expect(200)
    //get all the forms in our DB
    const forms = await Form.find({})
    //let's check that the last form added was indeed newContactForm object
    //it should contain the message "Sending Message while testing with Jest"
    expect(forms[forms.length-1].message).toBe("Sending Message while testing with Jest")
})
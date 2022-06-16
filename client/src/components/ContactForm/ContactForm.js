import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import './ContactForm.css';

const baseURL = "http://localhost:8082/api/forms/";

const ContactForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);

    const onSubmit = async (data) => {
      const dataToBeSaved = { 
        first_name: data.firstName, 
        last_name: data.lastName, 
        email: data.email,
        message: data.message,
      }
      try {
      const response = await axios.post(baseURL, dataToBeSaved);
      setIsAlertVisible({ visible: true, msg: response.data.msg});
      setTimeout(() => {
        setIsAlertVisible({ visible: false});
      }, 3000);
      console.log('response', response);
      }
      catch(err) {
        setIsAlertVisible({ visible: true, msg: 'Error While Saving the Form'});
        setTimeout(() => {
          setIsAlertVisible({ visible: false});
        }, 3000);
        console.log(err);
        throw err;
      }
      reset();
    };
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {isAlertVisible.visible && <div className='alert-container'>
+               <div className='alert-inner'>{isAlertVisible.msg}</div>
+           </div>
        }
        <h1>Enter Contact Details</h1>
      <label htmlFor="firstName">First Name</label>
        <input id="firstName" {...register('firstName', { required: true, maxLength: 25 })}/>
        <span className = "error"> 
        {errors.firstName && errors.firstName.type === "required" && "This is required"}
        {errors.firstName && errors.firstName.type === "maxLength" && "Max length exceeded" }
        </span>
      <label htmlFor="lastName">Last Name</label>
        <input id="lastName" {...register('lastName', { required: true, maxLength: 25 })} />
        <span className = "error"> 
        {errors.lastName && errors.lastName.type === "required" && "This is required"}
        {errors.lastName && errors.lastName.type === "maxLength" && "Max length exceeded" }
        </span>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        {...register("email", {
          required: "required",
          maxLength: 50,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
          }
        })}
        type="email"
      />
      <span className = "error">
      {errors.email && <span role="alert">{errors.email.message}</span>}
      </span>
      <label htmlFor="message">Message</label>
        <textarea id="message" {...register('message', { required: true, maxLength: 500 })} />
        <span className = "error">
        {errors.message && errors.message.type === "required" && "This is required"}
        {errors.message && errors.message.type === "maxLength" && "Max length exceeded" }
        </span>
        <input type="submit" className="submitButton" />
    </form>
    );
};

export default ContactForm;
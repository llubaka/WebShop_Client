import React from "react";
import emailjs from "emailjs-com";

export default function MakeOrder() {
  function sendEmail(e: any) {
    e.preventDefault();

    console.log("ASF", process.env);

    if (!process.env.REACT_APP_EMAIL_SERVICE_ID) {
      console.log("Email service id is undefined.");
      return;
    }
    if (!process.env.REACT_APP_EMAIL_TEMPLATE_ID) {
      console.log("Email template id is undefined.");
      return;
    }
    if (!process.env.REACT_APP_EMAIL_PUBLIC_KEY) {
      console.log("Email public key is undefined.");
      return;
    }

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Telephone</label>
      <input type="text" name="telephone" />
      <label>address</label>
      <input type="email" name="address" />
      <label>products</label>
      <input type="email" name="products" />
      <input type="submit" value="Send" />
    </form>
  );
}

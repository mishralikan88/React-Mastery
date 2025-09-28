import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

// Thank you component

const ThankYou = ({ name }) => (
  <div style={{ marginTop: 20, color: "green" }}>
    <h2>✅ Thank you, {name || "User"} !</h2>
    <p>Your form has been submitted successfully.</p>
  </div>
);

const App = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setValues((prev) => {
      return { ...prev, [name]: value };
      // Copies previous form values and updates the changed field; keeps the form state in sync.Update only the changed field, keep others as-is.
    });
  };

  const validate = (formData) => {
    const errors = {};

    // Form validation

    // name field validation -

    if (!formData.name.trim()) errors.name = "Name is required.";
    else if (formData.name.trim().length < 2)
      errors.name = "Name must be at least 2 characters.";

    // email field validation -

    const emailPat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!emailPat.test(formData.email.trim()))
      errors.email = "Enter a valid email address.";

    // message field validation -

    if (!formData.message.trim()) errors.message = "Name is required.";
    else if (formData.message.trim().length < 2)
      errors.message = "Message must be at least 2 characters.";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const errors = validate(values);
    setErrors(errors);
    setSuccess(Object.keys(errors).length === 0); // If the validation object `errors` has no keys, the form is valid → setSuccess(true).
  };

  // If form is validated show Thank you message.

  // if (success) {
  //   return <ThankYou name={values.name} />;
  // }

  // conditional rendering-
  
  return success ? (<ThankYou name={values.name} />) :  (
    <div>
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            placeholder="Your name"
            id="name"
            value={values.name}
            onChange={handleChange}
            type="text"
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <br />
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Min 8 chars; letters & numbers"
            value={values.message}
            onChange={handleChange}
          />
          {errors.message && (
            <div style={{ color: "red" }}>{errors.message}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>

      {success && (
        <div style={{ color: "green", marginTop: 8 }}>
          ✅ All fields are valid. Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default App;
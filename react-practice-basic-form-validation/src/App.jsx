import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

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

    // name field validation

    if (!formData.name.trim()) errors.name = "Name is required.";
    else if (formData.name.trim().length < 2)
      errors.name = "Name must be at least 2 characters.";

    // email field validation

    const emailPat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!emailPat.test(formData.email.trim()))
      errors.email = "Enter a valid email address.";

    // password field validation

    const pwd = (formData.password ?? "").trim();
    const strongPwd = /^(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/;
    if (!pwd) errors.password = "Password is required.";
    else if (!strongPwd.test(pwd))
      errors.password =
        "Min 8 chars, include at least 1 digit and 1 special character, no spaces.";

    // confirm password field validation

    if (!formData.confirmPassword)
      errors.confirmPassword = "Please confirm your password.";
    else if (formData.confirmPassword !== formData.password)
      errors.confirmPassword = "Passwords do not match.";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const errors = validate(values);
    setErrors(errors);
    setSuccess(Object.keys(errors).length === 0); // If the validation object `errors` has no keys, the form is valid → setSuccess(true).
  };

  return (
    <div>
      <h1>Basic Form - Client Validation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* `htmlFor` must match the input's `id` so clicking the label focuses that input. */}
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
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Min 8 chars; letters & numbers"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div style={{ color: "red" }}>{errors.confirmPassword}</div>
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


// Implementation Approach - 

// UI -
// 1) Build the form: place each label and input inside its own <div>, and wrap all fields in a <form>.
// 2) Show each field’s validation error inside its corresponding <div>.
// 3) Outside the form, show a success message when validation passes.

// Business Logic -

//  When the user clicks Submit, the form's onSubmit handler runs.
//  Call a custom validate(values) function that returns an errors object (one key per invalid field).
//  If the errors object is empty, validation passed, otherwise, it failed.
//  Update state accordingly:
//     setErrors(errors);
//     setSuccess(Object.keys(errors).length === 0);
//  The UI re-renders to display inline errors or the success message.


import React, { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  gender: "",
  role: "",
  agree: false,
};

const ROLES = ["Developer", "Designer", "Manager"];
const GENDERS = ["Male", "Female", "Other"];

export default function App() {
  const [level, setLevel] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);

  // ---------- validation ----------
  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/i.test(value))
          return "Invalid email.";
        return "";
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 6) return "Min 6 characters.";
        return "";
      case "gender":
        if (!value) return "Select a gender.";
        return "";
      case "role":
        if (!value) return "Select a role.";
        return "";
      case "agree":
        if (!value) return "You must agree.";
        return "";
      default:
        return "";
    }
  }

  function validateForm(f) {
    const errs = {};
    Object.keys(f).forEach((k) => {
      const err = validateField(k, f[k]);
      if (err) errs[k] = err;
    });
    return errs;
  }

  // ---------- handlers ----------
  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setRows((r) => [...r, form]);
    setForm(initialForm);
  }

  // ---------- UI ----------
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Controlled Form Playground</h1>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setLevel(1)}>Level 1</button>{" "}
        <button onClick={() => setLevel(2)}>Level 2</button>{" "}
        <button onClick={() => setLevel(3)}>Level 3</button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Common fields */}
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {level >= 2 && errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {level >= 2 && errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="******"
          />
          {level >= 2 && errors.password && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
        </div>

        {/* Level 3 adds more */}
        {level >= 3 && (
          <>
            <div>
              <label>Gender:</label>
              {GENDERS.map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
              {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
            </div>

            <div>
              <label>Role:</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="">-- Select --</option>
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                I agree to terms
              </label>
              {errors.agree && <p style={{ color: "red" }}>{errors.agree}</p>}
            </div>
          </>
        )}

        <button type="submit">Submit</button>
      </form>

      {/* Playground */}
      {level >= 3 && rows.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2>Submitted Data</h2>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Agree</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{"*".repeat(r.password.length)}</td>
                  <td>{r.gender}</td>
                  <td>{r.role}</td>
                  <td>{r.agree ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

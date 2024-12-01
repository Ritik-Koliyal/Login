// handle signup function for signup operation's
async function handleSignUp(event) {
  event.preventDefault();
  // collecting form data
  const fullName = document.getElementById("name").value;
  const Dob = document.getElementById("dob").value;
  const email = document.getElementById("confirm-name").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Password and confirm password should be same ");
    return;
  }

  try {
    const response = await fetch("http://localhost:3100/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        Dob,
        email,
        phone,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Account created successfully!");
      window.location.href = "login.html";
    } else {
      const error = await response.json(); // Error message in JSON
      alert(`${error.message}: please enter valid values `);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server is not responding or returned invalid data.");
  }
}

document.querySelector(".btn-dark").addEventListener("click", handleSignUp);

// handle login function for signup operation's
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3100/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      alert("Login successfully");
      window.location.href = "home.html";
    } else {
      const error = await response.json();
      alert(`${error.message} please enter valid values`);
    }
  } catch (error) {
    console.error("error");
    alert("server is not responding or retruned invalid data");
  }
}

document.querySelector(".login").addEventListener("click", handleLogin);

import axios from "axios";

const URL = "https://z0djq22j-5000.inc1.devtunnels.ms";

export async function createUser(
  phoneNumber: string,
  name: string,
  email: string
) {
  const data = {
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    password: "securePassword123",
    zipcode: "140802",
    address: {
      street: "Main Street",
      city: "Chandigarh",
      state: "Punjab",
      country: "India",
      coordinates: {
        lat: 30.7333,
        lon: 76.7794,
      },
    },
    profilePicture: "https://cdn.app.com/images/john.jpg",
  };

  try {
    const response = await axios.post(URL + "/api/users/create-user", data);

    console.log("Login response:", response.data); // ✅ Log only after resolved
    return response.data; // optional: return the user/token/etc.
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}

export async function userLogin(phoneNumber: string) {
  //     const data = {
  //       name: name,
  //   phoneNumber: phoneNumber,
  //   email: email,
  //   password: "securePassword123",
  //   zipcode: "140802",
  //   address: {
  //     street: "Main Street",
  //     city: "Chandigarh",
  //     state: "Punjab",
  //     country: "India",
  //     coordinates: {
  //       lat: 30.7333,
  //       lon: 76.7794,
  //     },
  //   },
  //   profilePicture: "https://cdn.app.com/images/john.jpg",
  //     }

  try {
    const response = await axios.post(URL + "/api/auth/user/login", {
      phoneNumber: "9876543210",
      password: "securePassword123",
    });

    console.log("Login response:", response.data); // ✅ Log only after resolved
    return response.data; // optional: return the user/token/etc.
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}

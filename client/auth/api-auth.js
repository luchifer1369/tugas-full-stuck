// 📂 Lokasi: client/auth/api-auth.js
const signin = async (user) => {
  try {
    const response = await fetch("/auth/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Server Response (HTML):", text);
      throw new Error("Gagal login - Server mengembalikan HTML");
    }

    return await response.json();
  } catch (err) {
    console.error("❌ Signin Error:", err);
    return { error: "Gagal login - Format tidak sesuai" };
  }
};

const signout = async () => {
  try {
    let response = await fetch("/auth/signout", { method: "GET" });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin, signout };

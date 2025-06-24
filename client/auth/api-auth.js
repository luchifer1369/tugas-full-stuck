// 📂 Lokasi: client/auth/api-auth.js

// Fungsi untuk melakukan permintaan login ke server (endpoint: /auth/signin)
const signin = async (user) => {
  try {
    // Mengirimkan permintaan HTTP POST ke endpoint /auth/signin
    const response = await fetch("/auth/signin", {
      method: "POST", // Metode HTTP POST untuk mengirim data login
      headers: {
        Accept: "application/json", // Menerima respon dalam format JSON
        "Content-Type": "application/json", // Memberitahu server bahwa data dikirim dalam format JSON
      },
      body: JSON.stringify(user), // Mengubah objek user menjadi string JSON sebelum dikirim
    });

    // Jika respons dari server bukan status 2xx (OK), maka ambil teks HTML error untuk debugging
    if (!response.ok) {
      const text = await response.text(); // Mengambil konten HTML (jika ada error)
      console.error("❌ Server Response (HTML):", text); // Log HTML jika bukan JSON
      throw new Error("Gagal login - Server mengembalikan HTML"); // Lempar error untuk ditangkap di catch
    }

    return await response.json(); // Mengembalikan hasil response dalam format JSON (berisi token dan user)
  } catch (err) {
    console.error("❌ Signin Error:", err); // Menampilkan error di console jika fetch gagal
    return { error: "Gagal login - Format tidak sesuai" }; // Mengembalikan pesan error ke UI
  }
};

// Fungsi untuk melakukan logout pengguna (endpoint: /auth/signout)
const signout = async () => {
  try {
    // Mengirimkan permintaan HTTP GET ke endpoint /auth/signout
    let response = await fetch("/auth/signout", { method: "GET" });
    return await response.json(); // Mengembalikan respon logout dalam format JSON
  } catch (err) {
    console.log(err); // Menampilkan error jika fetch gagal
  }
};

// Mengekspor fungsi signin dan signout agar dapat digunakan di komponen lain
export { signin, signout };

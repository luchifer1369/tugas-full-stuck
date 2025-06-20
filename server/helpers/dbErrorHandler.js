// 📂 Lokasi: server/helpers/dbErrorHandler.js

const getErrorMessage = (err) => {
  // Duplicate key
  if (err.code && err.code === 11000) {
    return "Email is already registered";
  }

  // Mongoose validation error
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        return err.errors[errName].message;
      }
    }
  }

  return "Something went wrong";
};

export default { getErrorMessage };

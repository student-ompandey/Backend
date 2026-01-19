const emails = ["test@gmail.com", "", "admin@gmail.com"];

emails.forEach(email => {
  if (!email) {
    console.log("Invalid email  this is not exist");
  }
});

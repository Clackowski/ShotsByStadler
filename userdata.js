export function attemptLogin(username, password) {
    fetch('userdata.json')
      .then(response => response.json())
      .then(data => {
        // Check if user exists
        const userExists = data.users.hasOwnProperty(username);

        // Check if that user's password is correct
        if (userExists) {
            const usersPassword = data.users[username].password;
            if (usersPassword == password) {
                console.log("welcome");
            } else {
                console.log("password is invalid");
            }
        } else {
            console.log("Username is invalid")
        }
      })
      .catch(error => console.error('Error:', error));
}
  
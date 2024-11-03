class User {
  constructor(username, email, password, phonenumber, role) {
    this.phonenumber = phonenumber;
    this.userID = phonenumber;
    this.name = username;
    this.email = email;
    this.password = password;

    this.role = role;
    this.auctionsParticipating = [];
    this.actionsCreated = [];
    this.bids = [];
    this.notifications = [];
  }
}

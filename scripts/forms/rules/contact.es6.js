const constraints = {
  address: {
    presence: true,
    exclusion: {
      //within: ["nicklas"],
      message: "'%{value}' is not allowed"
    }
  },
  city: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
};

module.exports = constraints;
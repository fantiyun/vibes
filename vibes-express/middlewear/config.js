const errorMessages = {
  required: (name = '') => {
    return `${name} is required!`
  },
  invalidFormat: (name = '') => {
    return `The ${name} format is not compliant`
  },
  alreadyRegistered: (name, value) => {
    return `${name} ${value} has been registered!`
  },
  maxLength: (name, maxLength) => {
    return `The ${name} must not be longer than ${maxLength}`
  },
  minLength: (name, minLength) => {
    return `The length of the ${name} cannot be less than ${minLength} characters`
  },
  notRegistered: (name) => {
    return `The ${name} is not registered!`
  },

  signup: {
    username: {
      required: (name) => errorMessages.required(name),
      maxLength: (name, maxLength) => errorMessages.maxLength(name, maxLength),
    },
    email: {
      required: (name) => errorMessages.required(name),
      invalidFormat: (name) => errorMessages.invalidFormat(name),
      alreadyRegistered: (name, value) =>
        errorMessages.alreadyRegistered(name, value),
    },
    password: {
      required: (name) => errorMessages.required(name),
      minLength: (name, minLength) => errorMessages.minLength(name, minLength),
    },
    phoneNumber: {
      required: (name) => errorMessages.required(name),
      invalidFormat: (name) => errorMessages.invalidFormat(name),
      alreadyRegistered: (name, value) =>
        errorMessages.alreadyRegistered(name, value),
    },
  },
  signin: {
    email: {
      required: (name) => errorMessages.required(name),
      invalidFormat: (name) => errorMessages.invalidFormat(name),
      notRegistered: (name) => errorMessages.notRegistered(name),
    },
    password: {
      required: (name) => errorMessages.required(name),
    },
  },
  update: {
    email: {
      invalidFormat: (name) => errorMessages.invalidFormat(name),
    },
    username: {
      required: (name) => errorMessages.required(name),
      maxLength: (name, maxLength) => errorMessages.maxLength(name, maxLength),
    },
  },
}

module.exports = errorMessages

/*
 module.exports = {
  signup: {
    username: {
      required: 'username is required!',
      maxLength: 'The username must not be longer than 70',
    },
    email: {
      required: 'email is required!',
      invalidFormat: 'The email format is not compliant',
      alreadyRegistered: 'Email {email} has been registered!',
    },
    password: {
      required: 'password is required!',
      minLength: 'The length of the password cannot be less than 6 characters',
    },
    phoneNumber: {
      required: 'Mobile phone number is required!',
      invalidFormat: 'The mobile phone number format is not compliant',
      alreadyRegistered: 'Mobile phone number {phoneNumber} has been registered!',
    },
  },
  signin: {
    email: {
      required: 'email is required!',
      invalidFormat: 'The email format is not compliant!',
      notRegistered: 'The email address is not registered!',
    },
    password: {
      required: 'password is required!',
    },
  },
  update: {
    email: {
      invalidFormat: 'The email format is not compliant!',
    },
    username: {
      required: 'username is required!',
      maxLength: 'The username must not be longer than 70',
    },
  },
};
*/

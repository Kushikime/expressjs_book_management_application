const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validateSignUpBody = (body) => {
  let errors = {};
  let { firstName, lastName, address, city, zipCode, state, password, email } =
    body;

  if (firstName.trim().length <= 2) {
    errors.firstName = {
      message: 'Please enter a valid name',
    };
  } else if (!/^[A-za-z]+$/.test(firstName.trim())) {
    errors.firstName = {
      message: 'Enter a name which contains only letters',
    };
  }

  if (lastName.trim().length <= 2) {
    errors.lastName = {
      message: 'Please enter a valid last name',
    };
  } else if (!/^[A-za-z]+$/.test(lastName.trim())) {
    errors.lastName = {
      message: 'Enter a last name name which contains only letters',
    };
  }

  if (address.trim().length < 3) {
    errors.address = {
      message: 'Address should be at least 3 character long',
    };
  }

  if (city.trim().length < 4) {
    errors.city = {
      message: 'City should be at least 4 character long',
    };
  }

  if (zipCode.trim().length < 5) {
    errors.zipCode = {
      message: 'Zip code should be at least 5 character long',
    };
  }

  if (state.trim().length < 4) {
    errors.state = {
      message: 'State should be at least 5 character long',
    };
  }

  if (password.trim().length < 4) {
    errors.password = {
      message: 'Password should be at least 8 character long',
    };
  }

  if (!emailRegex.test(email.trim())) {
    errors.email = {
      message: 'Enter a valid email',
    };
  }
  return errors;
};

module.exports = validateSignUpBody;

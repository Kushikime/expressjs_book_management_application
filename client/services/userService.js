const axios = require('axios');

const loginPost = async (body) => {
  try {
    const result = await axios.post(
      `${process.env.BACK_END_URL}/users/login`,
      body,
    );

    return result;
  } catch (err) {
    console.error('loginPost error: ' + err.response.data.message);
  }
};

const signUpPost = async (body) => {
  try {
    const result = await axios.post(
      `${process.env.BACK_END_URL}/users/register`,
      body,
    );

    return result;
  } catch (err) {
    console.error('signUpPost error: ' + err.response.data.message);
  }
};

module.exports = { signUpPost, loginPost };

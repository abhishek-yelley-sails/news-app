import { Router } from "express";
import { SignupInfo, Errors } from "../definions";
import { isExistingUser, isValidEmail, isValidPassword } from "../util/validation.js";
import { errorBuilder } from "../util/error.js";
import { addUser, getUser } from "../data/user.js";
import { createJSONToken, checkPassword } from "../util/auth.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const data: SignupInfo = req.body;
  let errors: Errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email: ' + data.email;
  }
  else if (await isExistingUser(data.email)) {
    errors.email = 'Email already exists!';
  }
  else if (!isValidPassword(data.password)) {
    errors.password = 'Invalid password. Must be at least 6 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json(errorBuilder('User signup failed due to validation errors.', errors));
  }

  try {
    const { password, ...createdUser } = await addUser(data);
    const authToken = createJSONToken(createdUser.userId);
    res.status(201).json({ message: 'User created.', user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }

});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await getUser(email);
    const pwIsValid = await checkPassword(password, user.password);
    if (!pwIsValid) {
      return res.status(422).json({
        message: 'Invalid credentials.',
        errors: { credentials: 'Invalid email or password entered.' },
      });
    }

    const token = createJSONToken(user.userId);
    return res.json({
      token, user: {
        userId: user.userId,
      }
    });
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }
});

export default router;
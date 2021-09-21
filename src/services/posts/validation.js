import { body } from "express-validator";
const postValidationMiddleware = [
  body("title").exists().withMessage("title is a mandatory field"),
  body("category").exists().withMessage("category is a mandatory field"),
  //   body("email")
  //     .exists()
  //     .withMessage("email is a mandatory field")
  //     .isEmail()
  //     .withMessage("please send valid email id."),
];
export default postValidationMiddleware;

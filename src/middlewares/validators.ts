import { celebrate, Joi } from "celebrate";
import { Types } from "mongoose";

// eslint-disable-next-line operator-linebreak
export const urlRegex = // eslint-disable-next-line no-useless-escape
/^(https?:\/\/)(www)?((?!www)[\w\-\.]+)(\.\w{2,})([a-zA-Z\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=\w]*)$/i;

export const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((id, helpers) => {
        if (Types.ObjectId.isValid(id)) {
          return id;
        }
        return helpers.message({ custom: "Incorrect id!" });
      }),
  }),
});

export const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'Minimal "name" length must be 2!',
      "string.max": 'Maximum "name" length must be 30!',
      "string.empty": 'Field "name" must not be empty!',
    }),
    about: Joi.string().min(2).max(200).messages({
      "string.min": 'Minimal "about" length must be 2!',
      "string.max": 'Maximum "about" length must be 200!',
      "string.empty": 'Field "about" must not be empty!',
    }),
    avatar: Joi.string()
      .pattern(urlRegex)
      .message("Invalid url!")
      .messages({
        "string.empty": 'Field "about" must not be empty!',
      }),
    email: Joi.string()
      .required()
      .email()
      .message('Field "email" must have an email!')
      .messages({
        "string.empty": 'Field "email" must not be empty!',
      }),
    password: Joi.string().required().messages({
      "string.empty": 'Field "password" must not be empty!',
    }),
  }),
});

export const validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        "string.min": 'Minimal "name" length must be 2!',
        "string.max": 'Maximum "name" length must be 30!',
        "string.empty": 'Field "name" must not be empty!',
      }),
    about: Joi.string().required().min(2).max(200)
      .messages({
        "string.min": 'Minimal "about" length must be 2!',
        "string.max": 'Maximum "about" length must be 200!',
        "string.empty": 'Field "about" must not be empty!',
      }),
  }),
});

export const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(urlRegex)
      .message("Invalid url!")
      .messages({
        "string.empty": 'Field "avatar" must not be empty!',
      }),
  }),
});

export const validateCard = celebrate({
  body: Joi.object().keys({
    link: Joi.string()
      .required()
      .pattern(urlRegex)
      .message("URL is expected!")
      .messages({
        "string.empty": "Field url must not be empty!",
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        "string.min": 'Minimal "name" length must be 2!',
        "string.max": 'Maximum "name" length must be 30!',
        "string.empty": 'Field "name" must not be empty!',
      }),
  }),
});

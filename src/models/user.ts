import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { urlRegex } from "../middlewares/validators";
import AuthenticationError from "../errors/auth-err";

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<mongoose.Document<unknown, any, IUser>>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (v: string) => urlRegex.test(v),
        message: "Invalid url!",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: "Invalid email format!",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.static(
  "findUserByCredentials",
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select("+password")
      .then((user: IUser) => {
        if (!user) {
          return Promise.reject(
            new AuthenticationError("Wrong password or email!"),
          );
        }

        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(
              new AuthenticationError("Wrong password or email!"),
            );
          }

          return user;
        });
      });
  },
);

export default mongoose.model<IUser, UserModel>("user", userSchema);

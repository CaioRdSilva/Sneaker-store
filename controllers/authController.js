import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export class authController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    //validation password match
    if (password != confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente!");
      res.render("auth/register");

      return;
    }
    //chek if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash("message", "O E-mail já está cadastrado!");
      res.render("auth/register");

      return;
    }

    //create password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };
    try {
      const createdUser = await User.create(user);
      //initialize section
      req.session.userid = createdUser.id;
      req.flash("message", "Cadastro realizado com Sucesso!");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

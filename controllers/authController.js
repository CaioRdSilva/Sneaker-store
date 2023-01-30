import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export class authController {
  static login(req, res) {
    res.render("auth/login");
  }
  static async loginPost(req, res) {
    const { email, password } = req.body;
    // find user
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash("message", "E-mail não cadastrado!");
      res.render("auth/login");

      return;
    }
    //password match
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "E-mail ou senha incorreto!");
      res.render("auth/login");

      return;
    }

    //login confirmed
    req.session.userid = user.id;
    req.session.userseller = user.seller;
    req.flash("message", "Login realizado com sucesso!");
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;
    let seller = req.body.seller;
    if (seller === "on") {
      seller = true;
    } else {
      seller = false;
    }
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
      seller,
      password: hashedPassword,
    };
    try {
      const createdUser = await User.create(user);
      //initialize section
      req.session.userseller = createdUser.seller;
      req.session.userid = createdUser.id;
      req.flash("message", "Cadastro realizado com Sucesso!");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}

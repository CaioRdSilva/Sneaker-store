import { Sneaker } from "../models/Sneaker.js";
import { User } from "../models/User.js";

export class sneakersController {
  static async showSneakers(req, res) {
    res.render("sneakers/home");
  }
  static async dashboard(req, res) {
    res.render("sneakers/dashboard");
  }
  static createSneaker(req, res) {
    res.render("sneakers/create");
  }
  static async createSneakerPost(req, res) {
    const sneaker = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      prodImg: req.file.path,
      UserId: req.session.userid,
    };
    try {
      await Sneaker.create(sneaker);

      req.flash("message", "Anúncio criado!");

      req.session.save(() => {
        res.redirect("/sneakers/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

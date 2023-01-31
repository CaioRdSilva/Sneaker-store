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
}

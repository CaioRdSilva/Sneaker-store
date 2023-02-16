import { Sneaker } from "../models/Sneaker.js";
import { User } from "../models/User.js";
import { Op } from "sequelize";

export class sneakersController {
  static async showSneakers(req, res) {
    let search = "";

    if (req.query.search) {
      search = req.query.search;
    }

    let order = "DESC";

    if(req.query.order === "old"){
      order = "ASC";
    }

    const Data = await Sneaker.findAll({
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", order]]
    });
    const sneakers = Data.map((result) => result.dataValues);

    let sneakersQty = sneakers.length;

    if(sneakersQty === 0) {
      sneakersQty = false;
    }

    res.render("sneakers/home", { sneakers, search, sneakersQty });
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Sneaker,
      plain: true,
    });
    if (!user) {
      res.redirect("/login");
      return;
    }
    const sneakers = user.Sneakers.map((result) => result.dataValues);

    let emptySneakers = false;

    if (sneakers.length === 0) {
      emptySneakers = true;
    }

    res.render("sneakers/dashboard", { sneakers, emptySneakers });
  }
  static createSneaker(req, res) {
    res.render("sneakers/create");
  }
  static async createSneakerPost(req, res) {
    const sneaker = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      prodImg: req.file.filename,
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
  static async editSneaker(req, res) {
    const id = req.params.id;

    const sneaker = await Sneaker.findOne({ where: { id: id }, raw: true });

    res.render("sneakers/edit", { sneaker });
  }
  static async editSneakerPost(req, res) {
    const id = req.body.id;
    const sneaker = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      prodImg: req.file.filename,
    };

    try {
      await Sneaker.update(sneaker, { where: { id: id } });
      req.flash("message", "Anúncio atualizado com sucesso!");

      req.session.save(() => {
        res.redirect("/sneakers/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async removeSneaker(req, res) {
    const id = req.body.id;
    const userId = req.session.userid;

    try {
      await Sneaker.destroy({ where: { id: id, userId: userId } });
      req.flash("message", "Anúncio removido com sucesso!");
      req.session.save(() => {
        res.redirect("/sneakers/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

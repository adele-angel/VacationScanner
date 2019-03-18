const express = require("express");
const router = express.Router();
const passport = require("passport");

const io = require("../socket");

const validateVacationInput = require("../validation/vacation"); // Load input validation

const User = require("../models/User"); // Load User model
const Profile = require("../models/Profile"); // Load profile model
const Vacation = require("../models/Vacation"); // Load vacation model

// GET /vacation Get all vacations (private)
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Vacation.find({})
      .sort({ date: -1 })
      .populate("user")
      .then(vacations => {
        res.json(vacations);
      })
      .catch(err =>
        res.status(404).json({ novacationsfound: "No vacations found" })
      );
  }
);

// GET /vacation/:id Get vacation (private)
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Vacation.findById(req.params.id)
      .then(vacation => res.json(vacation))
      .catch(err =>
        res
          .status(404)
          .json({ novacationfound: "No vacation was found with that ID" })
      );
  }
);

// POST /vacation Create vacation (private)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateVacationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newVacation = new Vacation({
      title: req.body.title,
      info: req.body.info,
      image: req.body.image,
      from: req.body.from,
      to: req.body.to,
      price: req.body.price,
      user: req.user.id
    });
    newVacation.save().then(vacation => {
      io.getIO().emit("vacations", { action: "create", vacation: vacation });
      res.json(vacation);
    });
  }
);

// POST /vacation/:id Edit vacation (private)
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateVacationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const title = req.body.title;
    const info = req.body.info;
    const image = req.body.image;
    const from = req.body.from;
    const to = req.body.to;
    const price = req.body.price;
    const user = req.user.id;

    Vacation.findById(req.params.id)
      .then(vacation => {
        vacation.title = title;
        vacation.info = info;
        vacation.image = image;
        vacation.from = from;
        vacation.to = to;
        vacation.price = price;
        vacation.user = user;

        vacation.save().then(vacation => res.json(vacation));
      })
      .catch(err =>
        res.status(404).json({ vacationnotfound: "Failed to edit vacation" })
      );
  }
);

// DELETE /vacation/:id Delete vacation (private)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Vacation.findById(req.params.id)
        .then(vacation => {
          // if (vacation.user.toString() !== req.user.id) {
          // 	res.status(401).json({ notauthorized: 'User not authorized' });
          // }
          vacation
            .remove()
            .then(() => res.json({ success: true, deletedby: req.user }));
        })
        .catch(err =>
          res.status(404).json({ vacationnotfound: "No vacation found" })
        );
    });
  }
);

// POST /vacation/like/:id Follow a vacation (private)
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Vacation.findById(req.params.id)
        .then(vacation => {
          if (
            vacation.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            const removeIndex = vacation.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            vacation.likes.splice(removeIndex, 1);
            vacation.save().then(vacation => {
              User.findById(req.user.id).then(user => {
                const removeIndex = user.liked
                  .map(item => item.vacation.toString())
                  .indexOf(vacation.id);
                user.liked.splice(removeIndex, 1);
                user.save().then(user => {
                  res.json({
                    vacation: vacation,
                    user: user
                  });
                });
              });
            });
          } else {
            vacation.likes.unshift({ user: req.user.id });
            vacation.save().then(vacation => {
              User.findById(req.user.id).then(user => {
                user.liked.unshift({ vacation: vacation.id });
                user.save().then(user =>
                  res.json({
                    vacation: vacation,
                    user: user
                  })
                );
              });
            });
          }
        })
        .catch(err =>
          res.status(404).json({ vacationnotfound: "No vacation found" })
        );
    });
  }
);

module.exports = router;

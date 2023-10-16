let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
let employeeSchema = require("../models/Item");

router.route("/create-item").post(async(req, res, next) => {
    await employeeSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "Data Successfully added",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

router.route("/").get(async(req, res, next) => {
    await employeeSchema
        .find()
        .then((result) => {
            res.json({
                data: result,
                message: "All items successfully fetched",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/delete-item/:id").delete(async(req, res, next) => {
    await employeeSchema
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({
                msg: "Data Successfully updated",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
router.route("/get-item/:id").get(async(req, res, next) => {
    await employeeSchema
        .findById(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully fetched",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/update-item/:id").put(async(req, res, next) => {
    await employeeSchema
        .findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        .then((result) => {
            res.json({
                data: result,
                msg: "data Successfully updated",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;
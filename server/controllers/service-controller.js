const Service = require("../models/service-model");

const services = async(req, res) => {
    try {
        const response = await Service.find();
        res.status(200).send({msg: response});

        if(!response) {
            res.status(404).send({msg: "No services found"});
            return
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = services;
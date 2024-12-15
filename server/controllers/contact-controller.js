const contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try {
        const response = req.body;
       await contact.create(response);

       return res.status(200).json({ msg: "Message sent successfully" });
    } catch (error) {
        console.log(error);
    }
};

module.exports = contactForm;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/order", async (req, res) => {
  const { name, phone, items, time } = req.body;

  const msg = {
    to: "templesgrace@gmail.com",
    from: "templesgrace@gmail.com",
    subject: "New Order - Temple's Grace",
    text: `
New Order Received:

Name: ${name}
Phone: ${phone}
Pickup Time: ${time}

Items:
${items}
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send("Order sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending order");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
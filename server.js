const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Serve your static site (index.html, images, css)
app.use(express.static(path.join(__dirname, ".")));

// 🔥 Order endpoint
app.post("/order", async (req, res) => {
  const { name, phone, items, time } = req.body;

  const msg = {
    to: "templesgrace@gmail.com",
    from: "templesgrace@gmail.com", // must be verified in SendGrid
    subject: "🔥 New Order - Temple's Grace",
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

// 🔥 Catch-all: send index.html for any route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔥 Use Render's port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
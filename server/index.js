const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./Routes/User");
const session = require("express-session");
const passport = require("passport");
const AuthRoutes = require("./Routes/Auth");
const eventRoutes = require("./Routes/Event");
const emailRoutes = require("./Routes/Email");
require("dotenv").config();
require("./Config/Passport");
const { DefaultAdmin } = require("./Models/DefaultAdmin");
const User = require("./Models/User");
const paypal = require("paypal-rest-sdk");
const TicketSale = require("./Models/SoldEvents");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow the frontend origin
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// const MongoStore = require("connect-mongo");

const MongoStore = require('connect-mongo');
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use an environment variable
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/event_users" }), // Persistent store
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
      secure: false, // Set to true in production if using HTTPS
      httpOnly: true,
    },
  })
);


paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENTID,
  client_secret: process.env.PAYPAL_SECRETKEY,
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/events", eventRoutes);
app.use("/api", emailRoutes);
app.use("/api", AuthRoutes); // Google Auth Routes
app.use("/api", userRoutes); //User Routes
app.get("/api/attendees", async (req, res) => {
  try {
    // Fetch users with role 'user' (or other roles as needed)
    const attendees = await User.find({ role: "user" }, "name email");

    res.json(attendees);
  } catch (error) {
    console.error("Error fetching attendees:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/payment", async (req, res) => {
  try {
    const { ticketPrice, eventId } = req.body;

    if (!ticketPrice || !eventId) {
      return res
        .status(400)
        .json({ message: "Ticket price and Event ID are required" });
    }

    req.session.ticketPrice=ticketPrice;
    req.session.eventId=eventId;

    req.session.save((err) => {
      if (err) {
        console.log("Session save error:", err);
      } else {
        console.log("Session saved:", req.session.eventId);
      }
      console.log("Session after saving:", req.session);

      let create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:8000/api/success",
          cancel_url: "http://localhost:8000/api/cancel",
        },
        transactions: [
          {
            amount: {
              total: ticketPrice,
              currency: "USD",
            },
            description: `Payment for event with ticket price: ${ticketPrice}`,
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          console.log("Error creating PayPal payment:", error);
          throw error;
        } else {
          res.json(payment); // Return payment details to the frontend
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/success", async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    let eventId = req.session.eventId;
    let ticketPrice = req.session.ticketPrice;

    console.log("ticketPrice in succes", req.session);

    if (!ticketPrice || !eventId) {
      return res
        .status(400)
        .json({ message: "Ticket price or Event ID missing in session" });
    }

    const express_checkout_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: ticketPrice.toFixed(2),
          },
          description: `Payment for event with ticket price: ${ticketPrice}`,
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      express_checkout_json,
      async function (error, payment) {
        if (error) {
          console.log("Payment execution error:", error.response);
          throw error;
        } else {
          const saleId = payment.transactions[0].related_resources[0].sale.id;

          const ticketSale = new TicketSale({
            eventId: eventId,
            saleId: saleId,
            ticketPrice: parseFloat(ticketPrice),
            date: new Date(),
            status: "Completed",
          });

          await ticketSale.save();

          req.session.eventId = null;
          req.session.ticketPrice = null;

          res.redirect(`/success?ticketSaleId=${ticketSale._id}`);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error processing payment" });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/event_users")
  .then(() => {
    console.log("Connected to DB");
    DefaultAdmin();
    app.listen(8000, () => {
      console.log("Server is Listening on PORT:", 8000);
    });
  })
  .catch((err) => console.log(err));

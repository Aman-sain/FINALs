const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url"); 

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const pdfuploadRouter = require('./routes/PDFupload');
const notificationRouter = require('./routes/notification');
const adminRoutes = require('./routes/admin');
const downloadRoutes = require('./routes/index');

const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static("public"));

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/short-url").then(() =>
    console.log("Mongodb connected")
  );


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/admin", checkAuth, staticRoute);////
app.use('/pdfupload', pdfuploadRouter);
app.use('/notificationrouter', notificationRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
app.use('/documentation', adminRoutes);
app.use('/downloadpdf', downloadRoutes);


app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });

app.get("/", (req, res) => {
    res.render("Index");
});
// app.get("/admin", (req, res) => {
//     res.render("admin");
// });
app.get("/aim", (req, res) => {
    res.render("Aim");
});
app.get("/capacity", (req, res) => {
    res.render("capacity");
});
// app.get("/data", (req, res) => {
//     res.render("data");
// });
app.get("/download", (req, res) => {
    res.render("Download");
});
app.get("/downloadupload", (req, res) => {
    res.render("Downloadupload");
});
app.get("/file", (req, res) => {
    res.render("file");
});
// app.get("/form", (req, res) => {
//     res.render("form");
// });
// app.get("/home", (req, res) => {
//     res.render("home");
// });

app.get("/institute", (req, res) => {
    res.render("institute");
});
// app.get("/login", (req, res) => {
//     res.render("login");
// });
app.get("/mandate", (req, res) => {
    res.render("mandate");
});
// app.get("/notifications", (req, res) => {
//     res.render("notifications");
// });
// app.get("/pdfupload", (req, res) => {
//     res.render("PDFupload");
// });
// app.get("/signup", (req, res) => {
//     res.render("signup");
// });
app.get("/success", (req, res) => {
    res.render("success");
});
app.get("/training", (req, res) => {
    res.render("training");
});

// app.get("/download-file",(req, res) =>{
// res.download("./public/docs/aman.pdf");
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});

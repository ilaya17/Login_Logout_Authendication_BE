const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models/user");
const CLIENT_URL = "http://localhost:3000/";
const successRedirectUrl = "https://peaceful-starlight-2210e6.netlify.app/login/success";
const errorRedirectUrl = "https://peaceful-starlight-2210e6.netlify.app/login/failed";


//GOOGLE AUTH--------------------
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: errorRedirectUrl,
        successRedirect: successRedirectUrl,
    })
);

//GITHUB AUTH-------------------------
router.get(
    "/github",
    passport.authenticate("github", { scope: ["profile", "email"] })
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: errorRedirectUrl,
        successRedirect: successRedirectUrl,
    })
);

//FACEBOOK AUTH-------------------------
router.get(
    "/facebook",
    passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: errorRedirectUrl,
        successRedirect: successRedirectUrl,
    })
);

//LOGIN SUCCESS--------------------------
router.get("/login/success", async (req, res) => {
    const result = await User.find({})

    try {
        if (result) {
            res.status(200).json({
                success: true,
                message: "successfull",
                user: result,
                cookies: req.cookies,
            });
        } else {
            res.status(404).json({
                message: "failure",
            });
        }
    } catch (err) {
        console.log(err);
    }
});

//LOGIN FAILED-----------------------
router.get("/login/failed", (req, res) => {
    console.log("Failed", req.user)
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

module.exports = router;
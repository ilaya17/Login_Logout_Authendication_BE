const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("./models/user");

const GOOGLE_CLIENT_ID =
    "20232346707-36lm6rdhngl01tjm69q5ms8v6g1mhlat.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "b8b2e1c1ab0a41903b5b";
GITHUB_CLIENT_SECRET = "ce17701c8be648007be7ee4d85cb1a61d22ab383";

FACEBOOK_APP_ID = "441777618510053";
FACEBOOK_APP_SECRET = "9b74d6e50ad4f35a606179f5bfe41be4";

// PASSPORT STRATEGY FOR GOOGLE

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,

            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "https://multi-oauth.onrender.com/auth/google/callback",

            passReqToCallback: true,
        },
        async (req, acccessToken, refreshToken, profile, cb) => {
            const { id, name, emails, photos } = profile;
            const email = emails[0].value;
            const emailVerified = emails[0].verified;
            const fullName = `${name.givenName} ${name.familyName}`;
            const profilePic = photos[0].value;

            if (emailVerified && email) {
                try {
                    let user = await User.findOne({
                        accountId: id,
                    });

                    if (!user) {
                        const createnewUser = new User({
                            accountId: id,
                            name: fullName,
                            email,
                            picture: profilePic,
                        });

                        const newUser = await createnewUser.save();
                        return cb(null, newUser);
                    } else {
                        return cb(null, user);
                    }
                } catch (error) {
                    cb(new Error(error.message), null);
                }
            } else {
                return cb(new Error("Email Not verified", null));
            }
        }
    )
);

//--------------------------------
// PASSPORT STRATEGY FOR GITHUB

passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "https://multi-oauth.onrender.com/auth/github/callback",
        },
        async (req, acccessToken, refreshToken, profile, cb) => {
            console.log("Acess Token Refresh Token", acccessToken);
            console.log("refresh token", refreshToken);
            const { id, username, photos, profileUrl, provider } = profile;
            const profilePic = photos[0].value;
            if (username) {
                try {
                    let user = await User.findOne({
                        accountId: id,
                    });
                    console.log(user);
                    if (!user) {
                        const createnewUser = new User({
                            accountId: id,
                            name: username,
                            email: profileUrl,
                            picture: profilePic,
                            provider: provider,
                        });

                        const newUser = await createnewUser.save();
                        return cb(null, newUser);
                    } else {
                        return cb(null, user);
                    }
                } catch (error) {
                    cb(new Error(error.message), null);
                }
            } else {
                return cb(new Error("Email Not verified", null));
            }
        }
    )
);

//---------------------------------------
// PASSPORT STRATEGY FOR FACEBOOK

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "https://multi-oauth.onrender.com/auth/facebook/callback",
        },
        async (req, acccessToken, refreshToken, profile, cb) => {
            const { id, name, emails, photos } = profile;
            const email = emails[0].value;
            const emailVerified = emails[0].verified;
            const fullName = `${name.givenName} ${name.familyName}`;
            const profilePic = photos[0].value;

            if (emailVerified && email) {
                try {
                    let user = await User.findOne({
                        accountId: id,
                    });

                    if (!user) {
                        const createnewUser = new User({
                            accountId: id,
                            name: fullName,
                            email,
                            picture: profilePic,
                        });

                        const newUser = await createnewUser.save();
                        return cb(null, newUser);
                    } else {
                        return cb(null, user);
                    }
                } catch (error) {
                    cb(new Error(error.message), null);
                }
            } else {
                return cb(new Error("Email Not verified", null));
            }
        }
    )
);

//-------------------------------------
//SERIALIZATION

passport.serializeUser((user, cb) => {
    try {
        console.log("Serializing user:", user);
        console.log(user.accountId);
        if (!user.accountId) {
            throw new Error("User accountId is undefined");
        }
        cb(null, user.accountId);
    } catch (err) {
        console.log("Error", err);
        cb(err, null);
    }
});

//DESERIALIZATION

passport.deserializeUser(async (id, cb) => {
    if (id) {
        try {
            const user = await User.findOne({ accountId: id });
            if (user) {
                return cb(null, user);
            }
            else {
                return cb("User Not Found", null);
            }
        } catch (error) {
            return cb(new Error(error.message), null);
        }
    } else {
        return cb(new Error("No id present for dserialization"), null);
    }
});
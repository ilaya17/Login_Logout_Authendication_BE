const router = require("express").Router();
const { User } = require("../models/user");

router.post("/user", async (req, res) => {
    try {
        const queryResult = await User.find({})
        console.log("email", queryResult[0]);
        console.log("name", queryResult[0].name);
        console.log("_id", queryResult[0]._id);


        if (queryResult) {
            const result = await User.deleteOne({ _id: queryResult[0]._id });
            console.log("result", result);
            if (result) {
                console.log("Deleted");
            }


            return res.status(200).json({ message: "deleted", data: result });
        }
    } catch (error) {
        console.error("Error deleting user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
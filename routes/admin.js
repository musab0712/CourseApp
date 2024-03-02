const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await Admin.create({ username, password });
  res.json({ message: "Admin Created Successfully!" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const discription = req.body.discription;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  const newCourse = await Course.create({
    title,
    discription,
    imageLink,
    price,
  });
  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});

module.exports = router;

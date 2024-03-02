const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  await User.create({
    username,
    password,
  });
  res.json({ msg: "User Created Successfully!" });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.json(courses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  await User.updateOne(
    { username: req.headers.username },
    {
      $push: {
        purchasedCourse: courseId,
      },
    }
  );
  res.json({ msg: "Purchased Course successfully!" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({ username: req.headers.username });
  console.log(user.purchasedCourse);
  const course = await Course.find({ _id: { $in: user.purchasedCourse } });
  res.json({ course: course });
});

module.exports = router;

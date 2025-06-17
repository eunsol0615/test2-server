
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: true
}));

// 로그인 처리
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync("users.json"));
  const found = users.find(u => u.username === username && u.password === password);
  if (found) {
    req.session.user = username;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// 로그인 상태 확인
app.get("/session", (req, res) => {
  res.json({ user: req.session.user || null });
});

app.listen(10000, () => {
  console.log("서버 실행 중");
});

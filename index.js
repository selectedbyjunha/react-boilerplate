const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const { User } = require('./models/User');
const config = require('./config/key');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * DB 연결하기
 */
//mongodb+srv://bluejunha:Dthn7Q9rPY1gNWev@boilerplate.0feloyk.mongodb.net/
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected..'))
  .catch((err) => console.log(err));

/**
 * npm body-parser 대신 express.js 에서 제공하는 parse를 사용한다.
 */
app.use(express.json()); // For JSON requests
app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded

// Router
app.get('/', (req, res) => {
  res.send('Hello World! hi');
});

// app.post('/register', (req, res) => {
//   // 회원가입할 때 필요한 정보들을 client에서 가져오면 DB에 저장한다.
//   const user = new User(req.body);
//   user.save((err, userInfo) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).json({ success: true });
//   });
// });

app.post('/register', async (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

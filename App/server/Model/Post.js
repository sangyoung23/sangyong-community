const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repleNum: {
      type: Number,
      default: 0,
    },
  }, // timestamps mongoDB에서 글의 업데이트 시간과 수정 시간을 생성해준다.
  { collection: "Posts", timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };

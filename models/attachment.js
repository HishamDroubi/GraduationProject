let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let attachmentSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
});

let Attachment = mongoose.model("Attachment", attachmentSchema, "attachments");
module.exports = Attachment;

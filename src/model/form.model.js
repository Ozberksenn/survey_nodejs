// form verileri veritabanına kaydetmek istenilirse burada model kullanılabilir.
const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  about: {
    type: String,
  },
});

const FormModel = mongoose.model("Form", formSchema);

module.export = FormModel;

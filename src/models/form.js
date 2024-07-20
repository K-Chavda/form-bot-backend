const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Form Schema
const formSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    views: {
      type: Number,
      default: 0,
    },
    start: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

// Form Fields Schema
const formFieldsSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    formFields: [
      {
        seq: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: ["bubble", "input"],
          required: true,
        },
        displayValue: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const FormField = mongoose.model("FormField", formFieldsSchema);

// User Response Schema
const userResponseSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    formFieldId: {
      type: Schema.Types.ObjectId,
      ref: "FormField",
      required: true,
    },
    formFieldsResponse: [
      {
        seq: {
          type: Number,
          required: true,
        },
        response: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

module.exports = { Form, FormField, UserResponse };

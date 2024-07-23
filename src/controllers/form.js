const { Form, FormField, UserResponse } = require("../models/form");
const { Folder } = require("../models/folder");

// Form Controller Methods
const getAllForms = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const { userId } = req.body;

    const forms = folderId
      ? await Form.find({ folderId: folderId })
      : await Form.find({ createdBy: userId });

    if (!forms || forms.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No forms found in this folder.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Forms fetched successfully.",
      forms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const getFormById = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findById({ _id: formId });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form fetched successfully.",
      form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const createForm = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const { userId, name, theme } = req.body;

    if (folderId) {
      const folder = await Folder.findById({ _id: folderId });

      if (!folder) {
        return res.status(200).json({
          success: false,
          message: "Folder not found.",
        });
      }
    }

    const isFormExists = await Form.find({
      name: name,
      createdBy: userId,
    });

    if (isFormExists.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Form with the same name already exists in this folder.",
      });
    }

    const form = new Form({
      name,
      theme,
      folderId,
      createdBy: userId,
    });

    await form.save();

    return res.status(201).json({
      success: true,
      message: "Form created successfully.",
      data: form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const updateFormDetails = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { name, theme } = req.body;

    if (!formId) {
      return res.status(400).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findById({ _id: formId });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    if (form.name === name && form.theme === theme) {
      return res.status(200).json({
        success: false,
        message: "No changes made to the form.",
      });
    }

    form.name = name;
    form.theme = theme;

    await form.save();

    return res.status(200).json({
      success: true,
      message: "Form name updated successfully.",
      form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const deleteForm = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findById({ _id: formId });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    await form.deleteOne({ _id: formId });

    return res.status(200).json({
      success: true,
      message: "Form deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const increaseFormView = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findByIdAndUpdate(
      { _id: formId },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form viewed count increased successfully.",
      form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const increaseStartCount = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findByIdAndUpdate(
      { _id: formId },
      { $inc: { start: 1 } },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form started count increased successfully.",
      form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// FormFields Controller Methods
const getAllFormFields = async (req, res, next) => {
  try {
    const { formId, formFieldId } = req.params;

    if (!formId || !formFieldId) {
      return res.status(400).json({
        success: false,
        message: "Form ID or form field ID is required.",
      });
    }

    const formField = await FormField.findById({ _id: formFieldId });

    if (!formField) {
      return res.status(404).json({
        success: false,
        message: "Form field not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form fields fetched successfully.",
      formFields: formField.formFields,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const createFormFields = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { userId, seq, type, displayValue } = req.body;

    if (!formId) {
      return res.status(400).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    let formField = await FormField.findOne({ formId });

    if (formField) {
      const existingField = formField.formFields.find(
        (field) => field.seq === seq && field.type === type
      );

      if (existingField) {
        return res.status(400).json({
          success: false,
          message:
            "A field with the same seq and type already exists for this form.",
        });
      }

      formField.formFields.push({
        seq,
        type,
        displayValue,
      });
    } else {
      formField = new FormField({
        formId,
        createdBy: userId,
        formFields: [
          {
            seq,
            type,
            displayValue,
          },
        ],
      });
    }

    await formField.save();

    return res.status(201).json({
      success: true,
      message: "Form field created successfully.",
      data: form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const updateFormFields = async (req, res, next) => {
  try {
    const { formId, formFieldId } = req.params;
    const { seq, type, displayValue } = req.body;

    if (!formId || !formFieldId) {
      return res.status(400).json({
        success: false,
        message: "Form ID and form field ID are required.",
      });
    }

    const form = await Form.findById({ _id: formId });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    const formField = await FormField.findById({ _id: formFieldId });

    if (!formField) {
      return res.status(404).json({
        success: false,
        message: "Form field not found.",
      });
    }

    formField.formFields.forEach((element) => {
      if (element.seq === seq) {
        element.type = type;
        element.displayValue = displayValue;
      }
    });

    await formField.save();

    return res.status(200).json({
      success: true,
      message: "Form field updated successfully.",
      formField,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const deleteFormField = async (req, res, next) => {
  try {
    const { formId, formFieldId, fieldId } = req.params;

    if (!formId || !formFieldId || !fieldId) {
      return res.status(400).json({
        success: false,
        message: "Form ID, form field ID and field ID are required.",
      });
    }

    const form = await Form.findById({ _id: formId });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    const formField = await FormField.findById({ _id: formFieldId });

    if (!formField) {
      return res.status(404).json({
        success: false,
        message: "Form field not found.",
      });
    }

    formField.formFields = formField.formFields.filter(
      (field) => field._id.toString() !== fieldId
    );

    await formField.save();

    return res.status(200).json({
      success: true,
      message: "Form field deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// User Response Controller Methods
const createUserResponse = async (req, res, next) => {
  try {
    const { formId, formFieldId } = req.params;
    const { response, seq, userId } = req.body;

    if (!response || !seq) {
      return res.status(400).json({
        success: false,
        message: "Seq and response are required.",
      });
    }

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found.",
      });
    }

    const formField = await FormField.findById(formFieldId);

    if (!formField) {
      return res.status(404).json({
        success: false,
        message: "Form field not found.",
      });
    }

    let userResponse = await UserResponse.findOne({ formId, formFieldId });

    if (userResponse) {
      const existingResponse = userResponse.formFieldsResponse.find(
        (field) => field.seq === seq
      );

      if (existingResponse) {
        return res.status(400).json({
          success: false,
          message:
            "A response with the same seq already exists for this form field.",
        });
      }

      userResponse.formFieldsResponse.push({ response, seq });
    } else {
      userResponse = new UserResponse({
        formId,
        formFieldId,
        formFieldsResponse: [{ response, seq }],
        createdBy: userId,
      });
    }

    await userResponse.save();

    return res.status(201).json({
      success: true,
      message: "User response created successfully.",
      userResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = {
  createForm,
  updateFormDetails,
  deleteForm,
  getAllForms,
  getFormById,
  increaseFormView,
  increaseStartCount,
  createFormFields,
  updateFormFields,
  deleteFormField,
  getAllFormFields,
  createUserResponse,
};

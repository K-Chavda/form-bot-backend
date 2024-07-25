const express = require("express");
const router = express.Router();
const formController = require("../controllers/form");
const verifyToken = require("../middlewares/verifyToken");

// Form Routes
router.get("/all/:folderId?", verifyToken, formController.getAllForms);
router.get("/single/:formId", verifyToken, formController.getFormById);
router.post("/:folderId?", verifyToken, formController.createForm);
router.put("/:formId", verifyToken, formController.updateFormDetails);
router.delete("/:formId", verifyToken, formController.deleteForm);
router.put("/:formId/view", verifyToken, formController.increaseFormView);
router.put("/:formId/start", verifyToken, formController.increaseStartCount);

// Form Fields
router.get("/:formId/formfields", verifyToken, formController.getAllFormFields);
router.post(
  "/:formId/formfields",
  verifyToken,
  formController.createFormFields
);
router.put(
  "/:formId/formfields/:formFieldId",
  verifyToken,
  formController.updateFormFields
);
router.delete(
  "/:formId/field/:fieldId",
  verifyToken,
  formController.deleteFormField
);

// User Responses
router.post(
  "/:formId/formfields/:formFieldId/userResponse",
  verifyToken,
  formController.createUserResponse
);

module.exports = router;

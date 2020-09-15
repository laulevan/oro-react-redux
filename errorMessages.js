// --------------------------------------------
// Constants are existed in both
// frontend and backend
// => So that please change message in both.
// --------------------------------------------
export const ACCOUNT_LOCKED =
  "Too many login attempts. This account has been locked. Please check your email";
export const API_KEY_EXPIRED = "Api key expired";
export const CAPTCHA_REQUIRED = "Captcha is required";
export const DOCUMENT_DOESNT_EXIST = "Document doesn't exist";
export const DOCUMENTS_DONT_EXIST = "Documents don't exist";
export const EMAIL_ALREADY_IN_USE = "E-mail is already in use";
export const EMAIL_ALREADY_VERIFIED = "E-mail is already verified";
export const INTERNAL_SERVER_ERROR = "Internal Server Error";
export const INVALID_AUTHORIZATION_HEADERS = "Invalid Authorization headers";
export const INVALID_CAPTCHA = "Captcha is invalid";
export const INVALID_EMAIL_ADDRESS = "Invalid e-mail address";
export const INVALID_REPORT_PARAMS =
  "The specified country does not have the requested subreport";
export const INVALID_USER_CREDENTIALS = "Invalid user credentials";
export const NO_ENCRYPTION_KEY = "No encryption key has been configured";
export const NO_REPORT = "The report doesnt exist";
export const PROFESSIONAL_EMAIL_WRONG = "E-mail is wrong";
export const SHORT_PASSWORD = "Password less than 8 characters";
export const SUBREPORT_NO_EXIST = "The requested sub report does not exist";
export const THIS_FIELD_IS_REQUIRED = "This field is required";
export const UNAUTHORIZED_ACTION = "Unauthorized action";
export const UNVERIFIED_EMAIL = "E-mail address has not been verified";
export const VOUCHER_ALREADY_REDEEMED = "Link has already been activated";
export const VOUCHER_DOES_NOT_EXIST = "Link does not exist";
export const VOUCHER_EXPIRED = "Link is expired";

// --------------------------------------------
// Constants only have in frontend
// --------------------------------------------
export const FILE_ERROR_MESSAGES = {
  CANNOT_DECRYPT_ZIPFILE: "Unable to open password protected zip file.",
  INVALID_ZIPFILE: "Not a valid zip file.",
  NO_VALID_FILE_IN_ZIPFILE: "No valid file found inside zip file.",
  CANNOT_DECRYPT_PDFFILE: "Unable to open password protected pdf file.",
  INVALID_PDFFILE: "Not a valid pdf file.",
  UNSUPPORTED_FORMAT_PDFFILE: "Pdf file is not in correct format.",
};
export const NEW_PASSWORD_GREATER_THAN_8_CHARACTERS =
  "New Password must be greater than 8 characters";
export const NEW_PASSWORD_IS_NOT_MATCH = "New passwords do not match!";
export const USER_DOES_NOT_EXIST = "User does not exist";
export const VALIDATION_ERROR = "ValidationError";
export const VOUCHER_TYPE_INVALID = "Link is invalid";

export default {
  ACCOUNT_LOCKED,
  API_KEY_EXPIRED,
  CAPTCHA_REQUIRED,
  DOCUMENT_DOESNT_EXIST,
  DOCUMENTS_DONT_EXIST,
  EMAIL_ALREADY_IN_USE,
  EMAIL_ALREADY_VERIFIED,
  INTERNAL_SERVER_ERROR,
  INVALID_AUTHORIZATION_HEADERS,
  INVALID_CAPTCHA,
  INVALID_EMAIL_ADDRESS,
  INVALID_REPORT_PARAMS,
  INVALID_USER_CREDENTIALS,
  NO_ENCRYPTION_KEY,
  NO_REPORT,
  PROFESSIONAL_EMAIL_WRONG,
  SHORT_PASSWORD,
  SUBREPORT_NO_EXIST,
  THIS_FIELD_IS_REQUIRED,
  UNAUTHORIZED_ACTION,
  UNVERIFIED_EMAIL,
  VOUCHER_ALREADY_REDEEMED,
  VOUCHER_DOES_NOT_EXIST,
  VOUCHER_EXPIRED,

  // Constants only have in frontend
  FILE_ERROR_MESSAGES,
  NEW_PASSWORD_GREATER_THAN_8_CHARACTERS,
  NEW_PASSWORD_IS_NOT_MATCH,
  USER_DOES_NOT_EXIST,
  VALIDATION_ERROR,
  VOUCHER_TYPE_INVALID,
};

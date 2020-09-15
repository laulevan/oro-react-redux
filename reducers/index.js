import { combineReducers } from "redux";
import appver from "./appver";
import authentication from "./authentication";
import encryptionKey from "./encryptionKey";
import files from "./files";
import newFiles from "./newFiles";
import passwordLastUpdated from "./passwordLastUpdated";
import reports from "./reports";
import snackbar from "./snackbar";
import spreadsheet from "./spreadsheet";
import statements from "./statements";
import userActions from "./userActions";
import users from "./users";

export default combineReducers({
  appver,
  authentication,
  encryptionKey,
  files,
  newFiles,
  passwordLastUpdated,
  reports,
  snackbar,
  spreadsheet,
  statements,
  userActions,
  users,
});

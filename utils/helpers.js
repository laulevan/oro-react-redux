import moment from "moment";
import { ISO_COUNTRIES } from "app/constants";

export function capitalize(str) {
  return str.replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase();
  });
}

// ===========================================
//
// Modules export
//
// ===========================================

export function _convertImageToBase64(image) {
  if (image) {
    return `data:image/jpeg;base64, ${new Buffer(image, "binary").toString(
      "base64",
    )}`;
  }
  return false;
}

export function _createEncryptionKey() {
  let id = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 20; i += 1) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return btoa(btoa(btoa(id))).slice(0, 30);
}

export function _formatDate(date) {
  if (!date) return "";
  return moment(date).format("D MMM YYYY");
}

// ex: 12345.178 => 12,235.19
export function _formatToLocaleString(number) {
  if (number) {
    const res = number.toString().split(".");
    if (res.length === 2) {
      return `${parseFloat(res[0]).toLocaleString()}.${res[1]}`;
    } else if (res.length === 1) {
      return parseFloat(res[0]).toLocaleString();
    }
  }
  return "0.00";
}

// ex: foo_bar => Foo Bar
// Required capitalize()
export function _formatToCapitalizeString(str) {
  if (str) {
    const newStr = str.replace(/_/g, " ");
    return capitalize(newStr);
  }
  return "";
}

export function _formatISOCountry(isoCode) {
  let countryName = "Unclassified";
  Object.keys(ISO_COUNTRIES).forEach(countryKey => {
    if (ISO_COUNTRIES[countryKey].iso === isoCode) {
      countryName = ISO_COUNTRIES[countryKey].name;
    }
  });
  return countryName;
}

export function _pushIfNotExist(array, item) {
  const arr = array;
  if (arr.indexOf(item) === -1) {
    arr.push(item);
  }
  return arr;
}

// ex: _roundUp(192.168, 10) => 192.2
export function _roundUp(num, precision) {
  return Math.ceil(num * precision) / precision;
}

export function _toggleItemInArray(array, item) {
  let arr = array;
  if (arr.indexOf(item) === -1) {
    arr.push(item);
  } else {
    arr = arr.filter(el => {
      return el !== item;
    });
  }
  return arr;
}

// ex: 24 Jan 2018 1 11 PM => 24_Jan_2018_1_11_PM
export function _replaceSpaceByUnderscore(str) {
  if (str) {
    return str.replace(/ /g, "_");
  }
  return "";
}

export default {
  _convertImageToBase64,
  _createEncryptionKey,
  _formatDate,
  _formatISOCountry,
  _formatToLocaleString,
  _formatToCapitalizeString,
  _pushIfNotExist,
  _replaceSpaceByUnderscore,
  _roundUp,
  _toggleItemInArray,
};

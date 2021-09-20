module.exports = (rawElement) => {
  let clearString = rawElement.replace(/(\r\n|\n|\r)/gm, "");
  clearString = clearString.replace("(ver mais)", "");
  clearString = clearString.trim();
  return clearString;
};

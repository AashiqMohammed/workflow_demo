const getServiceInitial = (value) => {
  value = value.split(" ");
  let temp = "";
  for (let i = 0; i < value.length; i++) {
    if (i < 2) {
      temp += value[i][0].toUpperCase();
    } else {
      break;
    }
  }
  return temp;
};

export { getServiceInitial };

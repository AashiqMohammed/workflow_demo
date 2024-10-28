import { selectServiceItems } from "../../config";
const findServices = (services) => {
  const result = selectServiceItems.filter((item) =>
    services.includes(item.value)
  );
  return result;
};

export { findServices };

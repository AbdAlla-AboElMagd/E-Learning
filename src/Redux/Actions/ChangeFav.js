export const AddFav = (payload) => {
  return {
    type: "AddFav",
    payload,
  };
};

export const DelFav = (payload) => {
  return {
    type: "DelFav",
    payload,
  };
};

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

export const Reset = () => {
  return {
    type: "Reset",
  };
};

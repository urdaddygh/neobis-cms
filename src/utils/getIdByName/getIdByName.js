
export const getIdByName = (arr, name) => {
    const obj = arr.find(dir => dir.name === name);
    return obj ? obj.id : null;
  };
type AnyObject = { [key: string]: any }

export const isEmptyObject = (obj: AnyObject = {}) => {
  for (let i in obj) {
    return false;
  }

  return true;
};

export const isEqualObject = (a: AnyObject, b: AnyObject) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

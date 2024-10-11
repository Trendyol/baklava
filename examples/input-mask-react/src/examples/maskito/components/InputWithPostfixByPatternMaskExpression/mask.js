export default {
  mask: ({ value }) => {
    const digitsMask = Array.from(value.replaceAll('%', '')).map(() => /\d/);

    if (!digitsMask.length) {
      return [/\d/];
    }

    return [...digitsMask, '%'];
  },
};

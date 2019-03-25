export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const apiCall = async () => {
  await sleep(2000);
  return "I am the response";
};

const getFirstUrlSection = (url) => {
  return url.replace(/^\/([^/]*).*$/, '$1');
};

export default getFirstUrlSection;

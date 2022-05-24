const { ObjectId } = require("mongodb");

module.exports = (search, id) => {
  // Verifying if it's a object Id or a URL
  id = String(id);
  try {
    const objId = new ObjectId(id);
    if (String(objId) === id) {
      search._id = objId;
    } else {
      search.title = id;
    }
  } catch (err) {
    search.title = id;
  }
  return search;
};

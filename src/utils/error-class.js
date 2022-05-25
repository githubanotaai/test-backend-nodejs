function Error(text, status, name) {
  this.message = text || "Erro interno na API";
  this.status = status || 500;
  this.name = name ? name : "Exception";
  return this;
}

module.exports = Error;

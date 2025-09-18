app.get("/search", (req, res) => {
  const query = req.query.query;
  res.send(`Resultados de búsqueda para: ${query}`);
});
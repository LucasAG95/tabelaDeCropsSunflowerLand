//full chat GPT com Felga, nao sei bem oque faz, só sei que importa api sem dar problema de cors

module.exports = async (req, res) => {
  const { url } = req.query;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (!url) {
    res.status(400).json({ error: "Parâmetro 'url' não informado" });
    return;
  }

  try {
    const upstreamRes = await fetch(url);

    // Repassa status e body da resposta original
    const contentType = upstreamRes.headers.get("content-type");
    res.setHeader("Content-Type", contentType || "application/json");

    const body = await upstreamRes.text(); // pega como texto para não limitar a JSON
    res.status(upstreamRes.status).send(body);
  } catch (err) {
    res.status(502).json({ error: "Erro ao chamar API upstream", details: err.message });
  }
};

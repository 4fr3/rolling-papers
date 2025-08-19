// Cargar entradas recientes
async function cargarEntradasRecientes(offset = 0, limit = 5) {
  const { data, error } = await supabase
    .from("entries")
    .select(`
      id,
      title,
      content,
      points,
      created_at,
      profiles(username)
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error cargando entradas recientes:", error);
    return [];
  }
  return data;
}

// Cargar entradas mejor valoradas
async function cargarEntradasTop(offset = 0, limit = 5) {
  const { data, error } = await supabase
    .from("entries")
    .select(`
      id,
      title,
      content,
      points,
      created_at,
      profiles(username)
    `)
    .order("points", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error cargando entradas top:", error);
    return [];
  }
  return data;
}

// main.js

// Inicializar Supabase
const SUPABASE_URL = "https://xooosccvdmnuzctgzjta.supabase.co"; // 🔹 reemplazar con tu URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvb29zY2N2ZG1udXpjdGd6anRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NzQwNjIsImV4cCI6MjA3MTE1MDA2Mn0.HLqBrW71UcAkjmJj9d8vDI04Je05oBeX05u-QbWjd6c"; // 🔹 reemplazar con tu key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Renderizar entradas en un <ul>
function renderEntries(entries, containerId) {
  const list = document.getElementById(containerId);
  list.innerHTML = "";

  if (!entries || entries.length === 0) {
    list.innerHTML = "<li>No hay entradas aún.</li>";
    return;
  }

  entries.forEach(entry => {
    const li = document.createElement("li");
    li.className = "entry-card";
    li.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.content}</p>
      <small>
        Autor: ${entry.profiles?.username || "Anónimo"} |
        Puntos: ${entry.points ?? 0} |
        Fecha: ${new Date(entry.created_at).toLocaleString()}
      </small>
    `;
    list.appendChild(li);
  });
}

// Cargar últimas entradas
async function loadRecentEntries() {
  const { data, error } = await supabase
    .from("entries")
    .select("id, title, content, points, created_at, profiles(username)")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error cargando recientes:", error.message);
    return;
  }

  renderEntries(data, "recent-entries");
}

// Cargar top entradas
async function loadTopEntries() {
  const { data, error } = await supabase
    .from("entries")
    .select("id, title, content, points, created_at, profiles(username)")
    .order("points", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error cargando top:", error.message);
    return;
  }

  renderEntries(data, "top-entries");
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  loadRecentEntries();
  loadTopEntries();
});

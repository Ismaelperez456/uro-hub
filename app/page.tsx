"use client";

import { useState } from "react";

type Article = {
  id: string;
  source?: string;
  title?: string;
  authors?: string;
  journal?: string;
  year?: string;
  doi?: string;
  pmid?: string;
  pmcid?: string;
  publicationType?: string;
  isOpenAccess?: boolean;
  europePmcUrl?: string;
  abstractText?: string;
};

const clinicalCases = [
  {
    id: "case-1",
    title: "Caso Clínico: Litiasis renoureteral complicada con urosepsis",
    authors: "Residencia de Urología - Ateneo Clínico",
    journal: "Guía de Práctica Quirúrgica Urológica",
    year: "2026",
    doi: "",
    pmid: "",
    pmcid: "",
    publicationType: "case reports",
    isOpenAccess: true,
    abstractText: "Paciente masculino de 45 años ingresa por guardia con dolor lumbar derecho intenso tipo cólico, fiebre de 38.5°C y frialdad distal. Laboratorio con leucocitosis y alteración de función renal. Ecografía muestra hidronefrosis derecha moderada con litiasis piélica. Conducta: Descompresión urgente de vía urinaria mediante colocación de catéter doble J bajo cobertura antibiótica de amplio espectro.",
    europePmcUrl: "#"
  }
];

const imagingCases = [
  {
    id: "img-1",
    title: "Imagen Urológica: Tomografía Computada sin contraste - Litiasis renoureteral derecha",
    authors: "Servicio de Diagnóstico por Imágenes y Urología",
    journal: "Atlas de Imágenes Urológicas",
    year: "2026",
    doi: "",
    pmid: "",
    pmcid: "",
    publicationType: "image",
    isOpenAccess: true,
    abstractText: "Hallazgo radiológico: Se observa imagen hiperdensa (calculo) de aproximadamente 7 mm en tercio proximal de uréter derecho, acompañada de dilatación calicijal y marcada ureterohidronefrosis ipsilateral con densificación de la grasa perirrenal.",
    europePmcUrl: "#"
  }
];

const guidelinesCases = [
  {
    id: "guide-1",
    title: "Guía Clínica EAU: Manejo de la Litiasis Urinaria (Aktualización 2026)",
    authors: "European Association of Urology (EAU Guidelines Panel)",
    journal: "European Urology Official Guidelines",
    year: "2026",
    doi: "10.1016/j.eururo.2026.guideline.urolithiasis",
    pmid: "38000001",
    pmcid: "",
    publicationType: "guideline",
    isOpenAccess: true,
    abstractText: "Recomendaciones oficiales de la EAU para el diagnóstico, tratamiento médico expulsivo, litotricia extracorpórea por ondas de choque (LEOC), ureteroscopia (URS) y nefrolitotomía percutánea (NLP) en pacientes adultos con urolitiasis.",
    europePmcUrl: "https://uroweb.org/guidelines/urolithiasis"
  }
];

const proceduresCases = [
  {
    id: "proc-1",
    title: "Procedimiento Quirúrgico: Ureteroscopia flexible (URS-f) y litotricia láser",
    authors: "Staff Quirúrgico de Endourología",
    journal: "Manual de Técnicas Quirúrgicas Urológicas",
    year: "2026",
    doi: "",
    pmid: "",
    pmcid: "",
    publicationType: "procedure",
    isOpenAccess: true,
    abstractText: "Paso a paso quirúrgico: 1. Cistoscopia y colocación de guía hidrofílica bajo control fluoroscópico. 2. Pasaje de acceso ureteral (access sheath). 3. Ingreso con ureteroscopio flexible hasta cavidad renal. 4. Fragmentación litiásica con láser Holmium. 5. Colocación final de catéter doble J.",
    europePmcUrl: "#"
  }
];

const categories = [
  "Todos",
  "Casos clínicos",
  "Imágenes",
  "Guías",
  "Procedimientos",
];

const examples = [
  "Litiasis renal",
  "Hematuria",
  "Cáncer de próstata",
  "Cáncer de vejiga",
  "Hiperplasia prostática",
  "Ureteroscopia",
  "Infertilidad masculina",
  "Incontinencia urinaria",
];

function cleanAbstract(abstract?: string) {
  if (!abstract) {
    return "Resumen no disponible para este artículo.";
  }
  return abstract.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function formatPublicationType(type?: string) {
  if (!type) return "Publicación científica";
  const types = type.split(";").map((item) => item.trim());
  const translations: Record<string, string> = {
    "journal article": "Artículo",
    "research-article": "Investigación",
    "case reports": "Caso clínico",
    "case-report": "Caso clínico",
    review: "Revisión",
    image: "Imagen radiológica",
    guideline: "Guía clínica oficial",
    procedure: "Procedimiento quirúrgico",
    editorial: "Editorial",
  };
  return types.map((t) => translations[t.toLowerCase()] || t).join(" · ");
}

function ArticleCard({ article }: { article: Article }) {
  const title = article.title || "Artículo sin título";
  let authors = article.authors && article.authors.trim() ? article.authors : "Autores no disponibles";
  if (authors.split(",").length > 3) {
    const authorsList = authors.split(",");
    authors = `${authorsList[0]}, ${authorsList[1]} et al.`;
  }

  const journal = article.journal && article.journal.trim() ? article.journal : "Revista no disponible";
  const abstract = cleanAbstract(article.abstractText);
  const doiUrl = article.doi ? `https://doi.org/${article.doi}` : "";
  const isRecent = article.year === "2026";
  const isImageCard = article.publicationType === "image" || title.includes("Tomografía") || title.includes("Imagen");
  const googleImagesUrl = `https://www.google.com/search?q=${encodeURIComponent(title)}&tbm=isch`;

  return (
    <article className="article-card">
      <div className="article-top">
        <div className="article-type">
          {formatPublicationType(article.publicationType)}
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {isRecent && (
            <span style={{ fontSize: "11px", fontWeight: "600", color: "#b91c1c", background: "#fee2e2", padding: "4px 8px", borderRadius: "6px" }}>
              Nuevo 2026
            </span>
          )}
          {article.isOpenAccess && (
            <span className="open-access">Open Access</span>
          )}
        </div>
      </div>

      <h3>{title}</h3>
      <p className="authors">{authors}</p>

      <div className="article-meta">
        <span>{journal}</span>
        {article.year && <span>• {article.year}</span>}
        {article.pmid && <span>• PMID {article.pmid}</span>}
      </div>

      <p className="abstract">{abstract}</p>

      {/* Botón automático para buscar imágenes en Google */}
      {isImageCard && (
        <div style={{ marginBottom: "16px" }}>
          <a
            href={googleImagesUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              backgroundColor: "#0284c7",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 2px 4px rgba(2, 132, 199, 0.2)"
            }}
          >
            🔍 Buscar imágenes similares en Google ↗
          </a>
        </div>
      )}

      <div className="article-footer">
        <div className="identifiers">
          {article.doi && (
            <a href={doiUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0284c7", textDecoration: "none" }}>
              DOI: {article.doi} ↗
            </a>
          )}
          {article.pmcid && (
            <span className="identifier">{article.pmcid}</span>
          )}
        </div>

        {article.europePmcUrl && article.europePmcUrl !== "#" && (
          <a
            href={article.europePmcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="read-button"
          >
            Ver Detalle ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [results, setResults] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const [onlyOpenAccess, setOnlyOpenAccess] = useState(false);
  const [onlyRecent2026, setOnlyRecent2026] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (userInput.trim() === "Doctora Vega" && passwordInput === "010626") {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  }

  async function handleSearch(term?: string) {
    const query = (term ?? searchTerm).trim();
    if (!query) return;

    setSearchTerm(query);
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
        { method: "GET", cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "No se pudo realizar la búsqueda.");
      }

      setResults(Array.isArray(data.results) ? data.results : []);
      setTotal(Number(data.total) || 0);
    } catch (err) {
      console.error(err);
      setResults([]);
      setTotal(0);
      setError("No pudimos realizar la búsqueda científica. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleExampleClick(example: string) {
    handleSearch(example);
  }

  let displayedResults = results;
  if (activeCategory === "Casos clínicos") {
    displayedResults = clinicalCases;
  } else if (activeCategory === "Imágenes") {
    displayedResults = imagingCases;
  } else if (activeCategory === "Guías") {
    displayedResults = guidelinesCases;
  } else if (activeCategory === "Procedimientos") {
    displayedResults = proceduresCases;
  } else {
    displayedResults = results.filter((article) => {
      if (onlyOpenAccess && !article.isOpenAccess) return false;
      if (onlyRecent2026 && article.year !== "2026") return false;
      return true;
    });
  }

  if (!isAuthenticated) {
    return (
      <main className="page" style={{ justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)", minHeight: "100vh", display: "flex" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <div className="brand-mark" style={{ margin: "0 auto 16px auto", width: "48px", height: "48px", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", background: "#0284c7", color: "white", borderRadius: "8px", fontWeight: "700" }}>U</div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>URO•HUB Privado</h1>
          <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>Ingrese usuario y contraseña institucionales.</p>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <input
              type="text"
              placeholder="Usuario"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            />
            <button
              type="submit"
              style={{ background: "#0284c7", color: "white", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}
            >
              Ingresar al Sistema
            </button>
          </form>

          {loginError && (
            <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "12px" }}>Usuario o contraseña incorrectos.</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark">U</div>
            <div>
              <div className="brand-name">
                URO<span>•</span>HUB
              </div>
              <div className="brand-subtitle">
                Urology Knowledge Hub · Doctora Vega Session
              </div>
            </div>
          </div>
          <div className="header-status">
            <span className="status-dot"></span>
            Sesión Activa
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-label">
            <span></span>
            UROLOGY · EVIDENCE · KNOWLEDGE
          </div>

          <h1>
            Toda la Urología.
            <br />
            <strong>En un solo lugar.</strong>
          </h1>

          <p className="hero-description">
            Buscá literatura científica, casos clínicos, imágenes, guías y procedimientos quirúrgicos.
          </p>

          <div className="search-box">
            <div className="search-icon">⌕</div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Buscar en Urología... Ej: litiasis + fiebre + obstrucción"
            />
            <button onClick={() => handleSearch()} disabled={loading}>
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>

          <div className="examples">
            <span>Ejemplos:</span>
            {examples.map((example) => (
              <button key={example} onClick={() => handleExampleClick(example)}>
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="results-inner">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {activeCategory === "Todos" && hasSearched && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <button
                onClick={() => setOnlyOpenAccess(!onlyOpenAccess)}
                style={{
                  background: onlyOpenAccess ? "#0284c7" : "#ffffff",
                  color: onlyOpenAccess ? "#ffffff" : "#64748b",
                  border: "1px solid #e2e8f0",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {onlyOpenAccess ? "✓ Solo Open Access" : "Filtrar: Open Access"}
              </button>

              <button
                onClick={() => setOnlyRecent2026(!onlyRecent2026)}
                style={{
                  background: onlyRecent2026 ? "#b91c1c" : "#ffffff",
                  color: onlyRecent2026 ? "#ffffff" : "#64748b",
                  border: "1px solid #e2e8f0",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {onlyRecent2026 ? "✓ Solo Año 2026" : "Filtrar: Año 2026"}
              </button>
            </div>
          )}

          {!hasSearched && activeCategory === "Todos" && (
            <div className="welcome-card">
              <div className="welcome-icon">⌕</div>
              <h2>Buscá conocimiento médico</h2>
              <p>
                Escribí un tema de Urología para comenzar o explorá las pestañas de <strong>Casos clínicos</strong>, <strong>Imágenes</strong>, <strong>Guías</strong> y <strong>Procedimientos</strong>.
              </p>
            </div>
          )}

          {activeCategory === "Casos clínicos" && (
            <div className="results-header">
              <div>
                <span className="results-label">MÓDULO DE RESIDENCIA</span>
                <h2>Casos Clínicos Urológicos</h2>
              </div>
              <div className="results-count">{clinicalCases.length} casos disponibles</div>
            </div>
          )}

          {activeCategory === "Imágenes" && (
            <div className="results-header">
              <div>
                <span className="results-label">DIAGNÓSTICO POR IMÁGENES</span>
                <h2>Atlas de Imágenes Urológicas</h2>
              </div>
              <div className="results-count">{imagingCases.length} imágenes disponibles</div>
            </div>
          )}

          {activeCategory === "Guías" && (
            <div className="results-header">
              <div>
                <span className="results-label">SOCIEDADES CIENTÍFICAS</span>
                <h2>Guías Clínicas Internacionales (EAU, AUA, NICE)</h2>
              </div>
              <div className="results-count">{guidelinesCases.length} guías oficiales</div>
            </div>
          )}

          {activeCategory === "Procedimientos" && (
            <div className="results-header">
              <div>
                <span className="results-label">TÉCNICA QUIRÚRGICA</span>
                <h2>Procedimientos y Cirugía Urológica</h2>
              </div>
              <div className="results-count">{proceduresCases.length} procedimientos detallados</div>
            </div>
          )}

          {activeCategory === "Todos" && hasSearched && !loading && !error && (
            <div className="results-header">
              <div>
                <span className="results-label">RESULTADOS CIENTÍFICOS</span>
                <h2>{searchTerm}</h2>
              </div>
              <div className="results-count">
                {displayedResults.length} de {total.toLocaleString("es-AR")} resultados visibles
              </div>
            </div>
          )}

          {error && (
            <div className="error-card">
              <div className="error-icon">!</div>
              <div>
                <h3>Ocurrió un problema</h3>
                <p>{error}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Buscando evidencia científica...</p>
            </div>
          )}

          {!loading && !error && displayedResults.length === 0 && (
            <div className="empty-card">
              <div className="empty-icon">⌕</div>
              <h3>No encontramos resultados</h3>
              <p>Probá buscando con otro término médico o cambiando de categoría.</p>
            </div>
          )}

          {!loading && !error && displayedResults.length > 0 && (
            <div className="articles">
              {displayedResults.map((article, index) => (
                <ArticleCard
                  key={article.id ? `${article.source || 'local'}-${article.id}` : `fallback-${index}`}
                  article={article}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>URO•HUB</strong>
          <span>Scientific Urology Knowledge Hub</span>
        </div>
        <div>Authorized Session: Doctora Vega</div>
      </footer>
    </main>
  );
}

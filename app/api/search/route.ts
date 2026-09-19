import { NextResponse } from "next/server";

// Diccionario bilingüe y de guías de sociedades científicas (EAU, AUA, NICE)
const urologyTranslations: Record<string, string> = {
  "litiasis renal": "renal calculi OR nephrolithiasis OR kidney stones OR EAU guidelines on urolithiasis",
  "litiasis": "urolithiasis OR nephrolithiasis OR EAU guidelines",
  "cáncer de próstata": "prostate cancer OR prostatic neoplasms OR EAU guidelines on prostate cancer OR AUA guideline",
  "cancer de prostata": "prostate cancer OR prostatic neoplasms OR EAU guidelines",
  "cáncer de vejiga": "bladder cancer OR urinary bladder neoplasms OR EAU guidelines on non-muscle-invasive bladder cancer",
  "cancer de vejiga": "bladder cancer OR urinary bladder neoplasms",
  "hiperplasia prostática": "benign prostatic hyperplasia OR BPH OR EAU guidelines on management of non-neurogenic male LUTS",
  "hiperplasia prostatica": "benign prostatic hyperplasia OR BPH",
  "ureteroscopia": "ureteroscopy OR URS OR EAU guidelines",
  "hematuria": "hematuria OR NICE guidelines hematuria",
  "incontinencia urinaria": "urinary incontinence OR EAU guidelines on urinary incontinence",
  "infertilidad masculina": "male infertility OR EAU guidelines",
  "torsión testicular": "testicular torsion",
  "infección urinaria": "urinary tract infection OR UTI OR EAU guidelines on urological infections",
  "infeccion urinaria": "urinary tract infection OR UTI"
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get("q")?.trim() || "";

    if (!rawQuery) {
      return NextResponse.json(
        { error: "Falta el término de búsqueda." },
        { status: 400 }
      );
    }

    const lowerQuery = rawQuery.toLowerCase();
    let expandedQuery = rawQuery;

    // Si el término está en nuestro diccionario clínico, expandimos para incluir PubMed/PMC y Guías (EAU, AUA, NICE)
    if (urologyTranslations[lowerQuery]) {
      expandedQuery = `(${rawQuery}) OR (${urologyTranslations[lowerQuery]})`;
    } else {
      // Búsqueda general enriquecida con fuentes institucionales globales
      expandedQuery = `(${rawQuery}) AND (urology OR urological OR EAU OR AUA)`;
    }

    const url = new URL(
      "https://www.ebi.ac.uk/europepmc/webservices/rest/search"
    );

    url.searchParams.set("query", expandedQuery);
    url.searchParams.set("format", "json");
    url.searchParams.set("pageSize", "20");
    url.searchParams.set("resultType", "core");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Europe PMC / PubMed respondió con HTTP ${response.status}`
      );
    }

    const data = await response.json();
    const articles = data?.resultList?.result ?? [];

    const results = Array.isArray(articles)
      ? articles.map((article: any) => {
          const pmid = article.pmid ?? article.id ?? "";
          let europePmcUrl = "";

          if (article.source === "MED" && pmid) {
            europePmcUrl = `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
          } else if (article.source && article.id) {
            europePmcUrl = `https://europepmc.org/article/${article.source}/${article.id}`;
          }

          return {
            id: article.id ?? "",
            source: article.source ?? "",
            title: article.title ?? "Sin título",
            authors: article.authorString ?? "Autores no disponibles",
            journal: article.journalTitle ?? "Revista / Guía institucional no disponible",
            year: article.pubYear ?? "",
            doi: article.doi ?? "",
            pmid,
            pmcid: article.pmcid ?? "",
            publicationType: article.pubType ?? "",
            isOpenAccess: article.isOpenAccess === "Y",
            abstractText: article.abstractText ?? "",
            europePmcUrl,
          };
        })
      : [];

    return NextResponse.json({
      query: rawQuery,
      total: data?.hitCount ?? results.length,
      results,
    });
  } catch (error) {
    console.error("URO-HUB SEARCH ERROR:", error);

    return NextResponse.json(
      { error: "No se pudo realizar la búsqueda científica y de guías." },
      { status: 500 }
    );
  }
}
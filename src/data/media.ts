import assets from "./assets.json";
export const photo = (name: string) =>
  name === "ari-fictional-photographer"
    ? {
        name,
        id: "original-generated-ari",
        alt: "Original generated editorial portrait of Ari, the fictional photographer, holding an unbranded camera",
        src: "/images/ari-fictional-photographer.webp",
        width: 1024,
        height: 1536,
        source: "",
        license: "Original generated asset",
      }
    : (assets.find((a) => a.name === name) ?? assets[0]);

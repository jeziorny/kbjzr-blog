import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: null, // Wprowadzimy później, jeśli będzie potrzebne
  token: null, // Wprowadzimy później, jeśli będzie potrzebne
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets/images", // Katalog dla obrazków wewnątrz /public
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posty",
        path: "public/posts", // Poprawna ścieżka do postów
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tytuł",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (fragment URL)",
            required: false, // Opcjonalne, jeśli nie ma, Tina użyje nazwy pliku
          },
          {
            type: "datetime",
            name: "date",
            label: "Data publikacji",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Zajawka",
            ui: {
              component: "textarea", // Użyj większego pola tekstowego
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tagi",
            list: true, // To pole jest listą tagów
          },
          {
            type: "boolean",
            name: "featured",
            label: "Wyróżniony post",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Treść posta",
            isBody: true,
          },
        ],
      },
    ],
  },
  client: {
    reference: {
      apiUrl: 'http://localhost:4001/graphql',
    },
  },
});
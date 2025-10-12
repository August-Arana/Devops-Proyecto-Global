export default {
  testEnvironment: "node",
  transform: {}, // Desactiva Babel; usamos soporte ESM nativo
  moduleFileExtensions: ["js", "json"],
  roots: ["<rootDir>/src/tests"],
};
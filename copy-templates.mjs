import fs from "fs-extra";

const src = "src/templates";
const dest = "dist/templates";

try {
  await fs.copy(src, dest);
  console.log("✅ Templates copied successfully!");
} catch (err) {
  console.error("❌ Failed to copy templates:", err);
  process.exit(1);
}

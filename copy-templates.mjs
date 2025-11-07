import fs from "fs-extra";

const src = "src/templates";
const dest = "dist/templates";

try {
  await fs.copy(src, dest);
} catch (err) {
  process.exit(1);
}

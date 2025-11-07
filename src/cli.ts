#!/usr/bin/env node
import { program } from "commander"
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"
import inquirer from "inquirer"
import ejs from "ejs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const templatesDir = path.join(__dirname, "templates")

program
    .name("inertia-kit")
    .description("🧩 @polash/inertia-kit — Scaffold shadcn-vue components for Inertia + Vue projects")
    .version("1.0.0")

// 1️⃣ Show available templates
program
    .command("list")
    .description("List all available component templates")
    .action(async () => {
        const indexPath = path.join(templatesDir, "index.json")
        if (!(await fs.pathExists(indexPath))) {
            console.log(chalk.red("❌ No templates found"))
            return
        }

        const index = await fs.readJson(indexPath)
        console.log(chalk.green("✨ Available Components:"))
        for (const [key, val] of Object.entries(index)) {
            console.log(chalk.cyan(` - ${key}`), "-", val)
        }
    })

// 2️⃣ Add a component
program
    .command("add <component>")
    .option("-d, --dest <dest>", "Destination folder", "resources/js/Components/ui")
    .option("-o, --overwrite", "Overwrite if exists", false)
    .description("Add a Vue UI component to your Inertia project")
    .action(async (component: string, options) => {
        const src = path.join(templatesDir, component)
        if (!(await fs.pathExists(src))) {
            console.log(chalk.red(`❌ Component "${component}" not found.`))
            return
        }

        const answers = await inquirer.prompt([
            { name: "name", message: "Component instance name:", default: component },
        ])

        const destBase = path.join(process.cwd(), options.dest)
        const dest = path.join(destBase, answers.name)

        if (await fs.pathExists(dest) && !options.overwrite) {
            const { confirm } = await inquirer.prompt([
                { type: "confirm", name: "confirm", message: `${dest} exists. Overwrite?`, default: false },
            ])
            if (!confirm) {
                console.log(chalk.gray("🛑 Operation cancelled."))
                return
            }
        }

        await fs.ensureDir(dest)

        async function copyWithEJS(srcDir: string, destDir: string) {
            const files = await fs.readdir(srcDir)
            for (const file of files) {
                const srcPath = path.join(srcDir, file)
                const destPath = path.join(destDir, file)
                const stat = await fs.stat(srcPath)
                if (stat.isDirectory()) {
                    await copyWithEJS(srcPath, destPath)
                } else {
                    const raw = await fs.readFile(srcPath, "utf8")
                    const rendered = ejs.render(raw, answers)
                    await fs.writeFile(destPath, rendered, "utf8")
                }
            }
        }

        await copyWithEJS(src, dest)
        console.log(chalk.green(`✅ Added "${component}" → ${path.relative(process.cwd(), dest)}`))
    })

program.parse(process.argv)

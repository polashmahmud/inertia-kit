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

// Show available templates
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

// Add a component
program
    .command("add <component>")
    .option("-d, --dest <dest>", "Destination folder", "resources/js/Components/ui-kit")
    .option("-o, --overwrite", "Overwrite if exists", false)
    .description("Add a Vue UI component to your Inertia project")
    .action(async (component: string, options) => {
        // Check if it's a single file (e.g., Input.vue) or a folder
        const srcFile = path.join(templatesDir, `${component}.vue`)
        const srcDir = path.join(templatesDir, component)

        let isFile = false
        let src = ""

        if (await fs.pathExists(srcFile)) {
            // It's a single .vue file
            isFile = true
            src = srcFile
        } else if (await fs.pathExists(srcDir)) {
            // It's a folder
            isFile = false
            src = srcDir
        } else {
            console.log(chalk.red(`❌ Component "${component}" not found.`))
            return
        }

        const answers = await inquirer.prompt([
            { name: "name", message: "Component instance name:", default: component },
        ])

        const destBase = path.join(process.cwd(), options.dest)

        if (isFile) {
            // Single file: save as ComponentName.vue
            const destFile = path.join(destBase, `${answers.name}.vue`)

            if (await fs.pathExists(destFile) && !options.overwrite) {
                const { confirm } = await inquirer.prompt([
                    { type: "confirm", name: "confirm", message: `${destFile} exists. Overwrite?`, default: false },
                ])
                if (!confirm) {
                    console.log(chalk.gray("🛑 Operation cancelled."))
                    return
                }
            }

            await fs.ensureDir(destBase)
            const raw = await fs.readFile(src, "utf8")
            const rendered = ejs.render(raw, answers)
            await fs.writeFile(destFile, rendered, "utf8")
            console.log(chalk.green(`✅ Added "${component}" → ${path.relative(process.cwd(), destFile)}`))
        } else {
            // Folder: copy all files inside
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
        }
    })

program.parse(process.argv)

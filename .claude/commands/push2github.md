Push the project to GitHub safely, update the README, and update the repository About section.

Commit message (optional): $ARGUMENTS

---

## Step 1 — Security scan (MUST pass before anything is pushed)

Search all project files for secrets and sensitive data. Immediately STOP and warn the user if any of the following are found — do NOT proceed with the push:

- Hardcoded API keys or tokens (patterns: `sk-`, `ghp_`, `gho_`, `AKIA`, `Bearer `, `token:`)
- Passwords or secrets assigned to variables (e.g. `password =`, `secret =`, `api_key =`)
- Private key blocks (`-----BEGIN ... PRIVATE KEY-----`)
- `.env` files tracked by git (`git ls-files | grep .env`)
- Any file containing a real email address used as a credential (not a public contact email)

Use Grep to scan all `.html`, `.js`, `.css`, `.json`, `.md` files. If the scan is clean, proceed to Step 2.

Also verify `.gitignore` exists and includes `.env` and any secret files. If `.gitignore` is missing, create one with sensible defaults before pushing.

---

## Step 2 — Update README.md

Read the current state of `index.html`, `styles.css`, and `script.js`, then rewrite `README.md` to accurately reflect the project. The README must include:

1. **Project name and one-line description**
2. **Live site link** — `https://josiewee.github.io/Redbeacon`
3. **Features list** — based on what is actually in the current code
4. **Tech stack table** — HTML5, CSS3, Vanilla JS, FormSubmit.co, and the actual Google Fonts in use
5. **Project structure** — list actual files in the repo
6. **Colour palette** — read CSS variables from `:root` in `styles.css` and document the actual hex values
7. **Customisation guide** — how to update stats, form email, social links
8. **FormSubmit activation note**
9. **Local development** — how to open and preview locally

Write the updated README to `README.md`.

---

## Step 3 — Commit and push to GitHub

Use the Git executable at `$env:LOCALAPPDATA\Programs\Git\cmd\git.exe`. The working directory is `c:\Users\josephine\OneDrive - Red Beacon\Desktop\AssetManagement`.

Run these steps in sequence:

```powershell
$git = "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
Set-Location "c:\Users\josephine\OneDrive - Red Beacon\Desktop\AssetManagement"
& $git add .
```

Use the commit message from `$ARGUMENTS` if provided. If no argument was given, generate a concise, descriptive commit message based on what files changed (read `git status` output first).

```powershell
& $git commit -m "<message>"
& $git push
```

Report the final output. If the push fails due to authentication, tell the user to re-run after checking their GitHub credentials.

---

## Step 4 — Update GitHub repository About

The repo is `josiewee/Redbeacon`. Update the About section using the GitHub REST API:

- **Description:** derive a one-line description from the current README
- **Website:** `https://josiewee.github.io/Redbeacon`
- **Topics:** suggest relevant topics (e.g. `asset-management`, `html`, `css`, `javascript`, `one-page`)

Check for a GitHub Personal Access Token in this order:
1. Environment variable `GITHUB_TOKEN`
2. File `.github_token` in the project root (must be in `.gitignore` — verify this before reading)

If a token is found, call the API using PowerShell:

```powershell
$headers = @{ Authorization = "token $token"; "User-Agent" = "claude-code" }
$body = @{ description = "<description>"; homepage = "https://josiewee.github.io/Redbeacon" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://api.github.com/repos/josiewee/Redbeacon" -Method Patch -Headers $headers -Body $body -ContentType "application/json"
```

If NO token is found, skip the API call and print this message to the user:

> **To enable automatic repo About updates:** create a GitHub Personal Access Token with `repo` scope at github.com/settings/tokens, then either set it as the environment variable `GITHUB_TOKEN` or save it to a file named `.github_token` in the project root (it is already gitignored by this command).

---

## Step 5 — Summary report

Print a brief summary:
- ✓ Security scan passed (or list any warnings)
- ✓ README updated
- ✓ Pushed to GitHub — commit hash and message
- ✓ / ⚠ Repo About updated (or token missing)
- Live URL: https://josiewee.github.io/Redbeacon

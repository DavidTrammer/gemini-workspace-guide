# Google Gemini in Google Workspace Guide (`stapp-gemini-workspace-guide`)

> A comprehensive field guide and interactive prompt generator for leveraging **Google Gemini** across Google Workspace (Sheets, Gmail, NotebookLM, Docs, Slides, Meet, Drive, and Vids).

## 🚀 Live Demo & Infrastructure

- **Live URL**: [https://jolly-tree-071619e03.1.azurestaticapps.net](https://jolly-tree-071619e03.1.azurestaticapps.net)
- **Azure Resource Group**: `gemini-workspace-guide-rg` (West Europe)
- **Azure Static Web App**: `stapp-gemini-workspace-guide` (SKU: Free)
- **GitHub Repository**: [DavidTrammer/gemini-workspace-guide](https://github.com/DavidTrammer/gemini-workspace-guide)

## 🌟 Features

- **Interactive Prompt Generator**: Generate role-specific prompts tailored for the Gemini side panel.
- **Deep-Dive Playbooks**:
  - 📊 **Google Sheets**: "Help me organize", formula generation (`QUERY`, `XLOOKUP`), survey analysis, Apps Script automations.
  - ✉️ **Gmail**: Thread summarization, "Help me write", tone shift, action-item extraction.
  - 🧠 **NotebookLM**: Audio Overviews (2-host podcast deep dive), source-grounded synthesis, in-text citations.
  - 📄 **Google Docs**: Document drafting, smart canvas, executive briefing extraction.
  - 📽️ **Google Slides**: Imagen 3 text-to-image illustration, deck outlining, speaker notes.
  - 🎥 **Google Meet**: "Take notes for me", translated captions, studio enhancements.
  - 📁 **Google Drive**: Multi-document semantic querying.
  - 🎬 **Google Vids**: AI storyboard, script, and voiceover creation.
- **Enterprise Security & Privacy**: Details on data isolation, SOC 1/2/3, and the zero-training guarantee.
- **One-Click Prompt Copying**: Quick copy buttons with toast feedback.
- **Dark & Light Mode**: Accessible, responsive theme switching.

## 🛠 Tech Stack

- **Frontend**: Vite, Tailwind CSS, Lucide Icons
- **Cloud Hosting**: Azure Static Web Apps (Free Tier)
- **CI/CD**: GitHub Actions

## 📋 Naming Conventions Applied

| Component | Naming Rule | Instance Name |
| :--- | :--- | :--- |
| **Resource Group** | `<name>-rg` | `gemini-workspace-guide-rg` |
| **Static Web App** | `stapp-<name>` | `stapp-gemini-workspace-guide` |
| **GitHub Repository** | `<name>` | `DavidTrammer/gemini-workspace-guide` |
| **Secret Token** | `AZURE_STATIC_WEB_APPS_API_TOKEN` | `AZURE_STATIC_WEB_APPS_API_TOKEN` |

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

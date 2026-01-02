# BST（保送通）| 全网最全保送信息查询平台

> **Live Demo:** [bst.k12go.com](https://bst.k12go.com)

**BST (保送通)** is a specialized information aggregation and planning tool designed for high school students in China seeking recommended admission (保送) to top-tier universities, specifically focusing on the 2026 admission cycle.

Navigating the complex landscape of university admission schedules, quotas, and constraints can be overwhelming. BST solves this by providing a unified "command center" for students and parents to visualize timelines, compare schools, and strategically plan their application process.

## 🚀 Key Features

- **Exam & Interview Timeline**: A visual calendar view to track conflicting written exams and interview dates across multiple universities.
- **University Profiles**: Detailed cards for each institution featuring:
  - Admission Quotas (Planned numbers).
  - Key Dates: Brochure release, registration deadlines, and testing schedules.
  - Tags: 985, 211, Double First Class status.
  - Constraints: "Application Limit" indicators (e.g., "Limit 2 schools").
- **Smart Filtering**: Search by school name or filter by specific application restrictions to find eligible programs.
- **Countdown Timers**: Stay aware of upcoming critical deadlines.
- **Direct Access**: Quick links to official admission brochures and map locations for exam venues.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## 🛠 Tech Stack

This project is built with a modern frontend stack ensuring speed and simplified maintenance:

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
- **Routing**: React Router
- **State/Data Fetching**: TanStack Query
- **Charts/Visuals**: Recharts
- **Utilities**: date-fns (Date manipulation), lucide-react (Icons)

## 📦 Local Development

To run this project locally, follow these steps:

### Prerequisites
- Node.js & npm installed (Recommended: Use [nvm](https://github.com/nvm-sh/nvm)).

### Installation

1.  **Clone the repository**
    ```sh
    git clone <YOUR_GIT_URL>
    cd baosongtong
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Start the development server**
    ```sh
    npm run dev
    ```
    Open `http://localhost:8080` (or the port shown in your terminal) to view the app.

## 🏗 Build & Deploy

To create a production build:

```sh
npm run build
```

This will generate a `dist` folder containing the static assets ready for deployment. The project is currently deployed on [Vercel](https://vercel.com/) (or similar static hosting), as seen at `bst.k12go.com`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---


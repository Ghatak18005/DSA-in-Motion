# 🧠 Expression Conversion Animator  

An interactive **Next.js + React** web application that visualizes the conversion of **Infix**, **Prefix**, and **Postfix** expressions step-by-step using **stack-based algorithms**.  
Built as an educational tool to help learners *see* how compilers and interpreters process mathematical expressions internally.

---

## 🔗 Live Demo

🌐 **Demo:** [https://dsa-in-motion.vercel.app](https://dsa-in-motion.vercel.app)  
📸 **Preview:**  
![App Demo Preview](https://via.placeholder.com/900x450?text=Expression+Conversion+Animator+Preview)

---

## 🚀 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend Framework | **Next.js 14 (React 18)** |
| Styling | **Tailwind CSS** |
| State Management | **React Hooks (`useState`, `useMemo`)** |
| Architecture | **Component-driven + Modular Utilities** |
| UI Components | Custom (`StackDisplay`, `StepControls`) |
| Animation | CSS transitions + controlled state steps |
| Deployment | Ready for **Vercel**, **Netlify**, or Node.js hosting |

---

## ✨ Features

- 🔁 Convert between:  
  - Postfix → Prefix  
  - Prefix → Postfix  
  - Infix → Postfix  
- 🧮 **Real-time stack visualization** with highlighted top elements  
- 🗣️ **Narrated, step-by-step animation** for push/pop/combine operations  
- 🎨 **Dynamic theme system** (Code Editor, Matrix, Chalkboard)  
- ⏩ **Next / Previous / Reset** step controls  
- 🧩 **Extensible logic** — easy to add more conversion types  
- 💡 Designed for **students, educators, and developers** learning algorithms  

---

## ⚙️ Installation & Setup

Clone and run locally in minutes:

```bash
# 1️⃣ Clone this repository
git clone https://github.com/Ghatak18005/DSA-in-Motion.git

# 2️⃣ Move into the project folder
cd DSA-in-Motion

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run locally
npm run dev

🧠 Algorithms Implemented
🔹 Postfix → Prefix

Scans left to right, uses a stack to combine operands as:
Operator + Operand1 + Operand2

🔹 Prefix → Postfix

Scans right to left, combines operands as:
Operand1 + Operand2 + Operator

🔹 Infix → Postfix

Uses operator precedence and parentheses handling (based on the Shunting Yard Algorithm).

🎨 Themes
Theme	Description
🖥️ Code Editor	Dark, modern grid interface
🧮 Matrix	Neon-green matrix style
🧑‍🏫 Chalkboard	Light classroom-style interface

📸 Screenshots

| Conversion           | Demo                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------ |
| **Postfix → Prefix** | <img width="3781" height="1854" alt="image" src="https://github.com/user-attachments/assets/476c36ee-7ed3-461a-8469-73cabf2b9f6d" /> |
| **Prefix → Postfix** | <img width="3773" height="1846" alt="image" src="https://github.com/user-attachments/assets/a89daf07-904c-4bb1-a7fa-70204a509123" /> |
| **Infix → Postfix**  | <img width="3747" height="1836" alt="image" src="https://github.com/user-attachments/assets/72dd17f1-a570-475e-8a35-3538d3569f8c" /> |



# 5️⃣ Open in browser
http://localhost:3000

📚 Educational Value

This project makes expression conversion algorithms visual and interactive, turning abstract stack operations into intuitive animations.

Ideal for:

🧠 Students learning Data Structures

🧑‍🏫 Teachers demonstrating compiler logic

👨‍💻 Developers exploring algorithm visualization

🌐 Deployment

✅ Live Demo: https://dsa-in-motion.vercel.app

Deploy easily with Vercel:

npm run build
vercel deploy


Or connect this GitHub repo directly for automatic builds.

👨‍💻 Author
Aum Ghodasara


🪪 License

Licensed under the MIT License — use freely for learning and teaching.

⭐ If you like this project, give it a star!




# MindCare - Psychological & Mental Health Support System for Students

**MindCare** is a comprehensive, privacy-first web application built for the SIH (Smart India Hackathon). It is designed to provide students with a secure, anonymous, and judgment-free environment to address their psychological and mental health needs.

The application features a modern React/Vite architecture, utilizing Tailwind CSS for beautiful UI layouts and an array of mental health tools including assessments, calming games, doctor consultations, educational libraries, and a secure community forum.

### 🌟 Key Hackathon Innovation: 100% Private Local AI Chatbot
To solve the critical issue of data privacy in mental health spaces, this project implements a state-of-the-art **Local AI Chatbot**. Unlike traditional AI (like OpenAI or Claude), our chatbot runs **entirely inside the user's browser using WebGPU**. This means all conversations to the AI never leave the student's personal computer. No data is sent to the cloud, and the student's private thoughts are mathematically guaranteed not to be used to train any external models.

---

## 📁 Project Structure

This project uses the `Vite + React + TypeScript` stack. Everything lives inside the `src/` directory.

### Core Application Files
- `src/main.tsx`: The main entry point for the React application. It binds the React app to the DOM inside `index.html`.
- `src/App.tsx`: The ultimate Router component. It handles the state of the user (logged in vs logged out) and handles routing to all the different protected components using `react-router-dom`. It is also where we inject the global `<LocalChatbot />` widget so it is available 24/7 on any page.
- `src/index.css` & `tailwind.config.js`: Configuration for global styles and Tailwind UI framework variables.

### Feature Components (`src/components/`)
The application is broken down into modular page components that the user navigates between from the sidebar/dashboard.

#### 1. Authentication & Onboarding
- `AuthPage.tsx`: Handles user login and signup flows securely.
- `Assessment.tsx`: The initial mental health check-in questionnaire that students must complete upon login to personalize their dashboard experience.

#### 2. Main Student Hub
- `Dashboard.tsx`: The primary overview page for the user. Displays mental health streaks, daily check-ins, and quick links to modules.
- `Navigation.tsx`: The sidebar navigation component that persists across all authenticated views.

#### 3. Support & Social Modules
- `Support.tsx`: A hub that connects users to emergency crisis resources (like 988), campus services, and options for professional therapies.
- `Community.tsx`: An anonymous forum where students can connect with peers safely to discuss shared difficulties.
- `DoctorConsultation.tsx`: Allows users to book appointments with licensed therapists and psychiatric professionals.

#### 4. Wellness Interactive Modules
- `Games.tsx`: Includes interactive calming exercises, like breathing guides and mindful mini-games to help reduce real-time stress and anxiety.
- `Library.tsx`: A repository of educational articles on topics such as stress management, imposter syndrome, and sleep hygiene.
- `MusicPlayer.tsx`: Built-in ambient and lo-fi music playlists to aid in studying or relaxation.
- `FoodOrdering.tsx`: An integrated module providing access to mood-boosting, healthy meal options.

---

## 🤖 The Privacy-First AI Chatbot Architecture

### How the `LocalChatbot.tsx` Works
We built the custom `<LocalChatbot />` component to give users a 24/7 empathetic "friend" they can talk to. 

#### 1. The Technology: `@mlc-ai/web-llm`
Normally, Large Language Models require massive GPU servers. WebLLM leverages an emerging web standard called **WebGPU** to run compiled models (like Meta's `Llama 3.2 1B Instruct`) directly on the graphics card of the student's laptop via the browser.

#### 2. The Implementation (`src/components/LocalChatbot.tsx`)
- **Initialization**: The first time the chatbot is opened by a user, it triggers `CreateWebWorkerMLCEngine()`. This downloads the compressed Llama weights (approx. 800MB) directly to their browser's cache.
- **Background Execution**: We built a custom Web Worker script in `src/components/llm-worker.ts`. This ensures that while the heavy AI model is generating words (inferencing), it does not freeze or slow down the main User Interface of the website.
- **Streaming Response**: When a student sends a message, it is processed locally array by array. Inside `handleSubmit()`, the code uses `stream: true` to iterate over the AI's thoughts piece-by-piece, which gives that instant, real-time typing effect.
- **UI Design**: The widget is styled with Tailwind CSS, utilizing `framer-motion` for smooth slide-in visuals. It features a Maximize/Minimize button to allow for immersive full-screen chats or an unobtrusive floating window.

### Why this Chatbot makes this project win:
1. **Zero Data Harvesting**: Real student mental health text is incredibly sensitive. The `Web-LLM` implementation ensures the model inference happens in the client instance. The internet (or Wi-Fi) could theoretically be disconnected after the first load, and the AI would still respond.
2. **Cost-Effective**: Running 24/7 AI chatbot APIs for thousands of students gets very expensive very fast. Because the computation happens on the *student's own device*, there are zero server inference costs for this feature.
3. **Low Latency Streaming**: Because there is no network round-trip delay to call an external API, the chatbot stream provides incredibly fast feedback once the model is warmed up.

---

## 🚀 Running the Project

To run this project locally on your machine:

1. **Install Dependencies**:
```bash
npm install
```

2. **Start the Development Server**:
```bash
npm run dev
```

3. **View Application**:
Open your browser (Chrome or Edge recommended for native WebGPU support) and navigate to `http://localhost:5173`. 
*Note: Ensure your browser is up to date, as the WebGPU AI Chatbot requires a modern web environment.*

# 🌟 AI Chat Rooms - Connect, Converse, Remember

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![LiveKit](https://img.shields.io/badge/LiveKit-000000?style=for-the-badge&logo=livekit&logoColor=white)](https://livekit.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white)](https://turborepo.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> A revolutionary platform that seamlessly connects users and AI agents in immersive real-time rooms, powered by advanced semantic memory for unforgettable conversations.

## ✨ Features

### 🚀 Real-Time Collaboration
- **WebSocket-Powered Connections**: Instant, low-latency communication between users and AI agents
- **Dynamic Rooms**: Create or join accessible rooms where anyone can participate
- **Multi-User Support**: Handle multiple participants simultaneously with LiveKit's robust infrastructure

### 🤖 AI Agent Integration
- **Intelligent Agents**: Powered by advanced AI models for natural, contextual interactions
- **Agent Management**: Easy deployment and management of AI agents within rooms
- **Customizable Behaviors**: Tailor agent responses and personalities to fit your needs

### 🧠 Semantic Memory System
- **Conversation Recall**: Advanced semantic search and retrieval for previous discussions
- **Persistent Context**: Maintain conversation history across sessions
- **Smart Memory**: AI-driven memory management that understands context and relevance

### 🎨 Modern User Experience
- **Beautiful Interface**: Sleek, responsive design built with Next.js and Tailwind CSS
- **Intuitive Controls**: Easy-to-use interface for managing rooms and interactions
- **Cross-Platform**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js Web   │    │   Python API    │    │   LiveKit       │
│   Frontend      │◄──►│   Backend       │◄──►│   Real-Time     │
│                 │    │                 │    │   Engine        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                    ┌─────────────────┐
                    │   AI Agents     │
                    │   & Memory      │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saket6198/Attack-Capital-Test.git
   cd livekits
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   pnpm install

   # Or with npm
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp apps/api/development.env apps/api/.env
   # Edit .env with your LiveKit credentials and other settings
   ```

4. **Start development servers**
   ```bash
   # Start all services
   pnpm dev

   # Or start specific services
   pnpm dev --filter=web    # Frontend only
   pnpm dev --filter=api    # Backend only
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📖 Usage

### Creating a Room
1. Navigate to the rooms section
2. Click "Create New Room"
3. Set room name and optional settings
4. Share the room link with participants

### Joining as a User
1. Click on a room invitation link
2. Enter your display name
3. Start chatting with AI agents and other users

### Managing AI Agents
1. Access the agent dashboard
2. Configure agent parameters
3. Deploy agents to specific rooms
4. Monitor agent performance and interactions

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **LiveKit React SDK** - Real-time communication

### Backend
- **Python** - High-performance backend
- **FastAPI** - Modern API framework
- **LiveKit Server SDK** - Real-time server capabilities
- **WebSockets** - Bidirectional communication

### DevOps & Tools
- **Turborepo** - Monorepo build system
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **pnpm** - Fast package manager

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LiveKit](https://livekit.io/) for the amazing real-time communication platform
- [Vercel](https://vercel.com/) for hosting and deployment
- [shadcn](https://ui.shadcn.com/) for beautiful UI components
- The open-source community for inspiration and tools

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Saket6198/Attack-Capital-Test/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Saket6198/Attack-Capital-Test/discussions)
- **Email**: For private inquiries

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Saket6198">Saket6198</a></p>
  <p>⭐ Star this repo if you find it useful!</p>
</div>

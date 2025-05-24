# 🍽️ Sahyadri Digital Canteen

A modern, responsive web application for ordering food from a college canteen system. This project demonstrates a complete digital ordering system with UPI payment integration, order management, and a beautiful user interface.

## 🌐 Live Demo

**🚀 [Visit Live Website](https://v0-foodcart-five.vercel.app/)**

**📂 [GitHub Repository](https://github.com/gagan-k454545/Sahyadri-Digital-Canteen.git)**

## ⚠️ Important Notice

**This is a demonstration project for educational purposes only. The QR code and UPI ID shown in the payment section are personal and for testing purposes only. DO NOT make any real payments through this application.**

## 🎯 Project Overview

Sahyadri Digital Canteen is a college canteen management system that allows students to:
- Browse the food menu with categories (Breakfast, Lunch, Snacks, Beverages)
- Add items to cart with quantity management
- View order history and favorites
- Make payments through UPI apps or QR code scanning
- Skip physical queues by ordering online

## ✨ Features

### 🛒 Shopping Experience
- **Interactive Menu**: Browse food items by categories with beautiful cards
- **Smart Cart**: Add/remove items with real-time quantity updates
- **Favorites**: Mark and save favorite food items
- **Order History**: View past orders with detailed information
- **Responsive Design**: Works seamlessly on mobile and desktop

### 💳 Payment Integration
- **Multiple UPI Apps**: Direct integration with PhonePe, Google Pay, Paytm, Amazon Pay, BHIM
- **QR Code Payment**: Generate dynamic QR codes for UPI payments
- **Payment Simulation**: Demo payment flow for testing purposes
- **Secure Processing**: Simulated secure payment handling

### 🎨 User Interface
- **Modern Design**: Clean, gradient-based design with smooth animations
- **Framer Motion**: Beautiful animations and transitions
- **Responsive Layout**: Mobile-first design approach
- **Dark/Light Theme**: Theme switching capability
- **Loading States**: Skeleton loaders and loading animations

### 🔧 Technical Features
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Modern component library
- **Local Storage**: Persistent cart and order history
- **PWA Ready**: Progressive Web App capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
 \`\`\`bash
 git clone https://github.com/gagan-k454545/Sahyadri-Digital-Canteen.git
 cd Sahyadri-Digital-Canteen
 \`\`\`

2. **Install dependencies**
 \`\`\`bash
 npm install
 # or
 yarn install
 \`\`\`

3. **Run the development server**
 \`\`\`bash
 npm run dev
 # or
 yarn dev
 \`\`\`

4. **Open your browser**
 Navigate to [http://localhost:3000](http://localhost:3000)

### 🌍 Deployment

The project is deployed on Vercel and can be accessed at:
**[https://v0-foodcart-five.vercel.app/](https://v0-foodcart-five.vercel.app/)**

To deploy your own version:
1. Fork the repository
2. Connect to Vercel
3. Deploy with one click

## 📱 Usage

### For Students
1. **Browse Menu**: Select from different food categories
2. **Add to Cart**: Click on items to add them to your cart
3. **Manage Cart**: Adjust quantities or remove items
4. **Checkout**: Proceed to payment when ready
5. **Payment**: Choose UPI app or scan QR code (Demo only)
6. **Order History**: View past orders in the history section

### For Developers
1. **Menu Management**: Update food items in \`app/page.tsx\`
2. **Payment Integration**: Modify UPI configurations
3. **Styling**: Customize themes in \`tailwind.config.ts\`
4. **Components**: Extend UI components in \`components/ui/\`

## 🏗️ Project Structure

\`\`\`
Sahyadri-Digital-Canteen/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application
├── components/
│   ├── ui/                  # Shadcn UI components
│   └── theme-provider.tsx   # Theme management
├── hooks/
│   ├── use-mobile.tsx       # Mobile detection hook
│   └── use-toast.ts         # Toast notifications
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── styles/                  # Additional styles
├── tailwind.config.ts       # Tailwind configuration
├── next.config.mjs          # Next.js configuration
└── package.json             # Dependencies
\`\`\`

## 🛠️ Technologies Used

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Shadcn/UI** - Component library
- **Lucide React** - Icons

### Features
- **React Hooks** - State management
- **Local Storage** - Data persistence
- **QR Code Generation** - Payment QR codes
- **Responsive Design** - Mobile-first approach

## 🎨 Design System

### Colors
- **Primary**: Green gradient (Green 600 → Emerald 600 → Teal 600)
- **Secondary**: Green/Emerald variations
- **Background**: Gradient from Green 50 to Teal 50
- **Text**: Semantic color system

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold with gradient text effects
- **Body**: Regular weight with good contrast

### Components
- **Cards**: Rounded corners with hover effects
- **Buttons**: Gradient backgrounds with animations
- **Forms**: Clean inputs with validation states

## 📊 Menu Categories

1. **🔥 Popular** - Most ordered items
2. **🌅 Breakfast** - Morning meals (Dosa, Idli, etc.)
3. **🍽️ Lunch** - Main meals (Rice, Curry, Biryani)
4. **🍿 Snacks** - Light bites (Pakoda, Vada, etc.)
5. **☕ Beverages** - Drinks (Tea, Coffee, etc.)

## 💰 Payment Methods

### UPI Apps Supported
- PhonePe
- Google Pay (GPay)
- Paytm
- Amazon Pay
- BHIM UPI

### Payment Flow
1. Select items and proceed to checkout
2. Choose payment method (UPI app or QR scan)
3. Complete payment in selected UPI app
4. Return to app for order confirmation

## 🔒 Security & Privacy

- **No Real Payments**: This is a demo application
- **Local Storage**: Data stored locally on device
- **No Backend**: No server-side data collection
- **Privacy First**: No personal data transmitted

## ⚡ Performance Optimizations

- **Lazy Loading**: Images and components load on demand
- **Memoization**: Optimized re-renders with React.memo
- **Efficient Animations**: Reduced animation complexity for better performance
- **Code Splitting**: Dynamic imports for better loading times
- **Image Optimization**: Next.js automatic image optimization

## 🚧 Future Enhancements

### Planned Features
- [ ] Real backend integration
- [ ] Admin panel for menu management
- [ ] Order tracking system
- [ ] Push notifications
- [ ] Multiple payment gateways
- [ ] User authentication
- [ ] Order scheduling
- [ ] Nutritional information
- [ ] Reviews and ratings
- [ ] Loyalty program

### Technical Improvements
- [ ] Database integration
- [ ] API development
- [ ] Real-time updates
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Accessibility enhancements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gagan Kumar**
- GitHub: [@gagan-k454545](https://github.com/gagan-k454545)
- Project: [Sahyadri Digital Canteen](https://github.com/gagan-k454545/Sahyadri-Digital-Canteen)
- Live Demo: [v0-foodcart-five.vercel.app](https://v0-foodcart-five.vercel.app/)

## 🙏 Acknowledgments

- **Sahyadri College** - Inspiration for the project
- **Shadcn/UI** - Beautiful component library
- **Vercel** - Hosting and deployment
- **Unsplash** - Food images used in the demo
- **Lucide** - Icon library
- **v0.dev** - AI-powered development assistance

## 📞 Support

If you have any questions or need help with the project:

1. Check the [Issues](https://github.com/gagan-k454545/Sahyadri-Digital-Canteen/issues) page
2. Create a new issue if your question isn't answered
3. Contact the maintainer directly

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

**🔗 Quick Links:**
- **Live Demo**: [https://v0-foodcart-five.vercel.app/](https://v0-foodcart-five.vercel.app/)
- **GitHub Repository**: [https://github.com/gagan-k454545/Sahyadri-Digital-Canteen.git](https://github.com/gagan-k454545/Sahyadri-Digital-Canteen.git)

---

**Remember: This is a demonstration project. Do not make real payments through the application.**
\`\`\`

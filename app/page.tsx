"use client"

import { useState, useEffect } from "react"
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  ChevronRight,
  Check,
  ArrowRight,
  Clock,
  Star,
  History,
  Calendar,
  ArrowLeft,
  Heart,
} from "lucide-react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

// Food categories
const categories = [
  { id: "popular", name: "Popular", icon: "🔥" },
  { id: "breakfast", name: "Breakfast", icon: "🌅" },
  { id: "lunch", name: "Lunch", icon: "🍽️" },
  { id: "snacks", name: "Snacks", icon: "🍿" },
  { id: "beverages", name: "Beverages", icon: "☕" },
]

// UPI Apps
const upiApps = [
  {
    id: "phonepe",
    name: "PhonePe",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#5f259f",
    package: "com.phonepe.app",
  },
  {
    id: "gpay",
    name: "Google Pay",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#2DA94F",
    package: "com.google.android.apps.nbu.paisa.user",
  },
  {
    id: "paytm",
    name: "Paytm",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#00BAF2",
    package: "net.one97.paytm",
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#FF9900",
    package: "in.amazon.mShop.android.shopping",
  },
  {
    id: "bhim",
    name: "BHIM UPI",
    icon: "/placeholder.svg?height=40&width=40",
    color: "#00579E",
    package: "in.org.npci.upiapp",
  },
]

// Food items with prices in INR - Updated Menu
const foodItems = [
  // Hot Beverages
  {
    id: 1,
    name: "Hot Beverages",
    description: "Tea, Coffee, or other hot beverages",
    price: 20,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: "3 min",
    veg: true,
    popular: false,
  },

  // Snacks
  {
    id: 2,
    name: "Idli (2) / Vada (1)",
    description: "Steamed rice cakes or fried lentil donuts - 3 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop",
    rating: 4.7,
    prepTime: "5 min",
    veg: true,
    popular: true,
  },
  {
    id: 3,
    name: "Puri Bhaji/Kurma",
    description: "Deep fried bread with spiced vegetable curry - 3 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
    rating: 4.6,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 4,
    name: "Masala/Onion Dosa",
    description: "Crispy rice crepe with spiced potato filling or onions",
    price: 50,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    rating: 4.8,
    prepTime: "10 min",
    veg: true,
    popular: true,
  },
  {
    id: 5,
    name: "Plain Dosa",
    description: "Simple crispy rice and lentil crepe",
    price: 35,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 6,
    name: "Chapathi (1 Piece)",
    description: "Soft whole wheat flatbread",
    price: 25,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1574653853027-5d3ac9b9e7c3?w=400&h=300&fit=crop",
    rating: 4.3,
    prepTime: "5 min",
    veg: true,
    popular: false,
  },
  {
    id: 7,
    name: "Chapathi (2 Pieces)",
    description: "Soft whole wheat flatbread - 2 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1574653853027-5d3ac9b9e7c3?w=400&h=300&fit=crop",
    rating: 4.3,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 8,
    name: "Parotha (1 Piece)",
    description: "Layered flatbread cooked with oil",
    price: 25,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
    rating: 4.4,
    prepTime: "6 min",
    veg: true,
    popular: false,
  },
  {
    id: 9,
    name: "Parotha (2 Pieces)",
    description: "Layered flatbread cooked with oil - 2 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
    rating: 4.4,
    prepTime: "10 min",
    veg: true,
    popular: false,
  },
  {
    id: 10,
    name: "Upma/Kesari Bath (1 Scoop)",
    description: "Semolina dish or sweet semolina dessert",
    price: 25,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    rating: 4.2,
    prepTime: "5 min",
    veg: true,
    popular: false,
  },
  {
    id: 11,
    name: "Upma/Kesari Bath (2 Scoops)",
    description: "Semolina dish or sweet semolina dessert - 2 scoops",
    price: 45,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    rating: 4.2,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 12,
    name: "Podi/Golibaje",
    description: "Spiced lentil fritters - 4 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: "6 min",
    veg: true,
    popular: true,
  },
  {
    id: 13,
    name: "Veg/Potato Bonda/Buns (1 No)",
    description: "Deep fried potato dumpling or bun",
    price: 25,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    rating: 4.3,
    prepTime: "5 min",
    veg: true,
    popular: false,
  },
  {
    id: 14,
    name: "Veg/Potato Bonda/Buns (2 Nos)",
    description: "Deep fried potato dumpling or bun - 2 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    rating: 4.3,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 15,
    name: "Onion Pakoda",
    description: "Crispy onion fritters - 1 plate",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    rating: 4.6,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 16,
    name: "Maddur/Dahi/Sabudhana Vada (1 Piece)",
    description: "Traditional South Indian fritters",
    price: 25,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop",
    rating: 4.4,
    prepTime: "5 min",
    veg: true,
    popular: false,
  },
  {
    id: 17,
    name: "Maddur/Dahi/Sabudhana Vada (2 Pieces)",
    description: "Traditional South Indian fritters - 2 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop",
    rating: 4.4,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 18,
    name: "Banana Podi/Baiji",
    description: "Banana fritters - 4 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: "6 min",
    veg: true,
    popular: false,
  },
  {
    id: 19,
    name: "Bread Pakoda",
    description: "Bread slices dipped in batter and fried - 1 plate",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    rating: 4.3,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 20,
    name: "Cutlet (1 Piece)",
    description: "Crispy vegetable cutlet",
    price: 25,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    rating: 4.4,
    prepTime: "5 min",
    veg: true,
    popular: false,
  },
  {
    id: 21,
    name: "Cutlet (2 Pieces)",
    description: "Crispy vegetable cutlet - 2 pieces",
    price: 45,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    rating: 4.4,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 22,
    name: "Gobi/Veg Manchurian",
    description: "Indo-Chinese cauliflower or vegetable balls - 1 plate",
    price: 60,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.6,
    prepTime: "12 min",
    veg: true,
    popular: true,
  },
  {
    id: 23,
    name: "Veg Fried Rice/Veg Biryani",
    description: "Aromatic rice dish with vegetables - 1 plate",
    price: 75,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop",
    rating: 4.7,
    prepTime: "15 min",
    veg: true,
    popular: true,
  },
  {
    id: 24,
    name: "Lemon Rice/Curd Rice with Pickle",
    description: "Tangy rice dishes served with pickle - 1 plate",
    price: 45,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop",
    rating: 4.4,
    prepTime: "8 min",
    veg: true,
    popular: false,
  },
  {
    id: 25,
    name: "Pulav with Raita",
    description: "Spiced rice with yogurt side dish - 1 plate",
    price: 45,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: "12 min",
    veg: true,
    popular: false,
  },

  // Meals
  {
    id: 26,
    name: "Mini Meal",
    description: "Sambar, Palya (vegetable curry), and Pickle",
    price: 50,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: "10 min",
    veg: true,
    popular: false,
  },
  {
    id: 27,
    name: "Special Meal",
    description: "2 Poori/1 Chapathi, Curd, Palya, Gassi (curry)",
    price: 70,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    rating: 4.7,
    prepTime: "15 min",
    veg: true,
    popular: true,
  },

  // Egg Items
  {
    id: 28,
    name: "Egg Curry Rice",
    description: "Rice served with spiced egg curry",
    price: 65,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.6,
    prepTime: "12 min",
    veg: false,
    popular: false,
  },
  {
    id: 29,
    name: "Egg Fried Rice",
    description: "Fried rice with scrambled eggs",
    price: 80,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop",
    rating: 4.7,
    prepTime: "15 min",
    veg: false,
    popular: false,
  },
  {
    id: 30,
    name: "Omlet (Double)",
    description: "Double egg omelet",
    price: 50,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: "8 min",
    veg: false,
    popular: false,
  },
  {
    id: 31,
    name: "Bread Omlet (Double)",
    description: "Double egg omelet with bread",
    price: 50,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: "10 min",
    veg: false,
    popular: false,
  },

  // Chicken Items
  {
    id: 32,
    name: "Chicken Curry Rice",
    description: "Rice with spiced chicken curry - 2 pieces",
    price: 90,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.8,
    prepTime: "18 min",
    veg: false,
    popular: true,
  },
  {
    id: 33,
    name: "Chicken Fried Rice",
    description: "Fried rice with chicken pieces - 1 plate",
    price: 90,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop",
    rating: 4.8,
    prepTime: "20 min",
    veg: false,
    popular: false,
  },
  {
    id: 34,
    name: "Chicken Biryani",
    description: "Aromatic rice with chicken - 2 pieces",
    price: 90,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop",
    rating: 4.9,
    prepTime: "25 min",
    veg: false,
    popular: true,
  },
  {
    id: 35,
    name: "Chicken Curry with 2 Chapathi",
    description: "Spiced chicken curry with flatbread - 2 pieces",
    price: 90,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.7,
    prepTime: "20 min",
    veg: false,
    popular: false,
  },
  {
    id: 36,
    name: "Chicken Sukka with 2 Chapathi",
    description: "Dry chicken preparation with flatbread - 2 pieces",
    price: 90,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.8,
    prepTime: "22 min",
    veg: false,
    popular: false,
  },
  {
    id: 37,
    name: "Chicken Ghee Roast",
    description: "Chicken roasted in ghee with spices - 2 pieces",
    price: 90,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.9,
    prepTime: "25 min",
    veg: false,
    popular: true,
  },
  {
    id: 38,
    name: "Chicken Curry",
    description: "Spiced chicken curry - 2 pieces",
    price: 55,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.7,
    prepTime: "18 min",
    veg: false,
    popular: false,
  },
]

// Order history type
type OrderHistoryItem = {
  id: string
  date: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    veg: boolean
  }>
  totalAmount: number
}

export default function SahyadriDigitalCanteen() {
  const [cart, setCart] = useState([])
  const [isQROpen, setIsQROpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("popular")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([])
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const { toast } = useToast()

  // Load order history from local storage
  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory")
    const storedFavorites = localStorage.getItem("favorites")

    if (storedHistory) {
      try {
        setOrderHistory(JSON.parse(storedHistory))
      } catch (error) {
        console.error("Failed to parse order history:", error)
      }
    }

    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Failed to parse favorites:", error)
      }
    }
  }, [])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Add a function to detect if specific UPI apps are installed (for Android)
  const detectInstalledUpiApps = () => {
    return upiApps
  }

  // Add a useEffect to check for installed UPI apps
  useEffect(() => {
    const installedApps = detectInstalledUpiApps()
  }, [])

  // Add a function to handle payment status check
  const checkPaymentStatus = (transactionId) => {
    return new Promise((resolve) => {
      const isSuccess = window.confirm("Did you complete the payment successfully?")
      resolve(isSuccess)
    })
  }

  // Get item quantity in cart
  const getItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  // Add item to cart with animation
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
      duration: 2000,
    })
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    const existingItem = cart.find((cartItem) => cartItem.id === id)

    if (existingItem.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== id))
    } else {
      setCart(
        cart.map((cartItem) => (cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)),
      )
    }
  }

  // Delete item from cart
  const deleteFromCart = (id) => {
    setCart(cart.filter((cartItem) => cartItem.id !== id))
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      duration: 2000,
    })
  }

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    const newFavorites = favorites.includes(itemId) ? favorites.filter((id) => id !== itemId) : [...favorites, itemId]

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))

    toast({
      title: favorites.includes(itemId) ? "Removed from favorites" : "Added to favorites",
      duration: 1500,
    })
  }

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate total items
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  // Filter items by category
  const filteredItems = foodItems.filter((item) =>
    activeCategory === "popular"
      ? item.popular || ["lunch", "breakfast"].includes(item.category)
      : item.category === activeCategory,
  )

  // Generate payment string for QR code with the specified UPI ID
  let paymentString = `upi://pay?pa=gagankunder332@oksbi&pn=SahyadriCanteen&am=${totalPrice.toFixed(2)}&cu=INR&tn=Food Order Payment`

  // Save order to history
  const saveOrderToHistory = () => {
    if (cart.length === 0) return

    const newOrder: OrderHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        veg: item.veg,
      })),
      totalAmount: totalPrice,
    }

    const updatedHistory = [newOrder, ...orderHistory]
    setOrderHistory(updatedHistory)

    // Save to local storage
    localStorage.setItem("orderHistory", JSON.stringify(updatedHistory))

    return newOrder
  }

  // Handle direct payment with UPI apps
  const handleDirectPayment = (app) => {
    const amount = totalPrice.toFixed(2)
    const transactionId = `SDC${Date.now()}`
    const upiId = "gagankunder332@oksbi"
    const payeeName = "Sahyadri Digital Canteen"
    const note = "Food Order Payment"

    let paymentUrl = ""

    switch (app.id) {
      case "phonepe":
        paymentUrl = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
        break
      case "gpay":
        paymentUrl = `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
        break
      case "paytm":
        paymentUrl = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
        break
      case "amazonpay":
        paymentUrl = `amazonpay://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
        break
      default:
        paymentUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tr=${transactionId}&tn=${encodeURIComponent(note)}`
    }

    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    setIsLoading(true)

    if (isMobileDevice()) {
      try {
        const iframe = document.createElement("iframe")
        iframe.style.display = "none"
        iframe.src = paymentUrl
        document.body.appendChild(iframe)

        setTimeout(() => {
          document.body.removeChild(iframe)

          const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
              document.removeEventListener("visibilitychange", handleVisibilityChange)

              setIsLoading(false)

              const confirmPayment = window.confirm("Did you complete the payment successfully?")

              if (confirmPayment) {
                setIsPaymentSuccess(true)
                setIsQROpen(false)

                const order = saveOrderToHistory()

                toast({
                  title: "Payment successful!",
                  description: `Your payment of ₹${totalPrice.toFixed(2)} was successful`,
                  variant: "success",
                })

                setTimeout(() => {
                  setCart([])
                  setIsPaymentSuccess(false)
                }, 3000)
              } else {
                toast({
                  title: "Payment cancelled",
                  description: "Your payment was not completed",
                  variant: "destructive",
                })
              }
            }
          }

          document.addEventListener("visibilitychange", handleVisibilityChange)
          window.location.href = paymentUrl
        }, 500)
      } catch (error) {
        console.error("Error launching UPI app:", error)
        window.location.href = paymentUrl
      }
    } else {
      setIsLoading(false)
      toast({
        title: "Desktop detected",
        description: "Please scan the QR code with your UPI app to make payment",
      })
    }
  }

  // Add this function to handle direct QR code payment
  const handleQRCodePayment = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = paymentString
    } else {
      toast({
        title: "Scan QR Code",
        description: "Please scan this QR code with your UPI app to make payment",
      })
    }
  }

  // Update the paymentString to include more parameters for better compatibility
  paymentString = `upi://pay?pa=gagankunder332@oksbi&pn=${encodeURIComponent("Sahyadri Digital Canteen")}&am=${totalPrice.toFixed(2)}&cu=INR&tn=${encodeURIComponent("Food Order Payment")}&tr=SDC${Date.now()}`

  // Simulate payment success
  const simulatePaymentSuccess = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsPaymentSuccess(true)
      setIsQROpen(false)

      const order = saveOrderToHistory()

      toast({
        title: "Payment successful!",
        description: `Your payment of ₹${totalPrice.toFixed(2)} was successful`,
        variant: "success",
      })

      setTimeout(() => {
        setCart([])
        setIsPaymentSuccess(false)
      }, 3000)
    }, 1500)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Add a component to show payment instructions
  const PaymentInstructions = () => (
    <div className="mt-4 p-4 bg-green-50 rounded-lg text-sm">
      <h4 className="font-medium mb-2 text-green-800">How to pay:</h4>
      <ol className="list-decimal pl-5 space-y-1 text-green-700">
        <li>Click on your preferred UPI app above</li>
        <li>Authorize the payment in your UPI app</li>
        <li>Return to this app after payment</li>
        <li>Your order will be confirmed automatically</li>
      </ol>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-green-100 shadow-lg"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div className="flex items-center" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <motion.div
              className="mr-3 h-10 w-10 sm:h-12 sm:w-12 relative overflow-hidden rounded-xl shadow-lg"
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Y1rbpb7CLFU3YQpxLYY5CZN3Ps0o5t.png"
                alt="Sahyadri Logo"
                className="h-full w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-xl"></div>
            </motion.div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 text-transparent bg-clip-text">
                Sahyadri Digital Canteen
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Order food from campus canteen</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-green-100 transition-all duration-300 rounded-full"
                onClick={() => setIsHistoryOpen(true)}
              >
                <History className="h-5 w-5" />
                <span className="sr-only">Order History</span>
              </Button>
            </motion.div>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative hover:bg-green-100 transition-all duration-300 rounded-full border-green-200"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <AnimatePresence>
                      {totalItems > 0 && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className="absolute -top-2 -right-2"
                        >
                          <Badge className="px-1.5 py-0.5 min-w-[1.25rem] min-h-[1.25rem] flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
                            {totalItems}
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col bg-gradient-to-b from-white to-green-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 text-transparent bg-clip-text">
                    Your Cart
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="rounded-full">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {cart.length > 0 ? (
                  <>
                    <ScrollArea className="flex-1 pr-4">
                      <AnimatePresence>
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="py-4 border-b border-green-100 relative group"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{item.name}</h3>
                                  {item.veg ? (
                                    <div className="w-4 h-4 border-2 border-green-500 flex items-center justify-center rounded-sm">
                                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 border-2 border-red-500 flex items-center justify-center rounded-sm">
                                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                              </div>
                              <div className="flex items-center gap-3 ml-4">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-red-50 hover:text-red-500 transition-all duration-200 rounded-full"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                </motion.div>
                                <span className="w-6 text-center font-medium">{item.quantity}</span>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-green-50 hover:text-green-500 transition-all duration-200 rounded-full"
                                    onClick={() => addToCart(item)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                            <p className="text-sm text-right font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-0 h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all duration-200 rounded-full"
                                onClick={() => deleteFromCart(item.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </ScrollArea>

                    <div className="mt-auto pt-4 bg-gradient-to-t from-green-50 to-transparent rounded-t-xl p-4 -mx-4">
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 font-bold text-lg border-t border-green-200 pt-2">
                        <span>Total</span>
                        <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
                      </div>

                      <Dialog open={isQROpen} onOpenChange={setIsQROpen}>
                        <DialogTrigger asChild>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              className="w-full mt-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-xl"
                              onClick={() => setIsQROpen(true)}
                            >
                              Proceed to Payment
                            </Button>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-green-50 border-green-200">
                          {isPaymentSuccess ? (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex flex-col items-center justify-center py-8"
                            >
                              <motion.div
                                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 360, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }}
                              >
                                <Check className="h-8 w-8 text-green-600" />
                              </motion.div>
                              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-700 to-emerald-600 text-transparent bg-clip-text">
                                Payment Successful!
                              </h2>
                              <p className="text-center text-muted-foreground mb-6">
                                Your order has been placed successfully.
                              </p>
                              <Button
                                onClick={() => setIsQROpen(false)}
                                className="bg-gradient-to-r from-green-600 to-emerald-600"
                              >
                                Continue Shopping
                              </Button>
                            </motion.div>
                          ) : (
                            <>
                              <DialogHeader>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsQROpen(false)}
                                    className="rounded-full hover:bg-green-100"
                                  >
                                    <ArrowLeft className="h-4 w-4" />
                                  </Button>
                                  <div>
                                    <DialogTitle className="text-left">Choose Payment Method</DialogTitle>
                                    <DialogDescription className="text-left">
                                      Pay ₹{totalPrice.toFixed(2)} using your preferred payment method
                                    </DialogDescription>
                                  </div>
                                </div>
                              </DialogHeader>

                              {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                  <motion.div
                                    className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mb-4"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                  ></motion.div>
                                  <p className="text-muted-foreground">Processing payment...</p>
                                </div>
                              ) : (
                                <div className="space-y-6 py-4">
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-green-800">Pay using UPI Apps</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                      {upiApps.map((app, index) => (
                                        <motion.div
                                          key={app.id}
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                        >
                                          <Button
                                            variant="outline"
                                            className="flex items-center justify-start h-auto py-3 px-4 hover:bg-gray-50 transition-all duration-300 group rounded-xl border-green-200"
                                            onClick={() => handleDirectPayment(app)}
                                          >
                                            <motion.div
                                              className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                                              style={{ backgroundColor: app.color }}
                                              whileHover={{ rotate: 360 }}
                                              transition={{ duration: 0.5 }}
                                            >
                                              <img
                                                src={app.icon || "/placeholder.svg"}
                                                alt={app.name}
                                                className="w-5 h-5 object-contain"
                                              />
                                            </motion.div>
                                            <div className="text-left">
                                              <p className="text-sm font-medium">{app.name}</p>
                                            </div>
                                            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                          </Button>
                                        </motion.div>
                                      ))}
                                    </div>
                                    <PaymentInstructions />
                                  </div>

                                  <Separator className="bg-gradient-to-r from-transparent via-green-300 to-transparent h-px" />

                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-green-800">Scan & Pay</h3>
                                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                      <motion.div
                                        className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        onClick={handleQRCodePayment}
                                        title="Click to open UPI app"
                                        whileHover={{ scale: 1.05, rotateY: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{ transformStyle: "preserve-3d" }}
                                      >
                                        <QRCode value={paymentString} size={160} />
                                      </motion.div>
                                      <div className="mt-4 text-center">
                                        <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">
                                          ₹{totalPrice.toFixed(2)}
                                        </Badge>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                          UPI ID: gagankunder332@oksbi
                                        </p>
                                        <p className="mt-1 text-xs text-green-600 font-medium">
                                          Tap on QR code to open your UPI app directly
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <Separator className="bg-gradient-to-r from-transparent via-green-300 to-transparent h-px" />

                                  <div className="space-y-2">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                      <Button
                                        className="w-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 hover:from-green-200 hover:to-emerald-200 transition-all duration-300 border border-green-300 rounded-xl"
                                        variant="outline"
                                        onClick={simulatePaymentSuccess}
                                      >
                                        Simulate Successful Payment
                                      </Button>
                                    </motion.div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <ShoppingCart className="h-12 w-12 text-green-300" />
                      </motion.div>
                      <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                      <p className="text-muted-foreground mb-4">Add some delicious items to get started</p>
                      <Button
                        variant="outline"
                        onClick={() => setIsCartOpen(false)}
                        className="hover:bg-green-100 transition-all duration-300 border-green-300 rounded-xl"
                      >
                        Browse Menu
                      </Button>
                    </motion.div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Order History Dialog */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg bg-gradient-to-b from-white to-green-50 border-green-200">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsHistoryOpen(false)}
                className="rounded-full hover:bg-green-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <DialogTitle className="flex items-center gap-2 text-left">
                  <History className="h-5 w-5" />
                  Order History
                </DialogTitle>
                <DialogDescription className="text-left">View your previous orders and their details</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-4">
            {orderHistory.length > 0 ? (
              <ScrollArea className="h-[60vh] pr-4">
                {orderHistory.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl shadow-sm border border-green-100"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">{formatDate(order.date)}</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        ₹{order.totalAmount.toFixed(2)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div
                          key={`${order.id}-${item.id}-${itemIndex}`}
                          className="flex justify-between items-center py-2 border-b border-green-100 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            {item.veg ? (
                              <div className="w-3 h-3 border border-green-500 flex items-center justify-center rounded-sm">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                            ) : (
                              <div className="w-3 h-3 border border-red-500 flex items-center justify-center rounded-sm">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              </div>
                            )}
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                            <span className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <motion.div
                  className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <History className="h-8 w-8 text-green-300" />
                </motion.div>
                <h3 className="text-lg font-medium mb-2">No order history</h3>
                <p className="text-muted-foreground mb-4">
                  Your order history will appear here after you make a purchase
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 py-8 md:py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-5 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(0,128,0,0.1)_0%,_rgba(0,0,0,0)_60%)]"></div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              className="inline-block mb-4 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-medium text-green-800">🍽️ Campus Food Made Easy</span>
            </motion.div>
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 text-transparent bg-clip-text drop-shadow-sm"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Sahyadri Digital Canteen
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Skip the lines! Order your favorite campus food online and pick it up when it's ready.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-xl"
                  onClick={() => {
                    document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Explore Menu <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50 transition-all duration-300 rounded-xl border-2"
                  onClick={() => setIsHistoryOpen(true)}
                >
                  View Order History <History className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-6 left-0 w-full h-12 bg-gradient-to-r from-green-200/30 to-emerald-200/30 transform -skew-y-1"></div>
      </motion.div>

      {/* Menu Section */}
      <div id="menu-section" className="container mx-auto py-8 md:py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <motion.span
              className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4 border border-green-200"
              whileHover={{ scale: 1.05 }}
            >
              🍽️ MENU
            </motion.span>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 text-transparent bg-clip-text">
              Today's Menu
            </h2>
          </div>
        </motion.div>

        <Tabs defaultValue="popular" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <TabsList className="mb-6 w-full justify-start bg-gradient-to-r from-green-100/80 via-emerald-100/80 to-teal-100/80 p-1 rounded-2xl border border-green-200">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TabsTrigger
                      value={category.id}
                      className="px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:via-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white transition-all duration-300 rounded-xl data-[state=active]:shadow-lg"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <AnimatePresence mode="wait">
                  {isLoading
                    ? // Skeleton loaders
                      Array.from({ length: 6 }).map((_, index) => (
                        <motion.div
                          key={`skeleton-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden rounded-2xl">
                            <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
                            <CardContent className="p-4 md:p-6">
                              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse mb-2"></div>
                              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse mb-2 w-3/4"></div>
                              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse mb-4 w-1/2"></div>
                              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    : filteredItems.map((item, index) => {
                        const itemQuantity = getItemQuantity(item.id)
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                          >
                            <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl group h-full flex flex-col border-transparent bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl relative">
                              {/* Favorite Button */}
                              <motion.button
                                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleFavorite(item.id)}
                              >
                                <Heart
                                  className={`h-4 w-4 transition-colors ${
                                    favorites.includes(item.id) ? "text-red-500 fill-red-500" : "text-gray-400"
                                  }`}
                                />
                              </motion.button>

                              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
                                <motion.img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                  whileHover={{ scale: 1.1 }}
                                />
                                <div className="absolute top-3 left-3">
                                  {item.veg ? (
                                    <motion.div
                                      className="w-6 h-6 bg-white border-2 border-green-500 flex items-center justify-center rounded-md shadow-lg"
                                      whileHover={{ scale: 1.1 }}
                                    >
                                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </motion.div>
                                  ) : (
                                    <motion.div
                                      className="w-6 h-6 bg-white border-2 border-red-500 flex items-center justify-center rounded-md shadow-lg"
                                      whileHover={{ scale: 1.1 }}
                                    >
                                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    </motion.div>
                                  )}
                                </div>
                                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs shadow-lg">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <span className="font-medium">{item.rating}</span>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                                  <Clock className="h-3 w-3 text-green-600" />
                                  <span className="font-medium">{item.prepTime}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                              <CardContent className="p-4 md:p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-green-700 transition-colors">
                                      {item.name}
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.05 }}>
                                    <Badge
                                      variant="outline"
                                      className="text-base font-bold bg-gradient-to-r from-green-50 to-emerald-50 ml-3 whitespace-nowrap border-green-300 text-green-700 shadow-sm"
                                    >
                                      ₹{item.price.toFixed(2)}
                                    </Badge>
                                  </motion.div>
                                </div>

                                {itemQuantity > 0 ? (
                                  <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-10 w-10 hover:bg-red-50 hover:text-red-500 transition-all duration-200 rounded-full border-2"
                                          onClick={() => removeFromCart(item.id)}
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                      </motion.div>
                                      <motion.span
                                        className="w-8 text-center font-bold text-lg"
                                        key={itemQuantity}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        {itemQuantity}
                                      </motion.span>
                                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-10 w-10 hover:bg-green-50 hover:text-green-500 transition-all duration-200 rounded-full border-2"
                                          onClick={() => addToCart(item)}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </motion.div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-muted-foreground">Total</p>
                                      <p className="font-bold text-green-600">
                                        ₹{(item.price * itemQuantity).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                      onClick={() => addToCart(item)}
                                      className="w-full mt-auto bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-xl"
                                    >
                                      Add to Cart
                                    </Button>
                                  </motion.div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        )
                      })}
                </AnimatePresence>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Features Section */}
      <motion.div
        className="container mx-auto py-8 md:py-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-xl md:text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 text-transparent bg-clip-text"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose Sahyadri Digital Canteen?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Clock,
              title: "Skip the Lines",
              description: "Order ahead and pick up your food when it's ready. No more waiting in long queues.",
              delay: 0.1,
            },
            {
              icon: Star,
              title: "Fresh & Tasty",
              description: "Enjoy fresh, hot meals prepared by our canteen staff with quality ingredients.",
              delay: 0.2,
            },
            {
              icon: Check,
              title: "Secure Payments",
              description: "Pay securely using UPI apps like Google Pay, PhonePe, and more.",
              delay: 0.3,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 5,
              }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100 group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="h-6 w-6 text-green-600" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-green-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 text-white mt-auto relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-green-200/20 via-emerald-200/20 to-teal-200/20 transform skew-y-1"></div>
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="mr-3 h-10 w-10 bg-white rounded-xl p-1 shadow-lg"
                  whileHover={{ scale: 1.1, rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Y1rbpb7CLFU3YQpxLYY5CZN3Ps0o5t.png"
                    alt="Sahyadri Logo"
                    className="h-full w-full object-contain"
                  />
                </motion.div>
                <h3 className="text-lg font-semibold">Sahyadri Digital Canteen</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Skip the lines! Order your favorite campus food online and pick it up when it's ready.
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300 leading-relaxed">
                Sahyadri Campus, Adyar
                <br />
                Mangalore, Karnataka 575007
                <br />
                Phone: +91 9876543210
                <br />
                Email: canteen@sahyadri.edu.in
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <p className="text-gray-300 leading-relaxed">
                Monday - Friday: 8am - 6pm
                <br />
                Saturday: 9am - 4pm
                <br />
                Sunday: Closed
              </p>
            </motion.div>
          </div>
          <Separator className="my-6 bg-gradient-to-r from-transparent via-green-800 to-transparent h-px" />
          <motion.p
            className="text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Sahyadri Digital Canteen. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>

      {/* Mobile Cart Button */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -5, 0],
            boxShadow: [
              "0 10px 25px rgba(0, 128, 0, 0.3)",
              "0 15px 35px rgba(0, 128, 0, 0.4)",
              "0 10px 25px rgba(0, 128, 0, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Button
            size="lg"
            className="rounded-full h-16 w-16 shadow-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 border-4 border-white"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-7 w-7" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="absolute -top-2 -right-2"
                >
                  <Badge className="px-2 py-1 min-w-[1.5rem] min-h-[1.5rem] flex items-center justify-center bg-red-500 text-white shadow-lg text-sm font-bold">
                    {totalItems}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      {/* Mobile History Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Button
            size="icon"
            className="rounded-full h-14 w-14 shadow-xl bg-white border-2 border-green-200 hover:border-green-400 transition-all duration-300"
            onClick={() => setIsHistoryOpen(true)}
          >
            <History className="h-6 w-6 text-green-600" />
          </Button>
        </motion.div>
      </div>

      {/* Success Toast for Payment */}
      <AnimatePresence>
        {isPaymentSuccess && (
          <motion.div
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 flex items-center border border-green-200">
              <motion.div
                className="bg-green-100 rounded-full p-3 mr-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Check className="h-6 w-6 text-green-600" />
              </motion.div>
              <div>
                <h4 className="font-bold text-green-800">Payment Successful!</h4>
                <p className="text-sm text-muted-foreground">Your order is being prepared.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

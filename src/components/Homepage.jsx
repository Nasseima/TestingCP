import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import { Plane, MapPin, Sun, Moon, Cloud, Search, ArrowRight, Wind } from 'lucide-react'
// import Image from 'next/image'

// Weather widget assets
import clearIcon from '../assets/images/clear.png'
import cloudIcon from '../assets/images/cloud.png'
import mistIcon from '../assets/images/mist.png'
import rainIcon from '../assets/images/rain.png'
import snowIcon from '../assets/images/snow.png'
import errorIcon from '../assets/images/404.png'

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [time, setTime] = useState(new Date())

  // Weather widget state
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const images = [
    'https://ik.imagekit.io/vercel-v0/travel/beach.jpg',
    'https://ik.imagekit.io/vercel-v0/travel/city.jpg',
    'https://ik.imagekit.io/vercel-v0/travel/mountain.jpg',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)

    const clockTimer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(clockTimer)
    }
  }, [])

  // Weather widget functions
  const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091' // Replace with your API key

  const fetchWeather = async () => {
    if (city === '') return

    setLoading(true)
    setError(false)

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
      const data = await response.json()

      if (data.cod === '404') {
        setError(true)
        setWeatherData(null)
      } else {
        setWeatherData(data)
        setError(false)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleWeatherSearch = (e) => {
    e.preventDefault()
    fetchWeather()
  }

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return <Image src={clearIcon} alt="Clear" width={88} height={80} className="mx-auto" />
      case 'Rain':
        return <Image src={rainIcon} alt="Rain" width={88} height={80} className="mx-auto" />
      case 'Snow':
        return <Image src={snowIcon} alt="Snow" width={88} height={80} className="mx-auto" />
      case 'Clouds':
        return <Image src={cloudIcon} alt="Clouds" width={88} height={80} className="mx-auto" />
      case 'Mist':
        return <Image src={mistIcon} alt="Mist" width={88} height={80} className="mx-auto" />
      default:
        return <Image src={cloudIcon} alt="Unknown" width={88} height={80} className="mx-auto" />
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F3F5] text-[#2F2F2F]">
      {/* Hero Section with Asymmetrical Layout */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className={`bg-cover bg-center ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              style={{ backgroundImage: `url(${src})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImage ? 1 : 0.3 }}
              transition={{ duration: 1 }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#05668D]/80 to-transparent flex items-center justify-start p-12">
          <div className="max-w-2xl">
            <motion.h1
              className="text-6xl font-bold text-white mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Embark on Extraordinary Journeys
            </motion.h1>
            <motion.p
              className="text-xl text-white mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover hidden gems, create unforgettable memories, and explore the world's wonders
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button className="bg-[#F26419] hover:bg-[#F26419]/90 text-white text-lg px-8 py-6 rounded-full">
                Start Your Adventure <Plane className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weather Widget Section */}
      <section className="py-12 bg-[#05668D]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-white text-center">Check the Weather</h2>
          <div className="max-w-md mx-auto">
            <Card className="bg-[#02C39A] text-white overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-center">Weather Checker</h3>
                <form onSubmit={handleWeatherSearch} className="flex items-center space-x-2 mb-4">
                  <Input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value.toUpperCase())}
                    placeholder="Enter your city"
                    className="flex-grow p-2 border border-gray-300 rounded-lg text-gray-800 capitalize"
                  />
                  <Button type="submit" className="bg-[#F26419] hover:bg-[#F26419]/90">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                {loading && <p className="text-center">Loading...</p>}

                {error && (
                  <div className="text-center flex flex-col items-center">
                    <Image src={errorIcon} alt="Error" width={120} height={120} className="mb-2" />
                    <p>Oops! Location not found!</p>
                  </div>
                )}

                {weatherData && (
                  <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col items-center mb-4">
                      {getWeatherIcon(weatherData.weather[0].main)}
                      <p className="text-5xl font-bold mt-2">
                        {Math.round(weatherData.main.temp)}<span className="text-xl">°F</span>
                      </p>
                      <p className="text-lg capitalize">{weatherData.weather[0].description}</p>
                    </div>

                    <div className="flex justify-between w-full mt-4 space-x-4">
                      <div className="flex flex-col items-center">
                        <Cloud className="text-3xl mb-1" />
                        <span className="text-xl font-bold">{weatherData.main.humidity}%</span>
                        <span className="text-sm">Humidity</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Wind className="text-3xl mb-1" />
                        <span className="text-xl font-bold">{Math.round(weatherData.wind.speed)} Km/h</span>
                        <span className="text-sm">Wind Speed</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unique Search Section */}
      <section className="container mx-auto py-12 px-4">
        <Card className="bg-[#05668D] text-white overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="p-8 bg-[#02C39A]">
                <h2 className="text-3xl font-bold mb-4">Find Your Escape</h2>
                <p className="mb-4">Uncover your perfect destination with our intelligent travel search</p>
              </div>
              <div className="p-8 col-span-2">
                <div className="flex gap-4">
                  <Input placeholder="Where do you want to go?" className="flex-grow bg-white text-[#2F2F2F]" />
                  <Button className="bg-[#F26419] hover:bg-[#F26419]/90">
                    <Search className="mr-2 h-4 w-4" /> Explore
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Interactive Destination Showcase */}
      <section className="py-12 bg-[#9A8FD9]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-white text-center">Trending Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Paris', 'Tokyo', 'New York'].map((city, index) => (
              <motion.div
                key={index}
                className="group relative h-80 rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`https://ik.imagekit.io/vercel-v0/travel/${city.toLowerCase().replace(' ', '-')}.jpg`}
                  alt={city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{city}</h3>
                    <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Discover the magic of {city}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sun, title: 'Curated Experiences', color: '#F26419' },
              { icon: MapPin, title: 'Local Insights', color: '#02C39A' },
              { icon: Plane, title: 'Seamless Booking', color: '#05668D' },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <feature.icon className={`h-16 w-16 text-[${feature.color}]`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">Experience travel like never before with our unique offerings.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="py-24 bg-[#05668D] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <blockquote className="text-3xl md:text-5xl font-bold text-center italic">
            "The world is a book, and those who do not travel read only one page."
          </blockquote>
          <p className="text-xl md:text-2xl text-center mt-6">- Saint Augustine</p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://ik.imagekit.io/vercel-v0/travel/world-map.png"
            alt="World Map"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Newsletter Section with Unique Design */}
      <section className="py-12 bg-[#F0F3F5]">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-[#02C39A] to-[#05668D] text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2">Stay Inspired</h2>
                  <p className="text-lg">Get our latest travel tips and exclusive offers delivered to your inbox.</p>
                </div>
                <div className="flex w-full md:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white text-[#2F2F2F] rounded-r-none"
                  />
                  <Button className="bg-[#F26419] hover:bg-[#F26419]/90 rounded-l-none">
                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer with Unique Clock Feature */}
      <footer className="bg-[#2F2F2F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">WorldWander</h3>
              <p className="mb-4">Embark on extraordinary journeys and create unforgettable memories with WorldWander.</p>
              <div className="flex items-center space-x-4">
                <div className="bg-[#05668D] p-3 rounded-full">
                  {time.getHours() >= 6 && time.getHours() < 18 ? (
                    <Sun className="h-6 w-6" />
                  ) : (
                    <Moon className="h-6 w-6" />
                  )}
                </div>
                <div className="text-2xl font-bold">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            {['Destinations', 'Experiences', 'About Us', 'Contact'].map((section, index) => (
              <div key={index}>
                <h4 className="text-xl font-semibold mb-4">{section}</h4>
                <ul className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3'].map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="hover:text-[#02C39A] transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 WorldWander. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// import React from 'react';
// import Carousel from './Carousel';
// import WeatherWidget from './WeatherWidget';
// import Banner from '../assets/images/Banner.jpg'

// const HomePage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4">
//       {/* Navbar */}
      

//       {/* Banner */}
//       <div className="relative w-full mb-4">
//         <img
//           src={Banner}
//           alt="Banner"
//           className="w-full h-[300px] object-cover rounded-lg shadow-md"
//         />
//       </div>

//       {/* Main Content Container */}
//       <div className="flex justify-between items-start w-full max-w-6xl mx-auto mb-4">
//         <div className="flex-1">
//           <Carousel />
//         </div>
//         <div className="w-80 ml-4">
//           <WeatherWidget />
//         </div>
//       </div>


//     </div>
//   );
// };

// export default HomePage;

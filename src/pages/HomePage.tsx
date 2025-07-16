import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Mic, MessageCircle, FileText, Stethoscope, Activity, Shield, Sparkles, Heart, Brain, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuroraText } from '@/components/magicui/aurora-text';

const features = [
  {
    icon: Upload,
    title: 'X-ray Analysis',
    description: 'Advanced AI-powered chest X-ray analysis for pneumonia and TB detection',
    link: '/xray-diagnosis'
  },
  {
    icon: Mic,
    title: 'Cough Analysis',
    description: 'Audio-based cough classification for respiratory disease detection',
    link: '/cough-analysis'
  },
  {
    icon: MessageCircle,
    title: 'AI Chatbot',
    description: 'Interactive voice-enabled chatbot for health consultations',
    link: '/chatbot'
  },
  {
    icon: FileText,
    title: 'PDF Reports',
    description: 'Comprehensive health reports with all diagnostic results',
    link: '/pdf-report'
  }
];

const stats = [
  { icon: Stethoscope, value: '95%', label: 'Accuracy Rate' },
  { icon: Activity, value: '10k+', label: 'Diagnoses Made' },
  { icon: Shield, value: '100%', label: 'Secure & Private' }
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Enhanced Animated Medical Icons with Better Colors */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 text-blue-300/60"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Stethoscope className="w-8 h-8" />
          </motion.div>
          
          <motion.div
            className="absolute top-32 right-20 text-indigo-300/60"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Heart className="w-6 h-6" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-40 left-1/4 text-emerald-300/60"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <Brain className="w-7 h-7" />
          </motion.div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 text-sm font-medium mb-6 border border-blue-200/50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Healthcare Diagnostics
            </motion.div>
            
            <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block"
              >
                <AuroraText>
                SwasthSetu: AI-Powered
                </AuroraText>
              </motion.span>
           
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block bg-gradient-to-r from-blue-600 via-indigo-600  mb-8 bg-clip-text text-transparent"
              >
                Diagnosis Platform
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
            >
              Get instant, accessible disease predictions with just a chest X-ray or cough analysis. 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold"> Advanced AI technology</span> for better healthcare outcomes.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/xray-diagnosis">
                  <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload X-ray
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/chatbot">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Try Chatbot
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/cough-analysis">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <Mic className="w-5 h-5 mr-2" />
                    Upload Cough
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white/90 via-blue-50/30 to-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-full mb-6 shadow-lg border border-blue-200/50"
                >
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mx-auto mb-6 rounded-full"
            />
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Diagnostic Features
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our AI-powered platform offers multiple diagnostic tools to provide accurate 
              and accessible healthcare solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Link to={feature.link}>
                  <Card className="h-full cursor-pointer hover:shadow-2xl transition-all duration-500 group-hover:border-indigo-300 bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg">
                    <CardHeader className="text-center">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl mb-6 mx-auto group-hover:from-blue-200 group-hover:via-indigo-200 group-hover:to-purple-200 transition-all duration-300 shadow-lg border border-blue-200/50"
                      >
                        <feature.icon className="w-8 h-8 text-blue-600" />
                      </motion.div>
                      <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors duration-300">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
import { motion } from 'framer-motion';
import { Activity, Shield, Zap, Users, Award, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Analysis',
    description: 'Get diagnostic results in seconds with our advanced AI algorithms trained on thousands of medical images and audio samples.'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Your health data is protected with enterprise-grade encryption and never stored permanently on our servers.'
  },
  {
    icon: Activity,
    title: 'Medical-Grade Accuracy',
    description: 'Our AI models achieve 95%+ accuracy, validated against clinical datasets and continuously improved by medical experts.'
  },
  {
    icon: Users,
    title: 'Accessible Healthcare',
    description: 'Breaking barriers to healthcare access with AI-powered diagnostics available anytime, anywhere.'
  }
];

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief Medical Officer',
    description: 'Pulmonologist with 15 years of experience in respiratory medicine and AI healthcare applications.'
  },
  {
    name: 'Alex Rodriguez',
    role: 'AI Research Lead',
    description: 'PhD in Computer Vision, specialized in medical image analysis and deep learning architectures.'
  },
  {
    name: 'Dr. Michael Patel',
    role: 'Clinical Advisor',
    description: 'Radiologist and healthcare technology expert, ensuring clinical accuracy and user safety.'
  }
];

const stats = [
  { value: '10,000+', label: 'Diagnoses Made' },
  { value: '95%', label: 'Accuracy Rate' },
  { value: '50+', label: 'Hospitals Partner' },
  { value: '24/7', label: 'Availability' }
];

export function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About SwasthSetu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing healthcare accessibility through AI-powered diagnostic tools. 
            Our mission is to make accurate medical diagnosis available to everyone, everywhere.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    To democratize healthcare by providing AI-powered diagnostic tools that are 
                    accurate, accessible, and affordable. We believe that early detection and 
                    timely intervention can save lives and improve health outcomes globally.
                  </p>
                  <div className="flex items-center text-blue-700">
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="font-medium">Powered by compassion, driven by innovation</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Activity className="w-32 h-32 text-blue-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SwasthSetu?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology and medical expertise to deliver reliable, 
              fast, and secure healthcare solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Led by world-class medical professionals and AI researchers committed to 
              advancing healthcare through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="w-10 h-10 text-gray-400" />
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-gray-50">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Technology</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                  SwasthSetu leverages state-of-the-art deep learning models, including convolutional 
                  neural networks for image analysis and recurrent neural networks for audio processing. 
                  Our models are trained on diverse, anonymized datasets and continuously validated 
                  by medical experts to ensure the highest standards of accuracy and reliability.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                  <div className="p-4 bg-white rounded-lg">
                    <strong className="text-gray-900">X-ray Analysis:</strong><br />
                    Computer Vision + CNN for pneumonia and TB detection
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <strong className="text-gray-900">Audio Processing:</strong><br />
                    Signal processing + RNN for cough classification
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <strong className="text-gray-900">Natural Language:</strong><br />
                    Transformer models for medical chatbot interactions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <p className="text-sm text-yellow-800 text-center">
            <strong>Important:</strong> SwasthSetu is designed to assist healthcare professionals and provide 
            preliminary health insights. It is not intended to replace professional medical diagnosis, 
            treatment, or consultation. Always seek advice from qualified healthcare providers for 
            medical concerns.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
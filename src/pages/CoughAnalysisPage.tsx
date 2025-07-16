import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Upload, Play, Store as Stop, Volume2, AudioWaveform as Waveform, Headphones, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CoughAnalysisPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    coughType: string;
    confidence: number;
    characteristics: string[];
    recommendation: string;
  } | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const file = new File([blob], 'cough-recording.wav', { type: 'audio/wav' });
        setAudioFile(file);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!audioFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Mock results
    const mockResults = [
      {
        coughType: 'Productive Cough (Pneumonia)',
        confidence: 87,
        characteristics: ['Wet/Productive', 'Low frequency', 'Extended duration'],
        recommendation: 'Consult a healthcare provider for possible bacterial infection treatment.'
      },
      {
        coughType: 'Normal Cough',
        confidence: 92,
        characteristics: ['Dry', 'Normal frequency', 'Short duration'],
        recommendation: 'No immediate concern. Monitor symptoms and stay hydrated.'
      },
      {
        coughType: 'Tuberculosis Cough',
        confidence: 78,
        characteristics: ['Persistent', 'Blood-tinged', 'Night sweats associated'],
        recommendation: 'Urgent medical consultation required for TB testing and treatment.'
      }
    ];
    
    setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
    setIsAnalyzing(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Audio Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-24 right-16 text-blue-200"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Headphones className="w-8 h-8" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-32 left-12 text-green-200"
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Radio className="w-6 h-6" />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6"
          >
            <Mic className="w-4 h-4 mr-2" />
            Audio-Based Health Analysis
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Cough Analysis
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Record or upload your cough audio for AI-powered respiratory health analysis.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle>Audio Input</CardTitle>
                <CardDescription>
                  Record a cough sample or upload an audio file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="record" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="record">Record</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="record" className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50/50 transition-all duration-300"
                    >
                      {isRecording ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-4"
                        >
                          <div className="relative">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.3, 1],
                                boxShadow: [
                                  "0 0 0 0 rgba(239, 68, 68, 0.7)",
                                  "0 0 0 20px rgba(239, 68, 68, 0)",
                                  "0 0 0 0 rgba(239, 68, 68, 0)"
                                ]
                              }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto flex items-center justify-center shadow-lg"
                            >
                              <Mic className="w-12 h-12 text-white" />
                            </motion.div>
                          </div>
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="text-lg font-medium"
                          >
                            Recording...
                          </motion.div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-mono font-bold text-red-600"
                          >
                            {formatTime(recordingTime)}
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button onClick={stopRecording} variant="destructive" size="lg">
                            <Stop className="w-4 h-4 mr-2" />
                            Stop Recording
                            </Button>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <div className="space-y-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Mic className="w-16 h-16 text-gray-400 mx-auto" />
                          </motion.div>
                          <div className="text-lg font-medium">Record Cough Sample</div>
                          <p className="text-sm text-gray-500 mb-4">
                            Click to start recording your cough (10-15 seconds recommended)
                          </p>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button onClick={startRecording} size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                            <Mic className="w-4 h-4 mr-2" />
                            Start Recording
                            </Button>
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="upload" className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300"
                    >
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="audio-upload"
                      />
                      <label
                        htmlFor="audio-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Volume2 className="w-12 h-12 text-gray-400 mb-4" />
                        </motion.div>
                        <span className="text-lg font-medium text-gray-900 mb-2">
                          Choose audio file
                        </span>
                        <span className="text-sm text-gray-500">
                          MP3, WAV, or M4A format
                        </span>
                      </label>
                    </motion.div>
                  </TabsContent>
                </Tabs>

                {audioFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-4 mt-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-50 rounded-xl shadow-inner"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <Waveform className="w-5 h-5 text-blue-600" />
                          </motion.div>
                          <span className="font-medium">{audioFile.name}</span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="cursor-pointer"
                        >
                          <Play className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                      >
                      {isAnalyzing ? 'Analyzing Audio...' : 'Analyze Cough'}
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  Audio-based cough classification and health insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="text-center py-8">
                        <motion.div
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                            scale: { repeat: Infinity, duration: 1.5 }
                          }}
                          className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <p className="text-gray-600">Analyzing audio patterns...</p>
                        </motion.div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Processing audio</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} />
                      </div>
                    </motion.div>
                  )}

                  {result && !isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Alert className={`border-l-4 shadow-lg ${
                        result.coughType.includes('Normal') ? 'border-green-500' : 'border-red-500'
                      }`}>
                          <Volume2 className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Classification:</strong> {result.coughType}
                          </AlertDescription>
                        </Alert>
                      </motion.div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Confidence Level</span>
                            <span className="text-sm font-bold">{result.confidence}%</span>
                          </div>
                          <Progress value={result.confidence} className="h-2" />
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="p-4 bg-gray-50 rounded-xl shadow-inner"
                        >
                          <h4 className="font-medium mb-2">Characteristics Detected</h4>
                          <div className="space-y-1">
                            {result.characteristics.map((char, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="flex items-center text-sm"
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                                {char}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="p-4 bg-green-50 rounded-xl shadow-inner"
                        >
                          <h4 className="font-medium mb-2 text-blue-900">Recommendation</h4>
                          <p className="text-sm text-blue-800">{result.recommendation}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {!audioFile && !isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="text-center py-12 text-gray-500"
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Volume2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      </motion.div>
                      <p>Record or upload audio to see analysis results</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
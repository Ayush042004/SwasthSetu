import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Eye, FileImage, AlertCircle, CheckCircle, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function XrayDiagnosisPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    description: string;
    severity: 'low' | 'medium' | 'high';
  } | null>(null);
  const [allScores, setAllScores] = useState<{ [key: string]: number } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setResult(null);
        setAllScores(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    setResult(null);
    setAllScores(null);

    try {
      const fileInput = document.getElementById("xray-upload") as HTMLInputElement;
      if (!fileInput.files || fileInput.files.length === 0) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("image", fileInput.files[0]);

      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;

      setAllScores(data); // Show all percentages

      const entries = Object.entries(data);
      const [topDisease, topConfidence] = entries.reduce((max, curr) =>
        curr[1] > max[1] ? curr : max
      );

      const descriptions: Record<string, string> = {
        TB: "Possible signs of tuberculosis. Further clinical evaluation is advised.",
        COVID: "COVID-19 indicators detected in the lungs. Follow-up RT-PCR test is recommended.",
        PNEUMONIA: "Signs of pneumonia detected. Suggested further chest examination.",
      };

      const severity: Record<string, 'low' | 'medium' | 'high'> = {
        TB: topConfidence > 80 ? "high" : topConfidence > 50 ? "medium" : "low",
        COVID: topConfidence > 80 ? "high" : topConfidence > 50 ? "medium" : "low",
        PNEUMONIA: topConfidence > 80 ? "high" : topConfidence > 50 ? "medium" : "low",
      };

      setResult({
        disease: topDisease === "TB" ? "Tuberculosis" : topDisease,
        confidence: topConfidence,
        description: descriptions[topDisease],
        severity: severity[topDisease],
      });
    } catch (error: any) {
      alert(error?.response?.data?.error || error.message || "Error during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-32 right-10 text-blue-200"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-10 text-indigo-200"
            animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6"
          >
            <FileImage className="w-4 h-4 mr-2" />
            AI-Powered X-ray Analysis
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            X-ray Diagnosis
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Upload a chest X-ray image for AI-powered analysis to detect TB, COVID, and pneumonia.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Card */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload X-ray Image
                </CardTitle>
                <CardDescription>Select a chest X-ray image (JPEG or PNG)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="xray-upload"
                  />
                  <label
                    htmlFor="xray-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FileImage className="w-12 h-12 text-gray-400 mb-4" />
                    <span className="text-lg font-medium text-gray-900 mb-2">Choose X-ray file</span>
                    <span className="text-sm text-gray-500">or drag and drop it here</span>
                  </label>
                </motion.div>

                {uploadedImage && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={uploadedImage}
                        alt="Uploaded X-ray"
                        className="w-full h-64 object-cover border shadow-lg"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze X-ray'}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Card */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>AI confidence and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {isAnalyzing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="text-center py-8">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
                        <p className="text-gray-600">Analyzing X-ray image...</p>
                      </div>
                      <Progress value={100} />
                    </motion.div>
                  )}

                  {result && !isAnalyzing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <Alert
                        className={`border-l-4 shadow-lg ${
                          result.severity === 'low'
                            ? 'border-green-500'
                            : result.severity === 'medium'
                            ? 'border-yellow-500'
                            : 'border-red-500'
                        }`}
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Diagnosis:</strong> {result.disease}
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Confidence Level</span>
                          <span>{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2" />
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-gray-600">{result.description}</p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl shadow-inner">
                        <h4 className="font-medium mb-2 text-blue-900">Recommendation</h4>
                        <p className="text-sm text-blue-800">
                          {result.disease === 'Normal'
                            ? 'Continue regular health checkups.'
                            : 'Please consult a healthcare professional for further testing.'}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {allScores && !isAnalyzing && (
                    <div className="mt-6">
                      <h4 className="text-md font-semibold mb-3 text-gray-800">All Confidence Scores</h4>
                      {Object.entries(allScores).map(([disease, score]) => (
                        <div key={disease} className="mb-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>{disease}</span>
                            <span>{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
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

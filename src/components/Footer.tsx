import { Activity, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">SwasthSetu</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for better healthcare accessibility</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; 2025 SwasthSetu. All rights reserved. This is a demo application for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
}
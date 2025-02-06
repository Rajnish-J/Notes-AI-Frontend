/* eslint-disable react/prop-types */
// InputSection.jsx
export default function InputSection({
    inputText,
    handleInputChange,
    handleFileUpload,
    flavor,
    setFlavor,
    handleSubmit,
    loading,
    clearChat,
  }) {
    return (
      <div className="p-4 bg-gray-700 border-t border-gray-600 md:w-96">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Type Your Message:</label>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter your text here..."
              className="w-full p-3 bg-gray-600 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
  
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Upload a Text File:</label>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="w-full p-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Flavor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Choose Tone:</label>
            <select
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              className="w-full p-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="concise">Concise</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
  
          {/* Submit Button and Clear Chat Button */}
          <div className="flex justify-between items-center">
            <button
              onClick={clearChat}
              className="py-2 px-4 bg-red-600 text-white rounded-lg transition duration-300 hover:bg-red-700"
            >
              Clear Chat
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg transition duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
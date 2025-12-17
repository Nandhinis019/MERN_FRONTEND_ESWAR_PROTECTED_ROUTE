import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m your ZOVAi shopping assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickQuestions = [
    'Find electronics under ₹5000',
    'Show me trending products',
    'Help with return policy',
    'Track my order'
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    // Generate bot response (in real app, this would call an AI API)
    const botResponse = {
      id: messages.length + 2,
      type: 'bot',
      message: generateBotResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputMessage('');
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('electronics') || input.includes('phone') || input.includes('laptop')) {
      return 'I found some great electronics for you! Check out our latest smartphones and laptops with amazing discounts. Would you like me to show you products under a specific budget?';
    }
    
    if (input.includes('return') || input.includes('refund')) {
      return 'Our return policy allows returns within 7 days of delivery. Items should be in original condition. You can initiate a return from your Orders page. Need help with a specific order?';
    }
    
    if (input.includes('track') || input.includes('order')) {
      return 'You can track your orders by going to "Your Orders" section in your account. Each order shows real-time tracking information. Do you need help finding a specific order?';
    }
    
    if (input.includes('discount') || input.includes('offer')) {
      return 'Great news! We have ongoing discounts up to 80% off on various categories. Click the "Offers" button in the header to see all discounted products. What category interests you?';
    }
    
    return 'I\'d be happy to help you with that! You can browse our products, check out current offers, or ask me about specific items you\'re looking for. What would you like to explore?';
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot size={20} />
          <span className="font-semibold">ZOVAi Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-orange-600 p-1 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {msg.type === 'bot' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                {msg.type === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
          <div className="space-y-1">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="w-full text-left text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
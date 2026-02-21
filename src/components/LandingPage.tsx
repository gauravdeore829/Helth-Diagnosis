import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Users, Phone, BookOpen, Gamepad2 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">MindCare</span>
            </div>
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your Mental Health Journey Starts Here
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A comprehensive digital platform designed specifically for higher education students,
            providing gamified stress relief, professional support, and peer community.
          </p>
          <Link
            to="/auth"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Wellness Journey
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Comprehensive Mental Health Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <Gamepad2 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Gamified Stress Relief</h3>
              <p className="text-gray-600">Interactive games, music therapy, shopping rewards, and food delivery to boost your mood.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <BookOpen className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Resource Library</h3>
              <p className="text-gray-600">Comprehensive guides on stress, anxiety, depression, and wellness techniques.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <Heart className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Professional Support</h3>
              <p className="text-gray-600">Connect with licensed therapists and counselors through video consultations.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl">
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Peer Community</h3>
              <p className="text-gray-600">Join support groups and connect with fellow students facing similar challenges.</p>
            </div>
            <div className="bg-red-50 p-6 rounded-xl">
              <Phone className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-gray-600">Access helplines, crisis support, and instant chat assistance anytime.</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl">
              <Brain className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Mental Health Assessment</h3>
              <p className="text-gray-600">Personalized assessments to understand your mental health needs and progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Emergency Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-red-600">Crisis Helpline</h3>
              <p className="text-2xl font-bold text-gray-900">988 (Suicide & Crisis Lifeline)</p>
              <p className="text-gray-600 mt-2">24/7 free and confidential support</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Student Support</h3>
              <p className="text-2xl font-bold text-gray-900">1-800-STUDENT</p>
              <p className="text-gray-600 mt-2">Dedicated student mental health line</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-8 w-8 text-blue-400 mr-3" />
            <span className="text-2xl font-bold">MindCare</span>
          </div>
          <p className="text-gray-400">Supporting student mental health, one step at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
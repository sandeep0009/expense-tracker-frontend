import { Button } from "@/components/ui/button";
import { Banknote, Bell, Calculator, ChartPie, Check, Clock, DollarSign, Download, LightbulbIcon, Linkedin, LockKeyhole, PieChart } from "lucide-react";
import { Github } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router=useNavigate();
    const handleStarted=()=>{
        router('/signup');
        
    }
    return (
        <div className="relative">
            <div className="fixed top-0 left-0 w-full bg-white z-50">
                <div className="max-w-8xl mx-auto p-6">
                    <div className="flex justify-between items-center font-normal">
                        <h2 className="text-xl font-semibold">Pocket Pilot</h2>
                        <div className="hidden md:flex gap-8">
                            <ul className="flex gap-4 items-center px-2">
                                <li className="cursor-pointer hover:text-gray-600">Home</li>
                                <li className="cursor-pointer hover:text-gray-600">Features</li>
                                <li className="cursor-pointer hover:text-gray-600">Benefits</li>
                                <li className="cursor-pointer hover:text-gray-600">FAQ</li>
                            </ul>
                            <Button size="sm" className="h-8" onClick={handleStarted}>Get Started</Button>
                        </div>
                        <button
                            className="md:hidden p-2 rounded-lg"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4">
                    <ul className="flex flex-col gap-4 text-center">
                        <li className="cursor-pointer hover:text-gray-600">Home</li>
                        <li className="cursor-pointer hover:text-gray-600">Features</li>
                        <li className="cursor-pointer hover:text-gray-600">Benefits</li>
                        <li className="cursor-pointer hover:text-gray-600">FAQ</li>
                    </ul>
                    <div className="flex justify-center mt-4">
                        <Button size="sm" className="h-8" onClick={handleStarted}>Get Started</Button>
                    </div>
                </div>
            )}

            <div className="bg-neutral-900 w-full min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md w-full mt-20">
                    <h2 className="text-5xl text-white font-bold">
                        Track Your Expense
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            {" "}Smarter
                        </span>
                    </h2>
                    <p className="text-gray-300 py-4">
                        Take control of your finances with our intuitive expense tracking solution.
                        Monitor, analyze, and optimize your spending habits effortlessly.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Button size="lg" className="bg-blue-700 hover:bg-blue-600" onClick={handleStarted}>Sign In</Button>
                        <Button size="lg" className="bg-neutral-900 border border-white text-white hover:bg-neutral-800" onClick={handleStarted}>
                            Watch Demo
                        </Button>
                    </div>
                    <div className="flex justify-center gap-4 pt-4">
                        <h4 className="flex items-center gap-2 text-slate-300">
                            <Check size={18} className="text-green-400" /> Free Forever
                        </h4>
                        <h4 className="flex items-center gap-2 text-slate-300">
                            <Check size={18} className="text-green-400" /> Free Analytics
                        </h4>
                        <h4 className="flex items-center gap-2 text-slate-300">
                            <Check size={18} className="text-green-400" /> Free Dashboard
                        </h4>
                    </div>
                </div>
            </div>

            <div className="text-center mt-20">
                <div>
                    <h2 className="text-4xl font-normal font-sans">Powerful Features</h2>
                    <p className="text-xl text-slate-700 py-6">Everything you need to manage your expenses effectively</p>
                </div>

            </div>

            <div className="max-w-8xl m-auto md:p-16 p-2">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                    <div className="hover:shadow-lg items-start md:w-96 w-full md:h-56 h-44 space-y-2 px-4 rounded-lg">

                        <div className="bg-blue-600 p-3 rounded-full w-fit">
                            <Calculator className="text-white" size={30} />
                        </div>
                        <h2 className="text-2xl font-bold">Expense Tracking</h2>
                        <p className="text-slate-700">Track your daily expenses with ease. Categorize and monitor your spending patterns in real-time.</p>

                    </div>
                    <div className="hover:shadow-lg items-start md:w-96 w-full md:h-56 h-44  space-y-4 px-4 rounded-lg">

                        <div className="bg-purple-600 p-3 rounded-full w-fit">
                            <ChartPie className="text-white" size={30} />
                        </div>
                        <h2 className="text-2xl font-bold">Smart Analytics</h2>
                        <p className="text-slate-700">Get detailed insights and visualizations of your spending habits with intuitive charts and reports..</p>

                    </div>
                    <div className="hover:shadow-lg items-start md:w-96 w-full md:h-56 h-44  space-y-4 px-4 rounded-lg">

                        <div className="bg-green-600 p-3 rounded-full w-fit">
                            <Clock className="text-white" size={30} />
                        </div>
                        <h2 className="text-2xl font-bold">Budget Planning</h2>
                        <p className="text-slate-700">Set and manage budgets for different categories. Get notifications when you're close to limits.</p>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mt-12">
                    <div className="hover:shadow-lg items-start md:w-96 w-full md:h-56 h-44 space-y-2 px-4 rounded-lg">

                        <div className="bg-red-500 p-3 rounded-full w-fit">
                            <Banknote className="text-white" size={30} />
                        </div>
                        <h2 className="text-2xl font-bold">Bill Reminders</h2>
                        <p className="text-slate-700">Never miss a payment with automated bill reminders and payment tracking.</p>

                    </div>
                    <div className="hover:shadow-lg items-start md:w-96 w-full md:h-56 h-44  space-y-4 px-4 rounded-lg">

                        <div className="bg-yellow-400 p-3 rounded-full w-fit">
                            <LockKeyhole className="text-white" size={30} />
                        </div>
                        <h2 className="text-2xl font-bold">Secure Data</h2>
                        <p className="text-slate-700">Your financial data is encrypted and securely stored with bank-level security protocols.</p>

                    </div>
                    <div className="hover:shadow-lg items-start md:w-96 w-full md:h-56 h-44  space-y-4 px-4 rounded-lg">

                        <div className="bg-purple-600 p-3 rounded-full w-fit">
                            <Download className="text-white" size={30} />
                        </div>
                        <h2 className="text-2xl font-bold">Export Reports</h2>
                        <p className="text-slate-700">Export your financial reports in multiple formats for easy sharing and analysis.</p>

                    </div>

                </div>
            </div>
            <div className="bg-neutral-900 min-h-screen w-full">
                <div className="text-center text-white py-12 space-y-2">
                    <h2 className="md:text-4xl text-2xl font-bold">Why Choose ExpenseTracker?</h2>
                    <p className="text-slate-300 text-xl font-normal">Transform your financial management with our powerful tools</p>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:p-6 p-2 gap-6 ">
                    <div className="flex justify-between text-white gap-4 md:space-y-2  space-y-4 items-center">
                        <div className="bg-blue-600 rounded-lg w-fit h-fit p-3 items-center">
                            <LightbulbIcon className="text-white" size={32}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Lightning Fast Setup</h2>
                            <p className="text-slate-200">Get started in minutes with our intuitive onboarding process. No complex configurations needed.</p>
                        </div>

                    </div>
                    <div className="flex justify-between text-white gap-4 md:space-y-2  space-y-4 items-center">
                        <div className="bg-red-500 rounded-lg w-fit h-fit p-3 items-center">
                            <PieChart className="text-white" size={32}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Real-Time Analytics</h2>
                            <p className="text-slate-200">Get instant insights into your spending patterns with beautiful visual reports.</p>
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:p-6 p-2 gap-6">
                    <div className="flex justify-between text-white gap-4 space-y-2 items-center">
                        <div className="bg-purple-600 rounded-lg w-fit h-fit p-3 items-center">
                            <LockKeyhole className="text-white" size={32}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Bank-Grade Security</h2>
                            <p className="text-slate-200">Your financial data is protected with enterprise-level encryption and security measures.</p>
                        </div>

                    </div>
                    <div className="flex justify-between text-white gap-4 md:space-y-2  space-y-4 items-center">
                        <div className="bg-yellow-500 rounded-lg w-fit h-fit p-3 items-center">
                            <Bell className="text-white" size={32}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Smart Alerts</h2>
                            <p className="text-slate-200">Receive timely notifications about unusual spending and budget limits.</p>
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:p-6 p-2 gap-6">
                    <div className="flex justify-between text-white gap-4 md:space-y-2  space-y-4 items-center">
                        <div className="bg-green-600 rounded-lg w-fit h-fit p-3 items-center">
                            <DollarSign className="text-white" size={32}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Smart Savings</h2>
                            <p className="text-slate-200">Automated insights help you identify savings opportunities and optimize your spending.</p>
                        </div>

                    </div>
                    <div className="flex justify-between text-white gap-4 md:space-y-2  space-y-4 items-center">
                        <div className="bg-purple-400 rounded-lg w-fit h-fit p-3 items-center">
                            <Clock className="text-white" size={32}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">24/7 Availability</h2>
                            <p className="text-slate-200">Access your financial data anytime, anywhere with our cloud-based solution.</p>
                        </div>

                    </div>

                </div>

            </div>

            <div className="max-w-4xl mx-auto mt-20 p-6">
                <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="q1">
                        <AccordionTrigger>How does Expense Tracker work?</AccordionTrigger>
                        <AccordionContent>
                            Expense Tracker helps you monitor your spending by categorizing transactions and providing insightful reports.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q2">
                        <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                        <AccordionContent>
                            Yes, we use bank-grade encryption and security protocols to protect your financial information.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q3">
                        <AccordionTrigger>Can I set up spending limits?</AccordionTrigger>
                        <AccordionContent>
                            Absolutely! You can set budgets for different categories and receive alerts when you're nearing your limit.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q4">
                        <AccordionTrigger>Does it support multiple currencies?</AccordionTrigger>
                        <AccordionContent>
                            Yes, our platform supports multiple currencies to accommodate international users.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q5">
                        <AccordionTrigger>Is Expense Tracker free to use?</AccordionTrigger>
                        <AccordionContent>
                            Yes, we offer a free version with essential features. A premium version is also available for advanced tools.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="bg-neutral-900 w-full py-10 px-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        <div className="flex flex-col items-start text-left max-w-md">
          <h2 className="text-xl font-bold">Pocket Pilot</h2>
          <p className="mt-2">
            Simplifying expense management for everyone. Track, analyze, and optimize your spending with ease.
          </p>
          <div className="flex gap-4 mt-4">
            <Github />
            <Linkedin />
          </div>
        </div>
        <div className="flex flex-col items-start space-y-4">
          <h3 className="font-bold">Quick Links</h3>
          <ul className="space-y-2">
            <li>Features</li>
            <li>Pricing</li>
            <li>Testimonials</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="flex flex-col items-start space-y-4">
          <h3 className="font-bold">Resources</h3>
          <ul className="space-y-2">
            <li>Blog</li>
            <li>Help Center</li>
            <li>Documentation</li>
            <li>API Reference</li>
          </ul>
        </div>
        <div className="flex flex-col items-start space-y-4">
          <h3 className="font-bold">Stay Updated</h3>
          <p>Subscribe to our newsletter for tips and updates.</p>
          <div className="flex flex-col w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-neutral-800 text-white placeholder-gray-400"
            />
            <button className="mt-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
        © 2025 Pocket Pilot. All rights reserved.
        <div className="flex justify-center space-x-6 mt-2">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </div>

        </div>
    );
};

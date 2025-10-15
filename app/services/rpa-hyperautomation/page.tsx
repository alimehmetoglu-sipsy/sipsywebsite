'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Bot,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Users,
  TrendingDown,
  Clock,
  CheckCircle,
  Zap,
  Brain,
  Settings,
  BarChart,
  FileText,
  Database,
  Shield,
  Linkedin,
  Twitter,
  Github,
  Download,
  Calendar,
  ArrowRight,
  Code,
  Search,
  Target,
  Wrench,
  Repeat,
  Activity,
} from 'lucide-react';

export default function RPAServicePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedUseCase, setExpandedUseCase] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // ROI Calculator state
  const [employees, setEmployees] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(50);
  const [showROI, setShowROI] = useState(false);

  const calculateROI = () => {
    const annualHours = employees * hoursPerWeek * 52;
    const annualCost = annualHours * hourlyCost;
    const savings = annualCost * 0.7; // 70% savings on average
    return Math.round(savings);
  };

  const useCases = [
    {
      title: 'Invoice Processing',
      description: 'Automate extraction, validation, approval routing - 500+ invoices/day',
      before: '8 hours per day',
      after: '30 minutes per day',
      timeSaved: '94%',
      roi: '450% first year',
    },
    {
      title: 'Customer Onboarding',
      description: 'Reduce onboarding time from 2 days to 2 hours',
      before: '2 days per customer',
      after: '2 hours per customer',
      timeSaved: '87.5%',
      roi: '380% first year',
    },
    {
      title: 'Data Migration',
      description: 'Move data between systems accurately and quickly',
      before: '40 hours per migration',
      after: '2 hours per migration',
      timeSaved: '95%',
      roi: '520% first year',
    },
    {
      title: 'Report Generation',
      description: 'Automatic daily/weekly/monthly reports from multiple sources',
      before: '20 hours per week',
      after: '1 hour per week',
      timeSaved: '95%',
      roi: '490% first year',
    },
    {
      title: 'Email Processing',
      description: 'Intelligent email parsing, categorization, and response',
      before: '15 hours per week',
      after: '2 hours per week',
      timeSaved: '87%',
      roi: '410% first year',
    },
    {
      title: 'Database Operations',
      description: 'Automated data validation, cleanup, and synchronization',
      before: '12 hours per week',
      after: '1 hour per week',
      timeSaved: '92%',
      roi: '440% first year',
    },
    {
      title: 'Employee Offboarding',
      description: 'Systematic account closure across all systems',
      before: '4 hours per employee',
      after: '15 minutes per employee',
      timeSaved: '94%',
      roi: '360% first year',
    },
    {
      title: 'Compliance Reporting',
      description: 'Automated audit trail and compliance documentation',
      before: '30 hours per month',
      after: '3 hours per month',
      timeSaved: '90%',
      roi: '470% first year',
    },
  ];

  const faqs = [
    {
      question: 'How long does RPA implementation take?',
      answer:
        'Our typical implementation timeline is 6-12 weeks from discovery to deployment. We can have your first automation live within 30 days for quick wins, with full deployment complete in 90 days. The timeline varies based on process complexity and the number of systems involved.',
    },
    {
      question: 'What processes are good candidates for automation?',
      answer:
        'Ideal candidates are high-volume, repetitive, rule-based processes with structured data inputs. Examples include invoice processing, data entry, report generation, email processing, and customer onboarding. We conduct a thorough assessment to identify processes with the highest ROI potential.',
    },
    {
      question: 'Do we need to change our existing systems?',
      answer:
        'No! That&apos;s the beauty of RPA. Our bots work with your existing applications through the user interface, just like a human would. There&apos;s no need for APIs, integrations, or system changes. This means faster implementation and lower risk.',
    },
    {
      question: 'What happens if our process changes?',
      answer:
        'Our bots are built with flexibility in mind. Minor process changes can be accommodated with simple configuration updates. For major changes, we provide ongoing support and optimization services to ensure your automations continue to deliver value. We also build robust error handling to gracefully manage unexpected scenarios.',
    },
    {
      question: 'How do we measure ROI?',
      answer:
        'We establish clear KPIs before implementation, including time saved, error reduction, cost savings, and processing speed improvements. Our managed services include monthly reporting with detailed metrics. Most clients see positive ROI within 3-6 months, with an average 300% ROI in the first year.',
    },
    {
      question: 'What about security and compliance?',
      answer:
        'Security is paramount. We follow ISO 27001 standards, maintain SOC 2 compliance, and implement bot-specific credentials with granular access controls. All bot activities are logged for audit trails. We work with your security team to ensure compliance with your policies and industry regulations.',
    },
    {
      question: 'Can we manage bots ourselves after implementation?',
      answer:
        'Absolutely! We provide comprehensive training and documentation so your team can manage day-to-day operations. However, many clients prefer our managed services for 24/7 monitoring, maintenance, and optimization, allowing their teams to focus on strategic initiatives.',
    },
    {
      question: 'What ongoing support do you provide?',
      answer:
        'We offer flexible support options from basic break-fix support to comprehensive managed services. Our managed services include 24/7 monitoring, proactive maintenance, monthly optimization reviews, incident response, and continuous improvement recommendations.',
    },
  ];

  return (
    <>
      {/* Navigation Bar - Same as Homepage */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-navy-900">sipsy.ai</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="/#solutions"
                className="font-medium text-gray-700 hover:text-brand-secondary transition-colors"
              >
                Solutions
              </a>
              <a
                href="/#services"
                className="font-medium text-gray-700 hover:text-brand-secondary transition-colors"
              >
                Services
              </a>
              <a
                href="/#case-studies"
                className="font-medium text-gray-700 hover:text-brand-secondary transition-colors"
              >
                Case Studies
              </a>
              <a
                href="/#resources"
                className="font-medium text-gray-700 hover:text-brand-secondary transition-colors"
              >
                Resources
              </a>
              <a
                href="/#about"
                className="font-medium text-gray-700 hover:text-brand-secondary transition-colors"
              >
                About
              </a>
              <a
                href="/#contact"
                className="font-medium text-gray-700 hover:text-brand-secondary transition-colors"
              >
                Contact
              </a>
              <button className="bg-brand-accent hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                Schedule Free Assessment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-navy-900" />
              ) : (
                <Menu className="text-navy-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
            <div className="container-custom py-8 space-y-6">
              <a
                href="/#solutions"
                className="block text-lg font-medium text-gray-700 hover:text-brand-secondary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </a>
              <a
                href="/#services"
                className="block text-lg font-medium text-gray-700 hover:text-brand-secondary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/#case-studies"
                className="block text-lg font-medium text-gray-700 hover:text-brand-secondary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Studies
              </a>
              <a
                href="/#resources"
                className="block text-lg font-medium text-gray-700 hover:text-brand-secondary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </a>
              <a
                href="/#about"
                className="block text-lg font-medium text-gray-700 hover:text-brand-secondary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/#contact"
                className="block text-lg font-medium text-gray-700 hover:text-brand-secondary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <button className="w-full bg-brand-accent hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 mt-4">
                Schedule Free Assessment
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden pt-20">
          {/* Subtle Automation Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-brand-secondary rounded-lg rotate-12"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-4 border-brand-accent rounded-lg -rotate-12"></div>
            <div className="absolute top-1/2 right-1/3 w-32 h-32 border-4 border-brand-secondary rounded-full"></div>
          </div>

          <div className="container-custom relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-brand-secondary">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/#services" className="hover:text-brand-secondary">
                Services
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-navy-900 font-medium">RPA & Hyperautomation</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-6xl font-bold text-navy-900 leading-tight">
                  RPA & Hyperautomation Solutions
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Eliminate repetitive manual tasks and reclaim 40% of your team&apos;s time with
                  intelligent process automation
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-brand-accent hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule RPA Assessment
                  </button>
                  <button className="border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download RPA Guide
                  </button>
                </div>

                {/* Quick Value Props */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="text-2xl font-bold text-brand-accent mb-1">100+</div>
                    <div className="text-sm text-gray-600">hours saved per week</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="text-2xl font-bold text-brand-secondary mb-1">45-80%</div>
                    <div className="text-sm text-gray-600">cost reduction</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="text-2xl font-bold text-brand-accent mb-1">90-day</div>
                    <div className="text-sm text-gray-600">implementation</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Animated Workflow Diagram */}
              <div className="hidden lg:block">
                <div className="relative w-full h-96 bg-white rounded-2xl shadow-2xl p-8">
                  {/* Workflow nodes */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between animate-pulse">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-gray-600" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Manual Input</span>
                      </div>
                      <ArrowRight className="w-6 h-6 text-brand-secondary" />
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                          <Bot className="w-6 h-6 text-brand-secondary" />
                        </div>
                        <span className="text-sm text-brand-secondary font-medium">RPA Bot</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between animate-pulse delay-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                          <Bot className="w-6 h-6 text-brand-secondary" />
                        </div>
                        <span className="text-sm text-brand-secondary font-medium">RPA Bot</span>
                      </div>
                      <ArrowRight className="w-6 h-6 text-brand-accent" />
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                          <Brain className="w-6 h-6 text-brand-accent" />
                        </div>
                        <span className="text-sm text-brand-accent font-medium">AI Processing</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between animate-pulse delay-500">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                          <Brain className="w-6 h-6 text-brand-accent" />
                        </div>
                        <span className="text-sm text-brand-accent font-medium">AI Processing</span>
                      </div>
                      <ArrowRight className="w-6 h-6 text-brand-secondary" />
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                          <Database className="w-6 h-6 text-brand-secondary" />
                        </div>
                        <span className="text-sm text-brand-secondary font-medium">System Update</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between animate-pulse delay-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                          <Database className="w-6 h-6 text-brand-secondary" />
                        </div>
                        <span className="text-sm text-brand-secondary font-medium">System Update</span>
                      </div>
                      <ArrowRight className="w-6 h-6 text-green-600" />
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="text-sm text-green-600 font-medium">Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Time comparison */}
                  <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center pt-4 border-t">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Before RPA</div>
                      <div className="text-lg font-bold text-gray-700">5 hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">After RPA</div>
                      <div className="text-lg font-bold text-brand-accent">15 minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-navy-900 mb-4">
              The Cost of Manual Processes
            </h2>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Manual processes are quietly draining your resources and limiting your growth
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pain Point 1 */}
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-100 hover:border-red-300 transition-all duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">Time Waste</h3>
                <p className="text-gray-700 leading-relaxed">
                  Teams spend 40% of time on repetitive data entry and manual processing
                </p>
              </div>

              {/* Pain Point 2 */}
              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-100 hover:border-orange-300 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">Error-Prone</h3>
                <p className="text-gray-700 leading-relaxed">
                  Manual processes lead to 5-10% error rates costing thousands in corrections
                </p>
              </div>

              {/* Pain Point 3 */}
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-100 hover:border-yellow-300 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingDown className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">Can&apos;t Scale</h3>
                <p className="text-gray-700 leading-relaxed">
                  Business growth limited by available headcount for manual tasks
                </p>
              </div>

              {/* Pain Point 4 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">Employee Burnout</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talented staff stuck doing mind-numbing repetitive work
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-navy-900 mb-6">
              Intelligent Automation That Actually Works
            </h2>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                At sipsy.ai, we don&apos;t just implement bots—we transform your operations with
                intelligent automation. Our approach combines industry-leading RPA platforms like
                n8n, Autom Mate, Selenium, and Playwright with advanced AI capabilities to create
                automation that thinks, learns, and adapts.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unlike vendors locked into a single tool, we select the perfect technology for
                each unique challenge. This means you get faster implementation, lower costs, and
                automation that actually solves your business problems—not just technical ones.
              </p>
            </div>

            {/* Key Differentiators */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-brand-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-7 h-7 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Multi-Platform Expertise</h3>
                <p className="text-gray-600 leading-relaxed">
                  We&apos;re not locked to one vendor—we choose the right tool for each job
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">AI-Enhanced</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our bots make intelligent decisions, not just follow scripts
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-brand-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Rapid Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  First automation live within 30 days, full deployment in 90
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-7 h-7 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Ongoing Optimization</h3>
                <p className="text-gray-600 leading-relaxed">
                  We don&apos;t build and leave—we continuously improve your bots
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-navy-900 mb-16">
              Our 6-Step Implementation Process
            </h2>

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    1
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-6 border-l-4 border-brand-secondary">
                  <div className="flex items-center mb-3">
                    <Search className="w-6 h-6 text-brand-secondary mr-3" />
                    <h3 className="text-2xl font-bold text-navy-900">Process Discovery</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Map your workflows and identify automation candidates. We analyze your
                    processes, document current state, and identify high-impact opportunities for
                    automation.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    2
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-6 border-l-4 border-brand-accent">
                  <div className="flex items-center mb-3">
                    <BarChart className="w-6 h-6 text-brand-accent mr-3" />
                    <h3 className="text-2xl font-bold text-navy-900">ROI Analysis</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Quantify potential savings and prioritize high-impact processes. We create a
                    detailed business case showing expected ROI, implementation costs, and timeline
                    to value.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    3
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-6 border-l-4 border-brand-secondary">
                  <div className="flex items-center mb-3">
                    <Target className="w-6 h-6 text-brand-secondary mr-3" />
                    <h3 className="text-2xl font-bold text-navy-900">Proof of Concept</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Build working prototype for your most critical process in 2 weeks. This proves
                    the concept, demonstrates value, and builds stakeholder confidence before full
                    investment.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    4
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-6 border-l-4 border-brand-accent">
                  <div className="flex items-center mb-3">
                    <Code className="w-6 h-6 text-brand-accent mr-3" />
                    <h3 className="text-2xl font-bold text-navy-900">Development</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Create production-ready bots with robust error handling. We build scalable
                    automation with comprehensive logging, exception handling, and failover
                    mechanisms.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    5
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-6 border-l-4 border-brand-secondary">
                  <div className="flex items-center mb-3">
                    <Wrench className="w-6 h-6 text-brand-secondary mr-3" />
                    <h3 className="text-2xl font-bold text-navy-900">Deployment</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Go live with minimal disruption and comprehensive training. We deploy in phases,
                    provide hands-on training, and ensure your team is confident managing the bots.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    6
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-6 border-l-4 border-brand-accent">
                  <div className="flex items-center mb-3">
                    <Repeat className="w-6 h-6 text-brand-accent mr-3" />
                    <h3 className="text-2xl font-bold text-navy-900">Managed Services</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    24/7 monitoring, maintenance, and continuous optimization. We proactively
                    monitor bot performance, fix issues before they impact your business, and
                    continuously optimize for better results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-navy-900 mb-6">Our RPA Toolkit</h2>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
              We leverage best-in-class tools to deliver the right solution for your needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* n8n */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">n8n</h3>
                <p className="text-sm text-gray-600 mb-3">Workflow Automation</p>
                <p className="text-gray-700 leading-relaxed">
                  Perfect for connecting web services and APIs. We use n8n for cloud-based
                  integrations, webhook automation, and multi-step workflows.
                </p>
              </div>

              {/* Autom Mate */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Autom Mate</h3>
                <p className="text-sm text-gray-600 mb-3">Enterprise RPA</p>
                <p className="text-gray-700 leading-relaxed">
                  Enterprise-grade RPA platform for complex business processes. Ideal for
                  large-scale automation with advanced orchestration requirements.
                </p>
              </div>

              {/* Selenium */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Selenium</h3>
                <p className="text-sm text-gray-600 mb-3">Web Automation</p>
                <p className="text-gray-700 leading-relaxed">
                  Proven solution for web browser automation. We use Selenium for legacy system
                  automation and cross-browser testing requirements.
                </p>
              </div>

              {/* Playwright */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Playwright</h3>
                <p className="text-sm text-gray-600 mb-3">Modern Browser Automation</p>
                <p className="text-gray-700 leading-relaxed">
                  Next-generation browser automation with superior speed and reliability. Our go-to
                  for modern web applications and API testing.
                </p>
              </div>

              {/* Python */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Python</h3>
                <p className="text-sm text-gray-600 mb-3">Custom Automation</p>
                <p className="text-gray-700 leading-relaxed">
                  For custom automation requirements and data processing. Python gives us
                  flexibility for unique challenges and integration scenarios.
                </p>
              </div>

              {/* AI/ML Integration */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">AI/ML Integration</h3>
                <p className="text-sm text-gray-600 mb-3">Intelligent Decision-Making</p>
                <p className="text-gray-700 leading-relaxed">
                  Combine RPA with AI for intelligent document processing, natural language
                  understanding, and predictive analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases - Accordion */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-navy-900 mb-6">
              Common RPA Applications
            </h2>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
              See how RPA can transform your specific business processes
            </p>

            <div className="max-w-4xl mx-auto space-y-4">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-brand-secondary transition-colors"
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                    onClick={() =>
                      setExpandedUseCase(expandedUseCase === index ? null : index)
                    }
                  >
                    <span className="text-lg font-bold text-navy-900">{useCase.title}</span>
                    <ChevronDown
                      className={`w-6 h-6 text-brand-secondary transition-transform ${
                        expandedUseCase === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedUseCase === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 mb-4">{useCase.description}</p>
                      <div className="grid md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Before</div>
                          <div className="text-lg font-bold text-red-600">{useCase.before}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">After</div>
                          <div className="text-lg font-bold text-green-600">{useCase.after}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Time Saved</div>
                          <div className="text-lg font-bold text-brand-accent">
                            {useCase.timeSaved}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">ROI</div>
                          <div className="text-lg font-bold text-brand-secondary">
                            {useCase.roi}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Showcase */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-navy-900 mb-12">
              Real Results from Real Clients
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Case Study 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-40 bg-gradient-to-br from-brand-secondary to-brand-accent flex items-center justify-center">
                  <Settings className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Manufacturing Client</h3>
                  <p className="text-gray-600 mb-4">Quality control data entry automation</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time Reduction</span>
                      <span className="text-lg font-bold text-brand-accent">95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Accuracy</span>
                      <span className="text-lg font-bold text-brand-secondary">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Annual Savings</span>
                      <span className="text-lg font-bold text-green-600">$180K</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-40 bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center">
                  <FileText className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Financial Services</h3>
                  <p className="text-gray-600 mb-4">Loan application processing automation</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Processing Time</span>
                      <span className="text-lg font-bold text-brand-accent">3 days → 3 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Throughput Increase</span>
                      <span className="text-lg font-bold text-brand-secondary">800%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Annual Savings</span>
                      <span className="text-lg font-bold text-green-600">$2.1M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-40 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Database className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Healthcare Provider</h3>
                  <p className="text-gray-600 mb-4">Patient records management automation</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Speed Improvement</span>
                      <span className="text-lg font-bold text-brand-accent">70% faster</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Backlog</span>
                      <span className="text-lg font-bold text-brand-secondary">Eliminated</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">FTE Saved</span>
                      <span className="text-lg font-bold text-green-600">15 FTE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-navy-900 mb-6">
                Calculate Your Potential Savings
              </h2>
              <p className="text-xl text-center text-gray-600 mb-12">
                See how much you could save with RPA automation
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-xl p-8">
                <div className="space-y-6">
                  {/* Employees */}
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">
                      How many employees doing manual tasks?
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full h-2 bg-brand-secondary/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-right text-2xl font-bold text-brand-secondary mt-2">
                      {employees} employees
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">
                      Average hours per week on repetitive work?
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                      className="w-full h-2 bg-brand-accent/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-right text-2xl font-bold text-brand-accent mt-2">
                      {hoursPerWeek} hours/week
                    </div>
                  </div>

                  {/* Cost */}
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">
                      Average hourly cost (salary + overhead)?
                    </label>
                    <input
                      type="range"
                      min="25"
                      max="200"
                      step="5"
                      value={hourlyCost}
                      onChange={(e) => setHourlyCost(Number(e.target.value))}
                      className="w-full h-2 bg-brand-secondary/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-right text-2xl font-bold text-brand-secondary mt-2">
                      ${hourlyCost}/hour
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={() => setShowROI(true)}
                    className="w-full bg-brand-accent hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 text-lg"
                  >
                    Calculate My Potential Savings
                  </button>

                  {/* Results */}
                  {showROI && (
                    <div className="bg-white rounded-xl p-8 text-center shadow-lg animate-pulse-once">
                      <div className="text-sm text-gray-600 mb-2">Potential Annual Savings</div>
                      <div className="text-5xl font-bold text-green-600 mb-4">
                        ${calculateROI().toLocaleString()}
                      </div>
                      <p className="text-gray-700 mb-6">
                        Based on 70% automation of repetitive tasks
                      </p>
                      <button className="bg-brand-secondary hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                        Get Detailed Assessment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Packages */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-navy-900 mb-6">
              Choose Your Engagement Model
            </h2>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Flexible packages to match your automation journey
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Assessment Package */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">RPA Assessment</h3>
                <div className="text-4xl font-bold text-brand-secondary mb-4">
                  $5K - $10K
                </div>
                <p className="text-gray-600 mb-6">Perfect for getting started</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Process analysis & opportunity identification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Detailed ROI calculation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Implementation roadmap</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Duration: 2 weeks</span>
                  </li>
                </ul>
                <button className="w-full border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                  Start with Assessment
                </button>
              </div>

              {/* Pilot Package */}
              <div className="bg-white rounded-xl shadow-2xl p-8 border-4 border-brand-accent relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-2">Pilot Implementation</h3>
                <div className="text-4xl font-bold text-brand-accent mb-4">$15K - $40K</div>
                <p className="text-gray-600 mb-6">Prove value with a quick win</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Single process automation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Complete proof of concept</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">2 months support included</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Duration: 6-8 weeks</span>
                  </li>
                </ul>
                <button className="w-full bg-brand-accent hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105">
                  Launch Pilot Project
                </button>
              </div>

              {/* Enterprise Package */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">Enterprise Automation</h3>
                <div className="text-4xl font-bold text-brand-secondary mb-4">Custom</div>
                <p className="text-gray-600 mb-6">Full-scale transformation</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Multiple process automation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Center of Excellence setup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Managed services included</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Duration: 3-6 months</span>
                  </li>
                </ul>
                <button className="w-full border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                  Request Custom Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-navy-900 mb-12">
              Frequently Asked Questions
            </h2>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-brand-secondary transition-colors"
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <span className="text-lg font-bold text-navy-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-6 h-6 text-brand-secondary transition-transform flex-shrink-0 ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Elements & Resources */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-center text-navy-900 mb-8">
                Trusted & Certified
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="font-bold text-navy-900">ISO 27001</p>
                  <p className="text-sm text-gray-600">Security Standards</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-bold text-navy-900">UiPath Certified</p>
                  <p className="text-sm text-gray-600">Official Partner</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="font-bold text-navy-900">Automation Anywhere</p>
                  <p className="text-sm text-gray-600">Partner Network</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="font-bold text-navy-900">99.9% Uptime</p>
                  <p className="text-sm text-gray-600">Guaranteed</p>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <h3 className="text-3xl font-bold text-center text-navy-900 mb-8">
              Related Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-brand-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-brand-secondary" />
                </div>
                <h4 className="text-xl font-bold text-navy-900 mb-3">
                  The Complete Guide to RPA Implementation
                </h4>
                <p className="text-gray-600 mb-4">
                  50-page comprehensive guide covering RPA strategy, vendor selection, and best
                  practices.
                </p>
                <button className="inline-flex items-center text-brand-secondary font-semibold hover:underline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Whitepaper
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart className="w-6 h-6 text-brand-accent" />
                </div>
                <h4 className="text-xl font-bold text-navy-900 mb-3">
                  How We Automated Invoice Processing for Fortune 500 Client
                </h4>
                <p className="text-gray-600 mb-4">
                  Detailed case study showing our methodology and results from a recent
                  implementation.
                </p>
                <button className="inline-flex items-center text-brand-accent font-semibold hover:underline">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Read Case Study
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-bold text-navy-900 mb-3">
                  RPA Best Practices and Common Pitfalls
                </h4>
                <p className="text-gray-600 mb-4">
                  Join our live webinar to learn what works and what to avoid in RPA projects.
                </p>
                <button className="inline-flex items-center text-purple-600 font-semibold hover:underline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Register for Webinar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-gradient-to-r from-blue-600 to-green-600">
          <div className="container-custom text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Automate Your First Process?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Talk to an RPA expert today and discover how automation can transform your operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button className="bg-white text-brand-secondary hover:bg-gray-100 font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 mr-2" />
                Book Free 30-Min Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-brand-secondary font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 flex items-center justify-center">
                <Download className="w-6 h-6 mr-2" />
                Download RPA Readiness Checklist
              </button>
            </div>
            <p className="text-white/90 text-lg">
              Talk to an RPA expert today • No commitment required
            </p>
          </div>
        </section>

        {/* Footer - Same as Homepage */}
        <footer id="about" className="bg-navy-900 text-gray-300 pt-16 pb-8">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">sipsy.ai</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Enterprise AI and automation solutions that deliver measurable ROI
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-brand-accent rounded-lg flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-brand-accent rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-brand-accent rounded-lg flex items-center justify-center transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">Services</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      RPA & Hyperautomation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      AI/ML Integration
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      Enterprise Integration
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      Data Engineering
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      Digital Transformation
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/#about" className="hover:text-brand-accent transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/#case-studies" className="hover:text-brand-accent transition-colors">
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="/#resources" className="hover:text-brand-accent transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="/#contact" className="hover:text-brand-accent transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      ROI Calculator
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      Implementation Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      Whitepapers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      Webinars
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">© 2025 sipsy.ai. All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <a href="#" className="hover:text-brand-accent transition-colors">
                    Privacy Policy
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="hover:text-brand-accent transition-colors">
                    Terms of Service
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="hover:text-brand-accent transition-colors">
                    Cookie Policy
                  </a>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">SOC 2 Compliant</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400">GDPR Ready</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

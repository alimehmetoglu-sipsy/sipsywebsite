'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Bot,
  ChevronRight,
  Clock,
  Calendar,
  TrendingUp,
  CheckCircle,
  Download,
  Linkedin,
  Twitter,
  Mail,
  Building2,
  Users,
  MapPin,
  Server,
  ArrowRight,
  Quote,
  BarChart,
  Zap,
  Target,
  DollarSign,
  TrendingDown,
  Activity,
  FileText,
  Database,
  Brain,
  Code,
  Cloud,
  Play,
  Github,
} from 'lucide-react';

export default function CaseStudyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Bot className="w-8 h-8 text-brand-secondary" />
              <span className="text-2xl font-bold text-navy-900">
                sipsy<span className="text-brand-secondary">.ai</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/#solutions" className="text-gray-700 hover:text-brand-secondary font-medium transition">
                Solutions
              </a>
              <a href="/#services" className="text-gray-700 hover:text-brand-secondary font-medium transition">
                Services
              </a>
              <Link href="/case-studies" className="text-brand-secondary font-medium transition">
                Case Studies
              </Link>
              <a href="/#about" className="text-gray-700 hover:text-brand-secondary font-medium transition">
                About
              </a>
              <Link
                href="/#contact"
                className="px-6 py-3 bg-brand-secondary text-white rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-neutral-light"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="/#solutions" className="block text-gray-700 hover:text-brand-secondary font-medium">
                Solutions
              </a>
              <a href="/#services" className="block text-gray-700 hover:text-brand-secondary font-medium">
                Services
              </a>
              <Link href="/case-studies" className="block text-brand-secondary font-medium">
                Case Studies
              </Link>
              <a href="/#about" className="block text-gray-700 hover:text-brand-secondary font-medium">
                About
              </a>
              <Link
                href="/#contact"
                className="block w-full px-6 py-3 bg-brand-secondary text-white rounded-lg hover:bg-blue-600 transition font-semibold text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Hero Section */}
              <section className="mb-12">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                  <Link href="/" className="hover:text-brand-secondary">
                    Home
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link href="/case-studies" className="hover:text-brand-secondary">
                    Case Studies
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-navy-900 font-medium">TechCorp Invoice Automation</span>
                </nav>

                {/* Industry Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-brand-secondary rounded-full text-sm font-semibold">
                    Technology & Software
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                  How TechCorp International Achieved 60% Cost Reduction Through Intelligent Automation
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Published: March 15, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">8 min read</span>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-navy-800 to-cyan-500 mb-8 h-80 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <FileText className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <p className="text-xl font-semibold">Invoice Automation Success Story</p>
                  </div>
                </div>
              </section>

              {/* Executive Summary */}
              <section className="mb-12">
                <div className="bg-blue-50 border-l-4 border-brand-primary p-8 rounded-r-lg">
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">Executive Summary</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">CHALLENGE</p>
                      <p className="text-lg font-bold text-navy-900">
                        Manual invoice processing created bottlenecks and 8% error rate
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">SOLUTION</p>
                      <p className="text-lg font-bold text-navy-900">
                        Intelligent RPA with AI-powered validation across 3 departments
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">RESULTS</p>
                      <p className="text-lg font-bold text-brand-primary">
                        60% cost reduction, 99.9% accuracy, $2.4M annual savings
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Client Overview */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-8">About the Client</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Stats */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <Building2 className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-navy-900">Industry</p>
                        <p className="text-gray-600">Enterprise Software & Technology Services</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-navy-900">Company Size</p>
                        <p className="text-gray-600">2,500 employees | $450M annual revenue</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-navy-900">Locations</p>
                        <p className="text-gray-600">Global headquarters in New York, 12 offices worldwide</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Server className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-navy-900">Existing Systems</p>
                        <p className="text-gray-600">SAP ERP, Salesforce, Microsoft 365, NetSuite</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Description */}
                  <div className="space-y-4 text-gray-700">
                    <p>
                      TechCorp International is a leading provider of enterprise software solutions, serving Fortune
                      500 companies across multiple industries. With rapid growth over the past five years, their
                      finance operations struggled to keep pace with increasing transaction volumes.
                    </p>
                    <p>
                      <span className="font-semibold text-navy-900">Strategic Goals:</span> Scale operations
                      efficiently, improve cash flow management, and reduce operational costs to invest in product
                      innovation.
                    </p>
                    <p>
                      <span className="font-semibold text-navy-900">Why Now:</span> Invoice processing volumes had
                      tripled in 18 months, while error rates and processing delays were damaging vendor relationships
                      and causing cash flow issues.
                    </p>
                  </div>
                </div>
              </section>

              {/* The Challenge */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-8">The Problem They Faced</h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    TechCorp's finance team was drowning in manual work. Every week, they received 500+ invoices from
                    vendors across multiple countries, in various formats—PDFs, emails, scanned documents, and even
                    paper invoices. Each invoice required manual data entry into their ERP system, validation against
                    purchase orders, approval routing, and payment processing.
                  </p>
                  <p>
                    The process took an average of 5 business days per batch, with three full-time employees dedicated
                    entirely to invoice processing. But the real pain wasn't just the time—it was the errors. With an
                    8% error rate, the team spent additional hours correcting duplicate entries, wrong amounts, and
                    mismatched vendor information.
                  </p>
                  <p>
                    These delays had cascading effects: vendors complained about late payments, early payment discounts
                    were missed (costing $80K+ annually), and the finance team had no bandwidth for strategic analysis
                    or planning. During quarter-end closes, the team worked overtime, yet reporting was still delayed.
                  </p>
                  <p>
                    TechCorp had tried hiring more staff, but turnover was high due to the repetitive nature of the
                    work. They'd also experimented with basic OCR software, but it couldn't handle the variety of
                    invoice formats and still required extensive manual validation.
                  </p>
                </div>

                {/* Pull Quote */}
                <div className="my-10 relative">
                  <div className="absolute -left-4 -top-4 text-brand-secondary opacity-20">
                    <Quote className="w-16 h-16" />
                  </div>
                  <blockquote className="border-l-4 border-brand-primary pl-8 py-4 italic text-xl text-gray-800 relative">
                    "We were drowning in manual processes. Our team was processing 500+ invoices weekly, taking 5 days
                    each cycle with frequent errors. It was unsustainable."
                    <footer className="mt-4 text-base font-semibold text-navy-900 not-italic">
                      — John Smith, CFO, TechCorp International
                    </footer>
                  </blockquote>
                </div>
              </section>

              {/* Solution Approach */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-8">Our Solution</h2>

                {/* Discovery Phase */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                    <span className="w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                      1
                    </span>
                    Discovery Phase
                  </h3>
                  <div className="ml-13 space-y-3 text-gray-700">
                    <p>
                      We began with a comprehensive process audit, shadowing the finance team for two weeks to
                      understand every step, variation, and exception in their invoice workflow.
                    </p>
                    <ul className="space-y-2 ml-5">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Analyzed 2,000+ invoices</strong> to identify patterns, common formats, and edge
                          cases
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Mapped integration points</strong> across SAP, email systems, and document storage
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Identified quick wins</strong>: 70% of invoices followed standard formats suitable for
                          immediate automation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Prioritization</strong>: Focused first on high-volume, low-complexity vendors
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Technical Architecture */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                    <span className="w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                      2
                    </span>
                    Technical Architecture
                  </h3>
                  <div className="ml-13 space-y-4 text-gray-700">
                    <p>
                      We designed an intelligent automation system combining RPA, AI/ML, and seamless integrations to
                      handle the entire invoice lifecycle.
                    </p>
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-8 h-8 text-gray-500" />
                            <span className="font-semibold">Email Monitoring</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-brand-secondary" />
                          <div className="flex items-center space-x-3">
                            <Brain className="w-8 h-8 text-brand-secondary" />
                            <span className="font-semibold">AI Extraction</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-brand-secondary" />
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-8 h-8 text-brand-primary" />
                            <span className="font-semibold">Validation</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-brand-secondary" />
                          <div className="flex items-center space-x-3">
                            <Database className="w-8 h-8 text-navy-900" />
                            <span className="font-semibold">ERP Entry</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 ml-5 mt-4">
                      <li className="flex items-start">
                        <Code className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>n8n Workflow Engine</strong>: Orchestrates the entire process from email ingestion to
                          ERP posting
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Brain className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>AI-Powered OCR</strong>: Custom-trained ML models extract data from invoices with 99%+
                          accuracy
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Database className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Smart Validation</strong>: Cross-references purchase orders, vendor records, and
                          historical patterns
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Server className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>SAP Integration</strong>: Direct API connections for seamless data entry and approval
                          routing
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Activity className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Exception Handling</strong>: Intelligent queue for human review of edge cases
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Implementation */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                    <span className="w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                      3
                    </span>
                    Implementation
                  </h3>
                  <div className="ml-13 space-y-4 text-gray-700">
                    <p>
                      We took a phased approach to minimize disruption and ensure smooth adoption across the
                      organization.
                    </p>

                    {/* Timeline Visual */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-24 text-sm font-bold text-brand-secondary">Week 1-2</div>
                          <div className="flex-1">
                            <p className="font-semibold text-navy-900">Setup & Configuration</p>
                            <p className="text-gray-600 text-sm">
                              Infrastructure setup, API integrations, ML model training on historical invoices
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-24 text-sm font-bold text-brand-secondary">Week 3-4</div>
                          <div className="flex-1">
                            <p className="font-semibold text-navy-900">Pilot with Top 10 Vendors</p>
                            <p className="text-gray-600 text-sm">
                              Processed 200 invoices in parallel with manual process for validation
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-24 text-sm font-bold text-brand-secondary">Week 5-6</div>
                          <div className="flex-1">
                            <p className="font-semibold text-navy-900">Refinement & Training</p>
                            <p className="text-gray-600 text-sm">
                              Addressed edge cases, trained finance team on exception handling dashboard
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-24 text-sm font-bold text-brand-secondary">Week 7-8</div>
                          <div className="flex-1">
                            <p className="font-semibold text-navy-900">Full Rollout</p>
                            <p className="text-gray-600 text-sm">
                              Expanded to all vendors, phased manual team to oversight and exception handling roles
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4">
                      <strong>Change Management:</strong> We worked closely with the finance team throughout, involving
                      them in testing and refinement. Rather than replacing jobs, we repositioned team members to
                      handle exceptions, vendor relationships, and financial analysis—more strategic, fulfilling work.
                    </p>
                  </div>
                </div>

                {/* Testing & Deployment */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                    <span className="w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                      4
                    </span>
                    Testing & Deployment
                  </h3>
                  <div className="ml-13 space-y-3 text-gray-700">
                    <ul className="space-y-2 ml-5">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>QA Process</strong>: Every automated invoice was validated against manual processing
                          for the first month
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Pilot Results</strong>: 98.5% accuracy in phase 1, improved to 99.9% after refinement
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Go-Live Strategy</strong>: Gradual cutover with manual backup for 2 weeks
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>User Adoption</strong>: Finance team enthusiastically adopted the new system, with 95%
                          satisfaction in post-deployment survey
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Results Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-8">The Impact</h2>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-gradient-to-br from-brand-secondary to-blue-600 rounded-xl p-8 text-white">
                    <TrendingDown className="w-12 h-12 mb-4 opacity-80" />
                    <div className="text-5xl font-bold mb-2">85%</div>
                    <p className="text-xl font-semibold mb-1">Time Savings</p>
                    <p className="text-blue-100">From 5 days to 4 hours</p>
                  </div>
                  <div className="bg-gradient-to-br from-brand-primary to-green-600 rounded-xl p-8 text-white">
                    <DollarSign className="w-12 h-12 mb-4 opacity-80" />
                    <div className="text-5xl font-bold mb-2">$2.4M</div>
                    <p className="text-xl font-semibold mb-1">Annual Savings</p>
                    <p className="text-green-100">Direct cost reduction</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-8 text-white">
                    <Target className="w-12 h-12 mb-4 opacity-80" />
                    <div className="text-5xl font-bold mb-2">99.9%</div>
                    <p className="text-xl font-semibold mb-1">Accuracy Rate</p>
                    <p className="text-purple-100">Up from 92%</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-8 text-white">
                    <TrendingUp className="w-12 h-12 mb-4 opacity-80" />
                    <div className="text-5xl font-bold mb-2">340%</div>
                    <p className="text-xl font-semibold mb-1">ROI</p>
                    <p className="text-orange-100">In the first year</p>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div className="bg-white rounded-xl p-8 mb-10">
                  <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">Before & After Comparison</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Before */}
                    <div className="bg-white rounded-lg p-6 border-2 border-red-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-red-600">BEFORE</h4>
                        <TrendingDown className="w-6 h-6 text-red-600" />
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-700">
                          <Clock className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          <span>5 days processing time</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                          <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          <span>8% error rate</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                          <Users className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          <span>3 FTE dedicated</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                          <DollarSign className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          <span>$400K annual cost</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                          <FileText className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          <span>Manual data entry</span>
                        </li>
                      </ul>
                    </div>

                    {/* After */}
                    <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-brand-primary">AFTER</h4>
                        <TrendingUp className="w-6 h-6 text-brand-primary" />
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-700">
                          <Zap className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0" />
                          <span>4 hours processing time</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0" />
                          <span>0.1% error rate</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                          <Users className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0" />
                          <span>0.5 FTE oversight</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                          <DollarSign className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0" />
                          <span>$160K annual cost</span>
                        </li>
                        <li className="flex items-center text-gray-700">
                          <Bot className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0" />
                          <span>Automated with AI validation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Additional Benefits */}
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                  <h3 className="text-xl font-bold text-navy-900 mb-4">Additional Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Freed up team for strategic work and financial analysis</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-700">
                        Improved vendor relationships through faster, more reliable payments
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-700">
                        Better cash flow visibility with real-time processing status
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Scalable to handle 3x volume without adding headcount</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Real-time reporting and analytics for better decision-making</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-700">
                        Captured early payment discounts worth $120K+ annually
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Client Testimonial */}
              <section className="mb-12">
                <div className="bg-gradient-to-br from-navy-900 to-gray-800 rounded-xl p-10 text-white">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center">
                      <Play className="w-10 h-10" />
                    </div>
                  </div>
                  <Quote className="w-12 h-12 mx-auto mb-6 opacity-30" />
                  <blockquote className="text-2xl font-semibold text-center mb-6 leading-relaxed">
                    "sipsy.ai didn't just automate our processes—they transformed how our finance team operates. The ROI
                    exceeded our projections, but the real win was giving our people back time to focus on analysis
                    instead of data entry. Best investment we made this year."
                  </blockquote>
                  <div className="text-center">
                    <p className="text-xl font-bold">Jane Doe</p>
                    <p className="text-blue-300">CEO, TechCorp International</p>
                  </div>
                  <div className="flex justify-center mt-6">
                    <div className="bg-white px-6 py-2 rounded-lg">
                      <span className="text-navy-900 font-bold">TechCorp</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Technologies Used */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-8">Technologies Used</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-brand-secondary transition">
                    <Code className="w-10 h-10 text-brand-secondary mx-auto mb-3" />
                    <p className="font-bold text-navy-900 mb-1">n8n</p>
                    <p className="text-sm text-gray-600">Workflow Orchestration</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-brand-secondary transition">
                    <Brain className="w-10 h-10 text-brand-secondary mx-auto mb-3" />
                    <p className="font-bold text-navy-900 mb-1">AI/ML</p>
                    <p className="text-sm text-gray-600">Intelligent Validation</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-brand-secondary transition">
                    <FileText className="w-10 h-10 text-brand-secondary mx-auto mb-3" />
                    <p className="font-bold text-navy-900 mb-1">Python</p>
                    <p className="text-sm text-gray-600">Custom Logic</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-brand-secondary transition">
                    <Database className="w-10 h-10 text-brand-secondary mx-auto mb-3" />
                    <p className="font-bold text-navy-900 mb-1">API Integrations</p>
                    <p className="text-sm text-gray-600">ERP, Email, Storage</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-brand-secondary transition">
                    <Cloud className="w-10 h-10 text-brand-secondary mx-auto mb-3" />
                    <p className="font-bold text-navy-900 mb-1">Cloud Infrastructure</p>
                    <p className="text-sm text-gray-600">Scalable & Secure</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-brand-secondary transition">
                    <Server className="w-10 h-10 text-brand-secondary mx-auto mb-3" />
                    <p className="font-bold text-navy-900 mb-1">SAP ERP</p>
                    <p className="text-sm text-gray-600">Direct Integration</p>
                  </div>
                </div>
              </section>

              {/* Lessons Learned */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-8">Key Takeaways</h2>
                <div className="space-y-6">
                  <div className="bg-blue-50 border-l-4 border-brand-secondary rounded-r-lg p-6">
                    <h3 className="font-bold text-navy-900 text-lg mb-2">
                      1. Start with highest-volume, lowest-complexity processes
                    </h3>
                    <p className="text-gray-700">
                      By tackling standard invoice formats first, we achieved quick wins that built momentum and
                      confidence for more complex automation.
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-brand-secondary rounded-r-lg p-6">
                    <h3 className="font-bold text-navy-900 text-lg mb-2">
                      2. Change management is as important as technology
                    </h3>
                    <p className="text-gray-700">
                      Involving the finance team early, addressing concerns transparently, and repositioning roles
                      (rather than eliminating them) was critical to successful adoption.
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-brand-secondary rounded-r-lg p-6">
                    <h3 className="font-bold text-navy-900 text-lg mb-2">
                      3. AI validation adds 10% more accuracy than rules-based alone
                    </h3>
                    <p className="text-gray-700">
                      Machine learning models that learn from patterns and context significantly outperform traditional
                      rule-based systems, especially for edge cases.
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-brand-secondary rounded-r-lg p-6">
                    <h3 className="font-bold text-navy-900 text-lg mb-2">
                      4. Continuous monitoring reveals optimization opportunities
                    </h3>
                    <p className="text-gray-700">
                      Post-deployment monitoring identified additional automation opportunities we hadn't seen
                      initially, leading to further efficiency gains.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Case Studies */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-8">More Success Stories</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group">
                    <div className="h-40 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-16 h-16 text-white opacity-80" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-brand-secondary uppercase">Healthcare</span>
                      <h3 className="font-bold text-navy-900 text-lg mt-2 mb-3 group-hover:text-brand-secondary transition">
                        Patient Onboarding Automation Reduces Wait Times by 70%
                      </h3>
                      <p className="text-3xl font-bold text-brand-primary mb-3">70% Faster</p>
                      <Link
                        href="/case-studies/healthcare-patient-onboarding"
                        className="text-brand-secondary font-semibold hover:underline inline-flex items-center"
                      >
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group">
                    <div className="h-40 bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                      <BarChart className="w-16 h-16 text-white opacity-80" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-brand-secondary uppercase">Manufacturing</span>
                      <h3 className="font-bold text-navy-900 text-lg mt-2 mb-3 group-hover:text-brand-secondary transition">
                        Supply Chain Integration Saves $5M Annually
                      </h3>
                      <p className="text-3xl font-bold text-brand-primary mb-3">$5M Saved</p>
                      <Link
                        href="/case-studies/manufacturing-supply-chain"
                        className="text-brand-secondary font-semibold hover:underline inline-flex items-center"
                      >
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group">
                    <div className="h-40 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Target className="w-16 h-16 text-white opacity-80" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-brand-secondary uppercase">Retail</span>
                      <h3 className="font-bold text-navy-900 text-lg mt-2 mb-3 group-hover:text-brand-secondary transition">
                        Customer Service Bot Handles 80% of Inquiries
                      </h3>
                      <p className="text-3xl font-bold text-brand-primary mb-3">80% Automated</p>
                      <Link
                        href="/case-studies/retail-customer-service"
                        className="text-brand-secondary font-semibold hover:underline inline-flex items-center"
                      >
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* Next Steps CTA */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-navy-800 via-brand-primary to-cyan-500 rounded-xl p-10 text-white text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">See Similar Results in Your Business</h2>
                  <p className="text-xl mb-8 text-neutral-light">
                    Ready to transform your operations? Let's explore how intelligent automation can work for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link
                      href="/#contact"
                      className="px-8 py-4 bg-white text-brand-primary rounded-lg hover:bg-neutral-light transition font-bold text-lg inline-flex items-center justify-center"
                    >
                      Schedule Your Assessment
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-brand-secondary transition font-bold text-lg inline-flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      Download All Case Studies
                    </button>
                  </div>

                  {/* Lead Capture Form */}
                  <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-navy-900 mb-4">Get Our Case Studies Collection</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="px-4 py-3 border border-gray-300 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="px-4 py-3 border border-gray-300 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="px-4 py-3 border border-gray-300 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-brand-secondary text-white rounded-lg hover:bg-blue-700 transition font-bold"
                      >
                        Send Me Case Studies
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Quick Facts */}
                <div className="bg-neutral-light border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-navy-900 text-lg mb-4">Quick Facts</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Industry</p>
                      <p className="font-semibold text-navy-900">Technology & Software</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Project Timeline</p>
                      <p className="font-semibold text-navy-900">8 weeks</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">ROI</p>
                      <p className="font-semibold text-brand-primary">340% first year</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Annual Savings</p>
                      <p className="font-semibold text-brand-primary">$2.4M</p>
                    </div>
                  </div>
                </div>

                {/* Download PDF */}
                <button className="w-full px-6 py-3 bg-brand-secondary text-white rounded-lg hover:bg-blue-600 transition font-semibold flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>

                {/* Share */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-navy-900 mb-4">Share This Story</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <Linkedin className="w-5 h-5 mx-auto" />
                    </button>
                    <button className="flex-1 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition">
                      <Twitter className="w-5 h-5 mx-auto" />
                    </button>
                    <button className="flex-1 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                      <Mail className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                </div>

                {/* Talk to Our Team CTA */}
                <div className="bg-gradient-to-br from-brand-primary to-green-600 rounded-lg p-6 text-white">
                  <h3 className="font-bold text-xl mb-2">Talk to Our Team</h3>
                  <p className="text-green-100 mb-4 text-sm">
                    See how we can help your business achieve similar results.
                  </p>
                  <Link
                    href="/#contact"
                    className="block w-full px-6 py-3 bg-white text-brand-primary rounded-lg hover:bg-neutral-light transition font-bold text-center"
                  >
                    Schedule a Call
                  </Link>
                </div>

                {/* Related Resources */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-navy-900 mb-4">Related Resources</h3>
                  <div className="space-y-3">
                    <Link
                      href="/resources/rpa-guide"
                      className="block text-brand-secondary hover:underline text-sm font-semibold"
                    >
                      → RPA Implementation Guide
                    </Link>
                    <Link
                      href="/resources/roi-calculator"
                      className="block text-brand-secondary hover:underline text-sm font-semibold"
                    >
                      → ROI Calculator Tool
                    </Link>
                    <Link
                      href="/services/rpa-hyperautomation"
                      className="block text-brand-secondary hover:underline text-sm font-semibold"
                    >
                      → RPA Services Overview
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Bot className="w-8 h-8 text-brand-secondary" />
                <span className="text-2xl font-bold">
                  sipsy<span className="text-brand-secondary">.ai</span>
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming businesses through intelligent automation and AI-powered solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-brand-secondary transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-secondary transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-secondary transition">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-bold text-lg mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/#solutions" className="text-gray-400 hover:text-brand-secondary transition">
                    Workflow Automation
                  </a>
                </li>
                <li>
                  <a href="/#solutions" className="text-gray-400 hover:text-brand-secondary transition">
                    AI Integration
                  </a>
                </li>
                <li>
                  <a href="/#solutions" className="text-gray-400 hover:text-brand-secondary transition">
                    Process Optimization
                  </a>
                </li>
                <li>
                  <a href="/#solutions" className="text-gray-400 hover:text-brand-secondary transition">
                    Custom Development
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/rpa-hyperautomation"
                    className="text-gray-400 hover:text-brand-secondary transition"
                  >
                    RPA & Hyperautomation
                  </Link>
                </li>
                <li>
                  <a href="/#services" className="text-gray-400 hover:text-brand-secondary transition">
                    AI/ML Integration
                  </a>
                </li>
                <li>
                  <a href="/#services" className="text-gray-400 hover:text-brand-secondary transition">
                    Enterprise Integration
                  </a>
                </li>
                <li>
                  <a href="/#services" className="text-gray-400 hover:text-brand-secondary transition">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/#about" className="text-gray-400 hover:text-brand-secondary transition">
                    About Us
                  </a>
                </li>
                <li>
                  <Link href="/case-studies" className="text-gray-400 hover:text-brand-secondary transition">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <a href="/#contact" className="text-gray-400 hover:text-brand-secondary transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-brand-secondary transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 sipsy.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

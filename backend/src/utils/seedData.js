import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';
import FAQ from '../models/FAQ.js';
import Consultancy from '../models/Consultancy.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const servicesData = [
      { title: 'Financial consultancy', description: 'Strategic financial planning, analysis, and advisory for businesses at every stage of growth — from startups to established enterprises.', icon: 'BarChart3', order: 1, isActive: true },
      { title: 'Audit & assurance', description: 'Independent, thorough audit services to ensure compliance, accuracy, and stakeholder confidence in your financial reporting.', icon: 'Shield', order: 2, isActive: true },
      { title: 'Tax planning & compliance', description: 'Proactive tax strategy and compliance services for corporations, SMEs, and nonprofit organisations operating locally and internationally.', icon: 'FileText', order: 3, isActive: true },
      { title: 'Career mentorship', description: 'Structured guidance for aspiring accountants and finance professionals — from ICAN/ACCA preparation to career development and leadership.', icon: 'GraduationCap', order: 4, isActive: true },
      { title: 'Nonprofit advisory', description: 'Governance, financial management, and regulatory compliance advisory specifically tailored for nonprofit and NGO organisations.', icon: 'Heart', order: 5, isActive: true },
      { title: 'Business registration & compliance', description: 'End-to-end support for business formation, corporate governance setup, and ongoing regulatory compliance in Nigeria and beyond.', icon: 'ClipboardList', order: 6, isActive: true },
    ];

    const projectsData = [
      { title: 'Meridian Capital Group', category: 'Financial restructuring', description: 'Led a comprehensive financial restructuring engagement for a Lagos-based investment firm, resulting in a 40% reduction in operational costs and improved stakeholder reporting.', year: 2024, tags: ['Financial analysis', 'Restructuring', 'Reporting'], isVisible: true },
      { title: 'GreenPath NGO', category: 'Nonprofit advisory', description: 'Developed a compliance framework and financial management system for a development-sector nonprofit, enabling successful audits and donor reporting.', year: 2024, tags: ['Nonprofit', 'Compliance', 'Governance'], isVisible: true },
      { title: 'Tessera Retail Ltd.', category: 'Tax & audit', description: 'Delivered a full-cycle audit and tax planning strategy for a growing retail chain, recovering significant overpaid duties and streamlining year-end reporting.', year: 2023, tags: ['Audit', 'Tax planning', 'Retail'], isVisible: true },
      { title: 'Future Finance Cohort', category: 'Mentorship programme', description: 'Designed and facilitated a 12-week structured mentorship programme for 30 early-career accountants, with an 85% ICAN exam pass rate among participants.', year: 2023, tags: ['Mentorship', 'ICAN', 'Training'], isVisible: true },
    ];

    const testimonialsData = [
      { name: 'Emeka Adeyemi', role: 'CEO', company: 'Meridian Capital Group', quote: 'Working with Isioma transformed how we approach financial governance. Her depth of expertise and ability to simplify complex issues made an immediate difference to our board', order: 1, isVisible: true },
      { name: 'Chisom Eze', role: 'Associate', company: 'Deloitte Nigeria', quote: 'The mentorship programme she designed gave me the structure and accountability I needed to finally pass my finals and land my first role at a Big 4 firm.', order: 2, isVisible: true },
      { name: 'Ngozi Obi', role: 'Executive Director', company: 'GreenPath NGO', quote: 'She understood the unique challenges nonprofits face in Nigeria. Our compliance has never been in better shape, and our donor reporting is now a point of pride.', order: 3, isVisible: true },
    ];

    const faqsData = [
      { question: 'How quickly will I get a response?', answer: 'We aim to respond to all inquiries within one business day. For urgent matters, please call us directly.', category: 'general', order: 1, isActive: true },
      { question: 'What information should I include in my message?', answer: 'Please share your name, email, phone number, and a brief description of how we can help. The more detail you provide, the better we can assist you.', category: 'general', order: 2, isActive: true },
      { question: 'Do you offer initial consultations?', answer: 'Yes! We offer a free 30-minute discovery call for new clients to discuss your needs and explore how we can help.', category: 'general', order: 3, isActive: true },
      { question: 'What industries do you work with?', answer: 'We work across sectors including financial services, retail, manufacturing, nonprofit/NGO, and professional services. Our chartered expertise adapts to various industries.', category: 'general', order: 4, isActive: true },
      { question: 'Can I request a proposal for your services?', answer: 'Absolutely. After our initial consultation, we can provide a detailed proposal outlining scope, timeline, and investment.', category: 'general', order: 5, isActive: true },
    ];

    const consultancyData = [
      {
        title: 'Strategic Business Advisory',
        description: 'Comprehensive strategic guidance to help your business navigate challenges, identify opportunities, and achieve sustainable growth.',
        icon: 'Lightbulb',
        benefits: [
          'Strategic planning and execution',
          'Market analysis and competitive positioning',
          'Financial modeling and forecasting',
          'Risk assessment and mitigation',
          'Growth strategy development'
        ],
        process: [
          { step: 1, title: 'Discovery', description: 'Understanding your business, goals, and challenges' },
          { step: 2, title: 'Analysis', description: 'Deep dive into data and market positioning' },
          { step: 3, title: 'Strategy', description: 'Developing tailored strategic recommendations' },
          { step: 4, title: 'Implementation', description: 'Supporting execution and monitoring progress' }
        ],
        isActive: true
      },
      {
        title: 'Financial Management Advisory',
        description: 'Expert guidance on financial planning, budgeting, and cash flow management to optimize your business finances.',
        icon: 'TrendingUp',
        benefits: [
          'Budget creation and monitoring',
          'Cash flow optimization',
          'Financial reporting improvements',
          'Cost reduction strategies',
          'Investment advisory'
        ],
        process: [
          { step: 1, title: 'Assessment', description: 'Review current financial processes' },
          { step: 2, title: 'Planning', description: 'Develop customized financial strategies' },
          { step: 3, title: 'Implementation', description: 'Execute recommended changes' },
          { step: 4, title: 'Monitoring', description: 'Track progress and adjust as needed' }
        ],
        isActive: true
      },
      {
        title: 'Governance & Compliance',
        description: 'Ensure your organization meets all regulatory requirements and follows best governance practices.',
        icon: 'Shield',
        benefits: [
          'Regulatory compliance',
          'Board training and development',
          'Policy development',
          'Internal controls',
          'Risk management'
        ],
        process: [
          { step: 1, title: 'Gap Analysis', description: 'Identify compliance gaps' },
          { step: 2, title: 'Framework', description: 'Build governance framework' },
          { step: 3, title: 'Implementation', description: 'Deploy policies and controls' },
          { step: 4, title: 'Review', description: 'Ongoing monitoring and updates' }
        ],
        isActive: true
      }
    ];

    // Clear existing data and seed new
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await FAQ.deleteMany({});
    await Consultancy.deleteMany({});

    await Service.insertMany(servicesData);
    console.log('Services seeded');

    await Project.insertMany(projectsData);
    console.log('Projects seeded');

    await Testimonial.insertMany(testimonialsData);
    console.log('Testimonials seeded');

    await FAQ.insertMany(faqsData);
    console.log('FAQs seeded');

    await Consultancy.insertMany(consultancyData);
    console.log('Consultancy seeded');

    console.log('All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedData();
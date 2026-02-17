import React, { useState, useEffect } from 'react';
import { 
  User, Briefcase, CreditCard, LogOut, Search, 
  MapPin, Clock, DollarSign, CheckCircle, ChevronRight,
  Edit3, Plus, ArrowLeft, Star, Menu, X, Filter, Image as ImageIcon,
  Share2, Shield, MoreHorizontal, Award, MessageSquare, Heart
} from 'lucide-react';

// --- Mock Data ---
const MOCK_JOBS = [
  { 
    id: 1, 
    title: 'ออกแบบโลโก้ร้านกาแฟ Pastel Style', 
    client: 'Cafe A.', 
    clientFull: 'Cafe Amazonite',
    budget: '2,500 - 5,000', 
    tags: ['Graphic Design', 'Logo'], 
    posted: '2 ชม. ที่แล้ว',
    description: 'เรากำลังมองหานักออกแบบกราฟิกที่มีประสบการณ์เพื่อออกแบบโลโก้สำหรับร้านกาแฟสไตล์ Minimalist เปิดใหม่ในย่านอารีย์ \n\nสิ่งที่ต้องการ:\n- โลโก้ที่ดูเรียบง่าย สบายตา\n- เน้นโทนสี Earth Tone (น้ำตาล, ครีม, เขียว)\n- สามารถนำไปใช้กับแก้วกาแฟและป้ายหน้าร้านได้ดี\n\nไฟล์ที่ต้องการ: AI, PNG, PDF',
    clientRating: 4.8,
    reviewCount: 12,
    images: [1, 2], 
    reviews: [
        { id: 1, user: 'สมชาย ดีไซน์', rating: 5, comment: 'บรีฟชัดเจนมากครับ ทำงานด้วยง่าย จ่ายเงินไว', date: '2 วันที่แล้ว' },
        { id: 2, user: 'Anna K.', rating: 4, comment: 'ลูกค้าใส่ใจรายละเอียดดีครับ แต่อาจจะต้องแก้งาน 1-2 รอบเพื่อให้ตรงใจที่สุด', date: '1 สัปดาห์ที่แล้ว' }
    ]
  },
  { 
    id: 2, 
    title: 'พัฒนาเว็บไซต์ Corporate ด้วย React', 
    client: 'Tech Co.', 
    clientFull: 'Tech Company Solutions',
    budget: '20,000+', 
    tags: ['Web Dev', 'React'], 
    posted: '5 ชม. ที่แล้ว', 
    description: 'ต้องการ Web Developer พัฒนาเว็บไซต์บริษัท หน้า Landing Page และ About Us โดยใช้ React และ Tailwind CSS',
    clientRating: 5.0,
    reviewCount: 5,
    images: [1],
    reviews: [
        { id: 3, user: 'Dev Master', rating: 5, comment: 'Requirements ชัดเจนมาก ทีมเทคนิคน่ารักครับ', date: '3 สัปดาห์ที่แล้ว' }
    ]
  },
  { 
    id: 3, 
    title: 'เขียนบทความ SEO เกี่ยวกับการท่องเที่ยว', 
    client: 'Travel Blog', 
    clientFull: 'World Travel Blog',
    budget: '1,500', 
    tags: ['Writing', 'SEO'], 
    posted: '1 วันที่แล้ว',
    description: 'เขียนบทความท่องเที่ยวญี่ปุ่น จำนวน 1000 คำ เน้น Keyword "เที่ยวโตเกียวด้วยตัวเอง" พร้อมหารูปประกอบ',
    clientRating: 4.5,
    reviewCount: 8,
    images: [],
    reviews: [
        { id: 4, user: 'W. Writer', rating: 4, comment: 'งานสนุกครับ แต่เดดไลน์ค่อนข้างกระชั้นชิด', date: '1 เดือนที่แล้ว' }
    ]
  },
  { 
    id: 4, 
    title: 'ตัดต่อวิดีโอ YouTube Vlog', 
    client: 'YouTuber K.', 
    clientFull: 'Kevin Vlogs',
    budget: '3,000', 
    tags: ['Video', 'Premiere Pro'], 
    posted: '3 ชม. ที่แล้ว',
    description: 'ตัดต่อ Vlog ท่องเที่ยว ความยาว 10-15 นาที ใส่ Effect และ Sound ประกอบให้น่าสนใจ สไตล์วัยรุ่น',
    clientRating: 4.2,
    reviewCount: 3,
    images: [1, 2, 3],
    reviews: []
  },
  { 
    id: 5, 
    title: 'แปลเอกสาร ไทย-อังกฤษ 10 หน้า', 
    client: 'Law Firm', 
    clientFull: 'Bangkok Legal Partners',
    budget: '4,000', 
    tags: ['Translation', 'English'], 
    posted: '1 วันที่แล้ว',
    description: 'แปลเอกสารสัญญาทางกฎหมาย ต้องการความถูกต้องแม่นยำสูง ผู้แปลต้องมีความรู้ศัพท์กฎหมาย',
    clientRating: 4.9,
    reviewCount: 20,
    images: [],
    reviews: [
        { id: 5, user: 'Expert Trans', rating: 5, comment: 'มืออาชีพมากครับ', date: '2 เดือนที่แล้ว' }
    ]
  },
];

const MOCK_FREELANCERS = [
  { 
    id: 101, 
    name: 'สมชาย ดีไซน์', 
    role: 'Senior Graphic Designer', 
    rate: '1,500/ชม.', 
    rating: 4.9, 
    location: 'กรุงเทพฯ',
    verified: true,
    about: 'กราฟิกดีไซเนอร์ประสบการณ์กว่า 5 ปี เชี่ยวชาญด้าน Branding และ Logo Design เน้นงานสไตล์ Minimal และ Modern เข้าใจการตลาดช่วยให้งานออกแบบตอบโจทย์ธุรกิจ',
    skills: ['Photoshop', 'Illustrator', 'Figma', 'Branding'],
    experience: '5 ปี',
    completedJobs: 42,
    services: [
        { title: 'ออกแบบโลโก้ & CI Branding', price: 'เริ่มต้น 3,500 ฿' },
        { title: 'ออกแบบสื่อโฆษณา Social Media', price: 'เริ่มต้น 1,000 ฿ / รูป' },
        { title: 'ออกแบบ Packaging', price: 'เริ่มต้น 4,500 ฿' }
    ],
    portfolio: [1, 2, 3, 4],
    reviews: [
        { id: 101, client: 'Coffee A.', rating: 5, comment: 'งานสวยมากครับ ตรงตามที่ต้องการเป๊ะ แนะนำเลย', date: '1 สัปดาห์ที่แล้ว' },
        { id: 102, client: 'Beauty Shop', rating: 4.5, comment: 'ทำงานเร็ว แก้ไขงานได้รวดเร็วทันใจค่ะ', date: '1 เดือนที่แล้ว' }
    ]
  },
  { 
    id: 102, 
    name: 'เจนนี่ เดฟ', 
    role: 'Full Stack Developer', 
    rate: '2,000/ชม.', 
    rating: 5.0, 
    location: 'เชียงใหม่ (Remote)',
    verified: true,
    about: 'Full Stack Developer เชี่ยวชาญ JavaScript Stack (React, Node.js, Next.js) รับทำเว็บไซต์บริษัท E-commerce และ Web Application ทุกรูปแบบ',
    skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
    experience: '4 ปี',
    completedJobs: 28,
    services: [
        { title: 'พัฒนาเว็บไซต์ Corporate', price: 'เริ่มต้น 15,000 ฿' },
        { title: 'ระบบ E-commerce', price: 'เริ่มต้น 35,000 ฿' }
    ],
    portfolio: [1, 2],
    reviews: [
        { id: 103, client: 'Tech Startup', rating: 5, comment: 'Code สะอาด โครงสร้างดี พัฒนาต่อได้ง่ายครับ', date: '2 สัปดาห์ที่แล้ว' }
    ]
  },
  { 
    id: 103, 
    name: 'ไมค์ มาเก็ตติ้ง', 
    role: 'Digital Marketer', 
    rate: '1,200/ชม.', 
    rating: 4.8, 
    location: 'นนทบุรี',
    verified: false,
    about: 'นักการตลาดดิจิทัล รับยิงโฆษณา Facebook, Google Ads และทำ SEO ให้ติดหน้าแรก Google',
    skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Content'],
    experience: '3 ปี',
    completedJobs: 56,
    services: [
        { title: 'ดูแลเพจ + ยิงโฆษณา', price: 'เริ่มต้น 9,000 ฿ / เดือน' },
        { title: 'เขียนบทความ SEO', price: 'เริ่มต้น 500 ฿ / บทความ' }
    ],
    portfolio: [],
    reviews: [
        { id: 104, client: 'Sale Team', rating: 4, comment: 'ยอดขายเพิ่มขึ้นจริงครับ แต่อาจจะต้องปรับกลุ่มเป้าหมายบ่อยหน่อย', date: '3 วันที่แล้ว' }
    ]
  },
];

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
  const baseStyle = "px-6 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2";
  const variants = {
    // Pastel Theme Colors: Soft Indigo/Purple primary
    primary: "bg-indigo-400 text-white hover:bg-indigo-500 active:scale-95 shadow-sm shadow-indigo-100",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
    outline: "border border-indigo-200 text-indigo-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50",
    ghost: "text-slate-500 hover:text-indigo-500 hover:bg-indigo-50",
    danger: "bg-red-50 text-red-500 hover:bg-red-100",
    active: "bg-indigo-50 text-indigo-600 border border-indigo-100" 
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", placeholder, value, onChange, textarea = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
    {textarea ? (
      <textarea 
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all min-h-[120px] resize-none bg-slate-50 focus:bg-white text-slate-700"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input 
        type={type}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-slate-50 focus:bg-white text-slate-700"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:shadow-indigo-50 transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-indigo-200' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- Main Application ---

export default function App() {
  const [view, setView] = useState('home'); 
  const [user, setUser] = useState(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('jobs'); 
  const [selectedJob, setSelectedJob] = useState(null); 
  const [selectedFreelancer, setSelectedFreelancer] = useState(null); 

  // Simulation State
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [freelancers, setFreelancers] = useState(MOCK_FREELANCERS);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFreelancers = freelancers.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
  };

  // --- Actions ---

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setView('job-detail');
  };

  const handleFreelancerClick = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setView('freelancer-detail');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ 
      name: 'คุณกิตติ (Demo)', 
      email: 'user@demo.com', 
      role: 'freelancer', 
      bio: 'นักพัฒนาเว็บผู้หลงใหลในความเรียบง่ายและสีพาสเทล',
      skills: 'React, Tailwind, UI/UX'
    });
    setView('dashboard');
    showNotification('เข้าสู่ระบบสำเร็จ');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setUser({ name: 'New User', email: 'new@demo.com', role: 'client', bio: '-', skills: '-' });
    setView('dashboard');
    showNotification('ลงทะเบียนสำเร็จ ยินดีต้อนรับสู่ Freeland!');
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: jobs.length + 1,
      title: formData.jobTitle || 'โปรเจกต์ใหม่',
      client: user?.name || 'Anonymous',
      clientFull: (user?.name || 'Anonymous') + ' Ltd.',
      budget: formData.budget || 'ต่อรองได้',
      tags: ['New', 'Hiring'],
      posted: 'เมื่อสักครู่',
      description: 'รายละเอียดงานเบื้องต้น...',
      clientRating: 5.0,
      reviewCount: 0,
      reviews: [],
      images: []
    };
    setJobs([newJob, ...jobs]);
    setView('job-board');
    setSearchType('jobs'); 
    showNotification('ลงประกาศงานเรียบร้อยแล้ว');
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setView('dashboard');
    showNotification('ดำเนินการสำเร็จ! ระบบจะแจ้งเตือนเมื่อมีความคืบหน้า', 'success');
  };

  const handleHireClick = (e) => {
    if (e) e.stopPropagation(); 
    if (!user) {
        setView('login');
        showNotification('กรุณาเข้าสู่ระบบก่อนดำเนินการ', 'error');
    } else {
        setView('payment');
    }
  };

  // --- Views ---

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setView(user ? 'dashboard' : 'home')}>
            <div className="w-8 h-8 bg-indigo-400 rounded-xl flex items-center justify-center mr-2 shadow-sm shadow-indigo-200">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-700">Freeland</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => { setView('job-board'); setSearchType('jobs'); }} className={`text-sm font-medium transition-colors ${view === 'job-board' && searchType === 'jobs' ? 'text-indigo-500' : 'text-slate-500 hover:text-indigo-400'}`}>ค้นหางาน</button>
            <button onClick={() => { setView('job-board'); setSearchType('freelancers'); }} className={`text-sm font-medium transition-colors ${view === 'job-board' && searchType === 'freelancers' ? 'text-indigo-500' : 'text-slate-500 hover:text-indigo-400'}`}>หาฟรีแลนซ์</button>
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                <button onClick={() => setView('post-job')} className="text-sm font-medium text-slate-700 hover:text-indigo-500">ลงงาน</button>
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 font-medium">
                      {user.name[0]}
                    </div>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-indigo-50 py-1 hidden group-hover:block">
                    <button onClick={() => setView('profile')} className="block w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50">แก้ไขโปรไฟล์</button>
                    <button onClick={() => { setUser(null); setView('home'); }} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-50">ออกจากระบบ</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => setView('login')} className="text-sm font-medium text-slate-600 hover:text-indigo-500">เข้าสู่ระบบ</button>
                <Button onClick={() => setView('register')} variant="primary" className="!py-2 !px-4 !rounded-full">สมัครสมาชิก</Button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-indigo-50 py-4 px-4 shadow-lg absolute w-full z-50">
          <div className="flex flex-col space-y-4">
            <button onClick={() => { setView('job-board'); setSearchType('jobs'); setIsMenuOpen(false); }} className="text-left font-medium text-slate-600">ค้นหางาน</button>
            <button onClick={() => { setView('job-board'); setSearchType('freelancers'); setIsMenuOpen(false); }} className="text-left font-medium text-slate-600">หาฟรีแลนซ์</button>
            {user ? (
              <>
                <button onClick={() => { setView('profile'); setIsMenuOpen(false); }} className="text-left font-medium text-slate-600">โปรไฟล์ของฉัน</button>
                <button onClick={() => { setView('post-job'); setIsMenuOpen(false); }} className="text-left font-medium text-slate-600">ลงประกาศงาน</button>
                <button onClick={() => { setUser(null); setView('home'); setIsMenuOpen(false); }} className="text-left font-medium text-red-400">ออกจากระบบ</button>
              </>
            ) : (
              <>
                <button onClick={() => { setView('login'); setIsMenuOpen(false); }} className="text-left font-medium text-slate-600">เข้าสู่ระบบ</button>
                <button onClick={() => { setView('register'); setIsMenuOpen(false); }} className="text-left font-medium text-slate-800">สมัครสมาชิก</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  const FreelancerDetailView = () => {
    if (!selectedFreelancer) return <JobBoardView />;

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 animate-in slide-in-from-right duration-300">
        <Button onClick={() => setView('job-board')} variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
          <ArrowLeft size={18} /> กลับไปหน้าค้นหา
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
           {/* Sidebar Info */}
           <div className="space-y-6">
              <Card className="p-6 text-center border-t-4 border-t-indigo-300 shadow-indigo-50">
                 <div className="w-24 h-24 bg-indigo-50 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-indigo-400 border-4 border-white shadow-sm">
                    {selectedFreelancer.name[0]}
                 </div>
                 <h2 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-1">
                    {selectedFreelancer.name} 
                    {selectedFreelancer.verified && <Shield size={16} className="text-teal-400" fill="currentColor" stroke="white" />}
                 </h2>
                 <p className="text-slate-500 text-sm mb-4">{selectedFreelancer.role}</p>
                 
                 <div className="flex justify-center items-center gap-1 mb-6">
                    <Star size={18} className="text-amber-300" fill="currentColor" />
                    <span className="font-bold text-lg text-slate-700">{selectedFreelancer.rating}</span>
                    <span className="text-slate-400 text-sm">(จาก {selectedFreelancer.reviews.length} รีวิว)</span>
                 </div>

                 <Button onClick={handleHireClick} className="w-full mb-2 shadow-indigo-200">จ้างงานทันที</Button>
                 <Button variant="outline" className="w-full">ส่งข้อความ</Button>
              </Card>

              <Card className="p-5 space-y-4">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">ค่าบริการเริ่มต้น</span>
                    <span className="font-bold text-indigo-500">{selectedFreelancer.rate}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">สถานที่</span>
                    <span className="font-bold text-slate-700">{selectedFreelancer.location}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">ประสบการณ์</span>
                    <span className="font-bold text-slate-700">{selectedFreelancer.experience}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">งานที่สำเร็จ</span>
                    <span className="font-bold text-slate-700">{selectedFreelancer.completedJobs} งาน</span>
                 </div>
              </Card>

              <div className="flex flex-wrap gap-2">
                 {selectedFreelancer.skills.map(skill => (
                    <span key={skill} className="bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full text-xs font-medium border border-indigo-100">
                       {skill}
                    </span>
                 ))}
              </div>
           </div>

           {/* Main Content */}
           <div className="md:col-span-2 space-y-8">
              {/* About Section */}
              <section>
                 <h3 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">เกี่ยวกับฉัน</h3>
                 <p className="text-slate-600 leading-relaxed">{selectedFreelancer.about}</p>
              </section>

              {/* Services Section */}
              <section>
                 <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">บริการที่รับทำ (Services)</h3>
                 <div className="space-y-3">
                    {selectedFreelancer.services.map((service, index) => (
                       <div key={index} className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                          <span className="font-medium text-slate-700 flex items-center gap-2">
                             <CheckCircle size={16} className="text-teal-400" /> {service.title}
                          </span>
                          <span className="font-bold text-indigo-500">{service.price}</span>
                       </div>
                    ))}
                 </div>
              </section>

              {/* Portfolio Section */}
              <section>
                 <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">ผลงานที่ผ่านมา (Portfolio)</h3>
                 {selectedFreelancer.portfolio.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {selectedFreelancer.portfolio.map((item, i) => (
                          <div key={i} className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center relative group overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                             <ImageIcon className="text-slate-300 w-8 h-8" />
                             <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                <span className="text-white text-xs font-medium border border-white px-3 py-1 rounded-full">ดูรูปภาพ</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 ) : (
                    <p className="text-slate-400 italic">ยังไม่มีผลงานอัปโหลด</p>
                 )}
              </section>

              {/* Reviews Section */}
              <section>
                 <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">รีวิวจากผู้ว่าจ้าง ({selectedFreelancer.reviews.length})</h3>
                 <div className="space-y-4">
                    {selectedFreelancer.reviews.map((review, i) => (
                       <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-xs font-bold text-pink-500">
                                   {review.client[0]}
                                </div>
                                <div>
                                   <p className="font-bold text-sm text-slate-800">{review.client}</p>
                                   <p className="text-xs text-slate-400">{review.date}</p>
                                </div>
                             </div>
                             <div className="flex text-amber-300">
                                {[...Array(5)].map((_, stars) => (
                                   <Star key={stars} size={12} fill={stars < review.rating ? "currentColor" : "none"} className={stars < review.rating ? "" : "text-slate-200"} />
                                ))}
                             </div>
                          </div>
                          <p className="text-sm text-slate-600 mt-2 pl-11">"{review.comment}"</p>
                       </div>
                    ))}
                 </div>
              </section>
           </div>
        </div>
      </div>
    );
  };

  const JobDetailView = () => {
    if (!selectedJob) return <JobBoardView />;

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 animate-in slide-in-from-right duration-300">
        <Button onClick={() => setView('job-board')} variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
          <ArrowLeft size={18} /> กลับไปหน้าค้นหา
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="flex gap-2 mb-3">
                 {selectedJob.tags.map(tag => (
                   <span key={tag} className="px-2.5 py-1 bg-indigo-50 text-indigo-500 text-xs font-medium rounded-full border border-indigo-100">{tag}</span>
                 ))}
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedJob.title}</h1>
              <p className="text-slate-500 flex items-center gap-2 text-sm">
                <Clock size={16} /> โพสต์เมื่อ {selectedJob.posted}
              </p>
            </div>

            {/* Mock Images Gallery */}
            {selectedJob.images.length > 0 ? (
               <div className="grid grid-cols-2 gap-4">
                  {selectedJob.images.map((img, index) => (
                    <div key={index} className={`bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center relative group ${index === 0 && selectedJob.images.length === 3 ? 'col-span-2 h-64' : 'h-40'}`}>
                      <ImageIcon className="text-slate-300 w-12 h-12" />
                      <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <span className="text-xs font-medium bg-white px-3 py-1 rounded-full shadow-sm text-indigo-500">ดูรูปภาพ</span>
                      </div>
                    </div>
                  ))}
               </div>
            ) : (
               <div className="h-40 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                  ไม่มีรูปภาพประกอบ
               </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">รายละเอียดงาน</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-bold text-slate-800">รีวิวผู้ว่าจ้าง ({selectedJob.reviewCount})</h3>
                 <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-800">{selectedJob.clientRating}</span>
                    <div className="flex flex-col text-xs text-slate-500">
                       <div className="flex text-amber-300">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < Math.floor(selectedJob.clientRating) ? "currentColor" : "none"} className={i < Math.floor(selectedJob.clientRating) ? "" : "text-slate-200"} />
                          ))}
                       </div>
                       <span>คะแนนเต็ม 5.0</span>
                    </div>
                 </div>
              </div>

              {selectedJob.reviews.length > 0 ? (
                 <div className="space-y-4">
                    {selectedJob.reviews.map(review => (
                       <div key={review.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-500">
                                   {review.user[0]}
                                </div>
                                <div>
                                   <p className="font-bold text-sm text-slate-800">{review.user}</p>
                                   <p className="text-xs text-slate-400">{review.date}</p>
                                </div>
                             </div>
                             <div className="flex text-amber-300">
                                {[...Array(5)].map((_, i) => (
                                   <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-200"} />
                                ))}
                             </div>
                          </div>
                          <p className="text-sm text-slate-600 mt-2 pl-11">"{review.comment}"</p>
                       </div>
                    ))}
                 </div>
              ) : (
                 <p className="text-slate-500 text-sm">ยังไม่มีรีวิวสำหรับงานนี้</p>
              )}
            </div>
          </div>

          {/* Sidebar - Client Profile & Actions */}
          <div className="space-y-6">
            <Card className="p-6 border-t-4 border-t-indigo-300 shadow-indigo-50">
               <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-400 mb-3 shadow-md border-4 border-white">
                     {selectedJob.client[0]}
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">{selectedJob.clientFull}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                     <Shield size={14} className="text-teal-400" /> ยืนยันตัวตนแล้ว
                  </p>
               </div>

               <div className="space-y-4 mb-6 pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">งบประมาณ</span>
                     <span className="font-bold text-xl text-indigo-500">{selectedJob.budget} ฿</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">สถานะ</span>
                     <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">เปิดรับสมัคร</span>
                  </div>
               </div>

               <Button onClick={handleHireClick} className="w-full mb-3 shadow-indigo-200">
                  เสนอราคา / สมัครงาน
               </Button>
               <Button variant="outline" className="w-full text-xs">
                  ส่งข้อความ
               </Button>
            </Card>

            <div className="bg-indigo-50/50 p-4 rounded-xl text-xs text-slate-500 space-y-2 border border-indigo-50">
               <p className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-400" /> การชำระเงินได้รับการคุ้มครอง</p>
               <p className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-400" /> ไม่มีการหักค่าธรรมเนียมแฝง</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="animate-in fade-in duration-500">
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-500 text-sm font-medium mb-6 border border-indigo-100">
          ✨ แพลตฟอร์มสำหรับคนรุ่นใหม่ หัวใจพาสเทล
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800 mb-6 leading-tight">
          จ้างงานคุณภาพ <br className="hidden md:block" />
          <span className="text-indigo-400">ในพื้นที่แห่งอิสระ Freeland</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          เชื่อมต่อฟรีแลนซ์ฝีมือดีกับผู้ประกอบการที่เข้าใจงาน ด้วยบรรยากาศที่เป็นกันเอง เรียบง่าย และสดใส
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => setView('register')} className="!py-3 !px-8 !text-base shadow-indigo-200">เริ่มต้นใช้งานฟรี</Button>
          <Button onClick={() => { setView('job-board'); setSearchType('jobs'); }} variant="secondary" className="!py-3 !px-8 !text-base">ดูงานทั้งหมด</Button>
        </div>
      </section>
      
      <section className="bg-gradient-to-b from-white to-indigo-50/30 py-20 px-4 border-y border-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Search className="w-6 h-6" />, title: 'ค้นหาง่าย', desc: 'ระบบคัดกรองที่เน้นความแม่นยำ ไม่เสียเวลา', color: 'bg-blue-100 text-blue-500' },
              { icon: <CheckCircle className="w-6 h-6" />, title: 'ยืนยันตัวตน', desc: 'ปลอดภัยด้วยระบบ Verified User ทั้งสองฝ่าย', color: 'bg-green-100 text-green-500' },
              { icon: <CreditCard className="w-6 h-6" />, title: 'ชำระเงินปลอดภัย', desc: 'เงินของคุณจะถูกพักไว้จนกว่างานจะสำเร็จ', color: 'bg-pink-100 text-pink-500' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform hover:shadow-md hover:shadow-indigo-50">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const AuthView = ({ isRegister }) => (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-indigo-50/30">
      <Card className="w-full max-w-md p-8 md:p-10 border-indigo-100 shadow-indigo-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">{isRegister ? 'สร้างบัญชีใหม่' : 'ยินดีต้อนรับกลับมา'}</h2>
          <p className="text-slate-500 mt-2 text-sm">กรอกข้อมูลเพื่อเข้าสู่ระบบ Freeland</p>
        </div>
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
             <Input label="ชื่อ-นามสกุล" placeholder="เช่น สมชาย ใจดี" onChange={() => {}} />
          )}
          <Input label="อีเมล" type="email" placeholder="name@company.com" onChange={() => {}} />
          <Input label="รหัสผ่าน" type="password" placeholder="••••••••" onChange={() => {}} />
          
          <Button type="submit" variant="primary" className="w-full mt-6 !py-3 shadow-indigo-200">
            {isRegister ? 'ลงทะเบียน' : 'เข้าสู่ระบบ'}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-500">
          {isRegister ? 'มีบัญชีอยู่แล้ว? ' : 'ยังไม่มีบัญชี? '}
          <button 
            onClick={() => setView(isRegister ? 'login' : 'register')} 
            className="text-indigo-500 font-semibold hover:underline"
          >
            {isRegister ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </button>
        </div>
      </Card>
    </div>
  );

  const DashboardView = () => (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">สวัสดี, {user?.name} 👋</h2>
          <p className="text-slate-500 mt-1">จัดการงานและโปรไฟล์ของคุณได้ที่นี่</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setView('post-job')} variant="primary" className="!rounded-full shadow-indigo-200">
            <Plus size={18} /> ลงงานใหม่
          </Button>
          <Button onClick={() => setView('profile')} variant="outline" className="!rounded-full">
            <User size={18} /> โปรไฟล์
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'งานที่กำลังทำ', val: '2', color: 'bg-blue-100 text-blue-500' },
          { label: 'ประกาศงาน', val: '5', color: 'bg-teal-100 text-teal-600' },
          { label: 'ข้อความใหม่', val: '3', color: 'bg-purple-100 text-purple-500' },
          { label: 'ยอดเงินคงเหลือ', val: '฿4,500', color: 'bg-amber-100 text-amber-600' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 flex items-center justify-between border-slate-100 hover:border-indigo-100">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.val}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
              <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">งานแนะนำล่าสุด</h3>
            <button onClick={() => { setView('job-board'); setSearchType('jobs'); }} className="text-sm text-slate-500 hover:text-indigo-500">ดูทั้งหมด</button>
          </div>
          {jobs.slice(0, 3).map((job) => (
            <Card key={job.id} onClick={() => handleJobClick(job)} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all">
              <div>
                <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-500 transition-colors">{job.title}</h4>
                <div className="flex flex-wrap gap-2 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase size={14} /> {job.client}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {job.posted}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-50 text-slate-600 text-xs rounded-full border border-slate-100">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-3 min-w-[120px]">
                <span className="font-bold text-indigo-500">{job.budget} ฿</span>
                <Button onClick={handleHireClick} variant="outline" className="!py-1.5 !px-3 !text-xs w-full hover:bg-indigo-50">จ้างงาน</Button>
              </div>
            </Card>
          ))}
        </div>

        <div>
           <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">ฟรีแลนซ์แนะนำ</h3>
            <button onClick={() => { setView('job-board'); setSearchType('freelancers'); }} className="text-xs text-slate-500 hover:text-indigo-500">ดูทั้งหมด</button>
          </div>
          <div className="space-y-4">
            {freelancers.slice(0, 2).map(f => (
              <Card key={f.id} onClick={() => handleFreelancerClick(f)} className="p-5 cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-lg font-bold text-indigo-400">
                    {f.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                        {f.name}
                        {f.verified && <Shield size={12} className="text-teal-400" fill="currentColor" stroke="white" />}
                    </h4>
                    <p className="text-xs text-slate-500">{f.role}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3 mt-2">
                  <span className="font-medium text-slate-800">{f.rate}</span>
                  <span className="flex items-center gap-1 text-amber-300 text-xs"><Star size={12} fill="currentColor" /> {f.rating}</span>
                </div>
                <Button onClick={handleHireClick} variant="secondary" className="w-full mt-3 !text-xs !py-2">จ้างงาน</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileEditView = () => (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Button onClick={() => setView('dashboard')} variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
        <ArrowLeft size={18} /> กลับไปหน้าแดชบอร์ด
      </Button>
      <Card className="p-8 shadow-indigo-50 border-indigo-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">แก้ไขโปรไฟล์</h2>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Active</span>
        </div>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-300 border-2 border-dashed border-indigo-200 cursor-pointer hover:border-indigo-400 hover:text-indigo-400 transition-all relative overflow-hidden group">
            {user?.name[0]}
            <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <ImageIcon className="text-white" size={24} />
            </div>
          </div>
          <div>
            <Button variant="outline" className="text-xs" onClick={() => showNotification('จำลองการอัปโหลดรูปภาพ', 'success')}>อัปโหลดรูปภาพ</Button>
            <p className="text-xs text-slate-400 mt-2">รองรับ JPG, PNG ขนาดไม่เกิน 2MB</p>
          </div>
        </div>

        <form className="space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
             <Input label="ชื่อจริง" value={user?.name} onChange={(e) => setUser({...user, name: e.target.value})} />
             <Input label="ตำแหน่งงาน (เช่น Web Dev)" placeholder="ระบุตำแหน่ง" onChange={() => {}} />
          </div>
          <Input label="ทักษะ (คั่นด้วยจุลภาค)" value={user?.skills} onChange={(e) => setUser({...user, skills: e.target.value})} />
          <Input label="เกี่ยวกับฉัน" textarea placeholder="เขียนแนะนำตัวสั้นๆ..." value={user?.bio} onChange={(e) => setUser({...user, bio: e.target.value})} />
          
          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <Button onClick={() => setView('dashboard')} variant="ghost">ยกเลิก</Button>
            <Button onClick={() => { setView('dashboard'); showNotification('บันทึกข้อมูลเรียบร้อย'); }} variant="primary">บันทึกการเปลี่ยนแปลง</Button>
          </div>
        </form>
      </Card>
    </div>
  );

  const PostJobView = () => (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Button onClick={() => setView('dashboard')} variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
        <ArrowLeft size={18} /> ย้อนกลับ
      </Button>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">ลงประกาศงานฟรีแลนซ์</h2>
        <p className="text-slate-500 mt-2">ระบุรายละเอียดเพื่อให้ได้ฟรีแลนซ์ที่ตรงใจที่สุด</p>
      </div>

      <Card className="p-8 shadow-indigo-50 border-indigo-100">
        <form onSubmit={handlePostJob}>
          <Input 
            label="ชื่องาน" 
            placeholder="เช่น ออกแบบโลโก้ร้านกาแฟสไตล์มินิมอล" 
            onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
          />
          <div className="grid md:grid-cols-2 gap-4">
             <Input 
               label="งบประมาณ (บาท)" 
               type="number" 
               placeholder="เช่น 5000"
               onChange={(e) => setFormData({...formData, budget: e.target.value})} 
             />
             <Input label="ระยะเวลาดำเนินงาน" placeholder="เช่น 3 วัน" onChange={() => {}} />
          </div>
          <div className="mb-4">
             <label className="block text-sm font-medium text-slate-600 mb-1.5">ประเภทงาน</label>
             <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-700 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all">
                <option>Graphic & Design</option>
                <option>Web & Programming</option>
                <option>Writing & Translation</option>
             </select>
          </div>
          <Input label="รายละเอียดงาน" textarea placeholder="อธิบายขอบเขตงาน..." onChange={() => {}} />
          
          <Button type="submit" variant="primary" className="w-full mt-4 !py-3 shadow-indigo-200">
            ลงประกาศงาน
          </Button>
        </form>
      </Card>
    </div>
  );

  const PaymentView = () => (
    <div className="max-w-lg mx-auto px-4 py-12 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-500">
          <DollarSign className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">ยืนยันการจ้างงาน/ชำระเงิน</h2>
        <p className="text-slate-500">เงินของคุณจะถูกพักไว้ในระบบจนกว่างานจะเสร็จสิ้น</p>
      </div>

      <Card className="p-6 md:p-8 bg-white border-t-4 border-t-indigo-400 shadow-indigo-50">
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
          <div>
            <p className="text-sm text-slate-500">ยอดรวมโดยประมาณ</p>
            <h3 className="text-3xl font-bold text-indigo-500">฿5,000.00</h3>
          </div>
          <div className="text-right">
             <p className="text-xs text-slate-400">Order ID</p>
             <p className="font-mono text-sm text-slate-600">#FL-8823</p>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <Input label="หมายเลขบัตรเครดิต" placeholder="0000 0000 0000 0000" onChange={() => {}} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="วันหมดอายุ" placeholder="MM/YY" onChange={() => {}} />
            <Input label="CVC" placeholder="123" type="password" onChange={() => {}} />
          </div>
          <Input label="ชื่อบนบัตร" placeholder="NAME SURNAME" onChange={() => {}} />
          
          <Button type="submit" variant="primary" className="w-full mt-6 !py-3 flex justify-between items-center shadow-indigo-200">
            <span>ยืนยันและชำระเงิน</span>
            <ChevronRight size={18} />
          </Button>
        </form>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
           <div className="w-2 h-2 bg-teal-400 rounded-full"></div> 256-bit SSL Secured
        </div>
      </Card>
      
      <Button onClick={() => setView('dashboard')} variant="ghost" className="mt-6 mx-auto">
        ยกเลิกและกลับไปหน้าหลัก
      </Button>
    </div>
  );

  const JobBoardView = () => (
    <div className="pt-8 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">ตลาดงานและฟรีแลนซ์</h2>
              <div className="flex gap-2 bg-slate-50 p-1 rounded-xl inline-flex border border-slate-100">
                <button 
                  onClick={() => setSearchType('jobs')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${searchType === 'jobs' ? 'bg-white text-indigo-500 shadow-sm' : 'text-slate-500 hover:text-indigo-400'}`}
                >
                  ค้นหางาน
                </button>
                <button 
                  onClick={() => setSearchType('freelancers')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${searchType === 'freelancers' ? 'bg-white text-indigo-500 shadow-sm' : 'text-slate-500 hover:text-indigo-400'}`}
                >
                  หาฟรีแลนซ์
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex gap-2">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder={searchType === 'jobs' ? "ค้นหาชื่องาน..." : "ค้นหาชื่อ หรือ ทักษะ..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-slate-700 bg-white" 
                />
              </div>
              <Button variant="outline" className="!px-3"><Filter size={18} /></Button>
            </div>
          </div>

          <div className="space-y-4 mb-12 animate-in fade-in duration-500">
            {searchType === 'jobs' ? (
              filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} onClick={() => handleJobClick(job)} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group hover:border-indigo-200">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-500 transition-colors">{job.title}</h4>
                      <div className="flex gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Briefcase size={14} /> {job.client}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {job.posted}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {job.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-500 text-xs rounded-full border border-indigo-100">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0 justify-between sm:justify-end w-full sm:w-auto">
                        <span className="font-bold text-slate-700">{job.budget} ฿</span>
                        <Button onClick={handleHireClick} variant="primary" className="!text-xs shadow-indigo-100">จ้างงาน</Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">ไม่พบงานที่ค้นหา</div>
              )
            ) : (
              filteredFreelancers.length > 0 ? (
                filteredFreelancers.map((f) => (
                  <Card key={f.id} onClick={() => handleFreelancerClick(f)} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-indigo-200">
                     <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-xl font-bold text-indigo-400">
                        {f.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg flex items-center gap-1">
                            {f.name}
                            {f.verified && <Shield size={14} className="text-teal-400" fill="currentColor" stroke="white" />}
                        </h4>
                        <p className="text-sm text-slate-500">{f.role}</p>
                        <div className="flex gap-2 mt-2">
                           {f.skills.map(s => <span key={s} className="text-xs bg-slate-50 px-2 py-1 rounded-full text-slate-600 border border-slate-100">{s}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0 justify-between sm:justify-end w-full sm:w-auto">
                       <div className="text-right mr-4">
                          <p className="font-bold text-indigo-500">{f.rate}</p>
                          <div className="flex items-center justify-end gap-1 text-amber-300 text-xs"><Star size={12} fill="currentColor" /> {f.rating}</div>
                       </div>
                       <Button onClick={handleHireClick} variant="primary" className="!text-xs shadow-indigo-100">จ้างงาน</Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">ไม่พบฟรีแลนซ์ที่ค้นหา</div>
              )
            )}
          </div>
      </div>
    </div>
  );

  // --- Render ---

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700 selection:bg-indigo-200 selection:text-indigo-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right fade-in duration-300">
          <div className={`px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 ${notification.type === 'success' ? 'bg-teal-400 text-white' : 'bg-red-400 text-white'}`}>
            <CheckCircle size={18} />
            <span className="font-medium text-sm">{notification.msg}</span>
          </div>
        </div>
      )}

      <Navbar />

      <main>
        {view === 'home' && <HomeView />}
        {(view === 'login' || view === 'register') && <AuthView isRegister={view === 'register'} />}
        {view === 'dashboard' && <DashboardView />}
        {view === 'profile' && <ProfileEditView />}
        {view === 'post-job' && <PostJobView />}
        {view === 'job-board' && <JobBoardView />}
        {view === 'job-detail' && <JobDetailView />}
        {view === 'freelancer-detail' && <FreelancerDetailView />}
        {view === 'payment' && <PaymentView />}
      </main>

      <footer className="bg-slate-50 py-12 border-t border-indigo-50 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-bold text-xl mb-4 text-indigo-400">Freeland</p>
          <p className="text-slate-400 text-sm">© 2026 Freeland Platform. พื้นที่อิสระของคนทำงาน</p>
        </div>
      </footer>
    </div>
  );
}
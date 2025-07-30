'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import AcademicReportPopup from '../components/academic-report-popup';
import '@/styles/dashboard.scss';

type DashboardView = 'home' | 'classes' | 'assignments' | 'grades' | 'reports' | 'ai-monitoring' | 'ai-assistant' | 'notifications' | 'alerts' | 'settings';
type AccountType = 'teacher' | 'student';

export default function DashboardPage() {
  const { session, isAuthenticated, status, signOut, isLoading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<DashboardView>('home');
  const [accountType, setAccountType] = useState<AccountType>('teacher');
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // For demo purposes, we'll skip authentication check
  // In production, you would want to keep the authentication check
  /*
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  */

  const teacherNavItems = [
    { id: 'home', label: 'Home Base', icon: '🏠' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'ai-monitoring', label: 'AI Monitoring', icon: '🤖' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: '💬' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const studentNavItems = [
    { id: 'home', label: 'Home Base', icon: '🏠' },
    { id: 'classes', label: 'Classes', icon: '📚' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'grades', label: 'Grades', icon: '📊' },
    { id: 'reports', label: 'Reports', icon: '📋' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: '💬' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ];

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowAccountPopup(false);
      }
    }

    if (showAccountPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAccountPopup]);

  // Filter navigation items based on account type
  const getFilteredNavItems = () => {
    return accountType === 'teacher' ? teacherNavItems : studentNavItems;
  };

  const handleAccountSwitch = (newAccountType: AccountType) => {
    setAccountType(newAccountType);
    setActiveView('home'); // Reset to home view when switching accounts
    setShowAccountPopup(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Polaris</h2>
        </div>
        
        <nav className="sidebar-nav">
                      {getFilteredNavItems().map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as DashboardView)}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info-container" ref={popupRef}>
            <div 
              className="user-info" 
              onClick={() => setShowAccountPopup(!showAccountPopup)}
            >
              <Avatar className="user-avatar">
                <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                <AvatarFallback className="text-sm">
                  {accountType === 'teacher' ? 'T' : 'S'}
                </AvatarFallback>
              </Avatar>
              <div className="user-details">
                <span className="user-name">
                  {accountType === 'teacher' ? 'Mr. Johnson' : 'Alex Smith'}
                </span>
                <span className="user-role">
                  {accountType === 'teacher' ? 'Teacher' : 'Student'}
                </span>
              </div>
              <button className={`dropdown-arrow ${showAccountPopup ? 'open' : ''}`}>▼</button>
            </div>
            
            {showAccountPopup && (
              <div className="account-popup">
                <div className="popup-header">
                  <span className="popup-title">Switch Account</span>
                </div>
                <div className="popup-content">
                  <button 
                    className={`account-option ${accountType === 'teacher' ? 'active' : ''}`}
                    onClick={() => handleAccountSwitch('teacher')}
                  >
                    <div className="account-info">
                      <Avatar className="account-avatar">
                        <AvatarFallback>T</AvatarFallback>
                      </Avatar>
                      <div className="account-details">
                        <span className="account-name">Mr. Johnson</span>
                        <span className="account-type">Teacher</span>
                      </div>
                    </div>
                    {accountType === 'teacher' && <span className="check-icon">✓</span>}
                  </button>
                  
                  <button 
                    className={`account-option ${accountType === 'student' ? 'active' : ''}`}
                    onClick={() => handleAccountSwitch('student')}
                  >
                    <div className="account-info">
                      <Avatar className="account-avatar">
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                      <div className="account-details">
                        <span className="account-name">Alex Smith</span>
                        <span className="account-type">Student</span>
                      </div>
                    </div>
                    {accountType === 'student' && <span className="check-icon">✓</span>}
                  </button>
                </div>
              </div>
            )}
          </div>
                      <Button 
              onClick={() => router.push('/login')}
              disabled={isLoading}
              variant="outline"
              className="sign-out-btn"
            >
              Sign Out
            </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {accountType === 'teacher' ? (
          <>
            {activeView === 'home' && <HomeBaseView />}
            {activeView === 'reports' && <ReportsView />}
            {activeView === 'ai-monitoring' && <AIMonitoringView />}
            {activeView === 'ai-assistant' && <AIAssistantView />}
            {activeView === 'notifications' && <NotificationsView />}
            {activeView === 'alerts' && <AlertsView />}
            {activeView === 'settings' && <SettingsView />}
          </>
        ) : (
          <>
            {activeView === 'home' && <StudentHomeBase />}
            {activeView === 'classes' && <StudentClasses />}
            {activeView === 'assignments' && <StudentAssignments />}
            {activeView === 'grades' && <StudentGrades />}
            {activeView === 'reports' && <StudentReports />}
            {activeView === 'ai-assistant' && <AIAssistantView />}
            {activeView === 'notifications' && <NotificationsView />}
          </>
        )}
      </main>
    </div>
  );
}

// Student Classes Component
function StudentClasses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('Grid');
  const [filterClass, setFilterClass] = useState('All Classes');

  return (
    <div className="student-classes">
      <div className="classes-header">
        <div className="header-content">
          <h1 className="page-title">Classes</h1>
          <p className="page-subtitle">Manage your classes and track student progress</p>
        </div>
        <Button className="create-class-btn">
          <span className="btn-icon">+</span>
          Join Class
        </Button>
      </div>

      <div className="filters-section">
        <div className="search-filter">
          <Input
            type="text"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filterClass} 
            onChange={(e) => setFilterClass(e.target.value)}
            className="filter-dropdown"
          >
            <option value="All Classes">All Classes</option>
            <option value="Biology">Biology</option>
            <option value="AP Biology">AP Biology</option>
          </select>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'Grid' ? 'active' : ''}`}
              onClick={() => setViewMode('Grid')}
            >
              Grid
            </button>
            <button 
              className={`view-btn ${viewMode === 'List' ? 'active' : ''}`}
              onClick={() => setViewMode('List')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <div className={`classes-grid ${viewMode.toLowerCase()}-view`}>
        <div className="class-card">
          <div className="class-header">
            <div className="class-title-section">
              <h3 className="class-title">Biology 1</h3>
              <div className="class-meta">
                <span className="class-period">Period 1</span>
                <span className="student-count">32 students</span>
              </div>
            </div>
          </div>
          
          <div className="class-stats">
            <div className="stat-row">
              <span className="stat-label">Attendance:</span>
              <span className="stat-value attendance">94%</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Avg Grade:</span>
              <span className="stat-value grade">89%</span>
            </div>
          </div>
          
          <div className="attendance-bar">
            <div className="bar-label">Weekly Attendance</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '94%'}}></div>
            </div>
            <div className="bar-percentage">94%</div>
          </div>
          
          <div className="recent-activity">
            <h4>Recent Activity</h4>
            <p>Sarah Johnson submitted Cell Division Quiz</p>
          </div>
          
          <div className="next-assignment">
            <h4>Next Assignment</h4>
            <div className="assignment-info">
              <span className="assignment-title">Photosynthesis Lab</span>
              <span className="assignment-due">Due Friday</span>
            </div>
          </div>
          
          <div className="class-actions">
            <Button className="action-btn secondary">View Class</Button>
            <Button className="action-btn primary">Students</Button>
          </div>
        </div>

        <div className="class-card">
          <div className="class-header">
            <div className="class-title-section">
              <h3 className="class-title">AP Biology</h3>
              <div className="class-meta">
                <span className="class-period">Period 2</span>
                <span className="student-count">0 students</span>
              </div>
            </div>
          </div>
          
          <div className="class-stats">
            <div className="stat-row">
              <span className="stat-label">Attendance:</span>
              <span className="stat-value attendance na">N/A</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Avg Grade:</span>
              <span className="stat-value grade na">N/A</span>
            </div>
          </div>
          
          <div className="attendance-bar">
            <div className="bar-label">Weekly Attendance</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '0%'}}></div>
            </div>
            <div className="bar-percentage">N/A</div>
          </div>
          
          <div className="recent-activity">
            <h4>Recent Activity</h4>
            <p>No recent activity</p>
          </div>
          
          <div className="next-assignment">
            <h4>Next Assignment</h4>
            <div className="assignment-info">
              <span className="assignment-title">No assignments scheduled</span>
            </div>
          </div>
          
          <div className="class-actions">
            <Button className="action-btn secondary">View Class</Button>
            <Button className="action-btn primary">Students</Button>
          </div>
        </div>

        <div className="class-card">
          <div className="class-header">
            <div className="class-title-section">
              <h3 className="class-title">Biology 2</h3>
              <div className="class-meta">
                <span className="class-period">Period 3</span>
                <span className="student-count">28 students</span>
              </div>
            </div>
          </div>
          
          <div className="class-stats">
            <div className="stat-row">
              <span className="stat-label">Attendance:</span>
              <span className="stat-value attendance">91%</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Avg Grade:</span>
              <span className="stat-value grade">85%</span>
            </div>
          </div>
          
          <div className="attendance-bar">
            <div className="bar-label">Weekly Attendance</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '91%'}}></div>
            </div>
            <div className="bar-percentage">91%</div>
          </div>
          
          <div className="recent-activity">
            <h4>Recent Activity</h4>
            <p>Mike Chen asked a question about genetics</p>
          </div>
          
          <div className="next-assignment">
            <h4>Next Assignment</h4>
            <div className="assignment-info">
              <span className="assignment-title">DNA Structure Quiz</span>
              <span className="assignment-due">Due Monday</span>
            </div>
          </div>
          
          
          <div className="class-actions">
            <Button className="action-btn secondary">View Class</Button>
            <Button className="action-btn primary">Students</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Student Grades Component
function StudentGrades() {
  const [activeTab, setActiveTab] = useState('Gradebook');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('student');

  const gradebookData = {
    columns: [
      { label: 'Student' },
      { label: 'Cell Division Quiz', points: 25 },
      { label: 'Photosynthesis Lab', points: 50 },
      { label: 'Genetics Problem Set', points: 30 },
      { label: 'Midterm Exam', points: 100 },
      { label: 'Final Project', points: 75 },
      { label: 'Overall Grade' }
    ],
    rows: [
      {
        student: { name: 'Sarah Johnson', email: 'sarah.johnson@school.edu' },
        grades: ['23/25', '47/50', '28/30', '95/100', '70/75', 'A']
      },
      {
        student: { name: 'Mike Chen', email: 'mike.chen@school.edu' },
        grades: ['20/25', '42/50', '25/30', '82/100', '65/75', 'B+']
      },
      {
        student: { name: 'Emily Rodriguez', email: 'emily.rodriguez@school.edu' },
        grades: ['24/25', '49/50', '29/30', '88/100', '72/75', 'A-']
      },
      {
        student: { name: 'David Wilson', email: 'david.wilson@school.edu' },
        grades: ['18/25', '35/50', '22/30', '70/100', '55/75', 'C+']
      }
    ]
  };

  const getGradeColor = (grade: string, points?: number) => {
    if (grade.includes('/')) {
      const [earned, total] = grade.split('/').map(Number);
      const percentage = (earned / total) * 100;
      if (percentage >= 90) return 'high';
      if (percentage >= 80) return 'medium';
      if (percentage < 70) return 'low';
      return 'medium';
    }
    // Letter grades
    if (['A', 'A-'].includes(grade)) return 'high';
    if (['B+', 'B', 'B-'].includes(grade)) return 'medium';
    return 'low';
  };

  return (
    <div className="student-grades">
      <div className="grades-header">
        <div className="header-content">
          <h1 className="page-title">Grades</h1>
          <div className="tab-navigation">
            {['Gradebook', 'Analytics', 'Reports'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="header-controls">
          <Button className="control-btn secondary">Export</Button>
          <Button className="control-btn secondary">Import</Button>
          <Button className="control-btn secondary">Settings</Button>
        </div>
      </div>

      <div className="grades-filters">
        <div className="search-section">
          <Input
            type="text"
            placeholder="Search students, assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-section">
          <select 
            value={filterBy} 
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select"
          >
            <option value="student">Filter by Student</option>
            <option value="assignment">Filter by Assignment</option>
            <option value="grade">Filter by Grade</option>
          </select>
        </div>
      </div>

      {activeTab === 'Gradebook' && (
        <div className="gradebook-container">
          <div className="gradebook-table">
            <div className="table-header">
              {gradebookData.columns.map((column, index) => (
                <div key={index} className={`header-cell ${index === 0 ? 'student-column' : 'grade-column'}`}>
                  <div className="column-label">{column.label}</div>
                  {column.points && (
                    <div className="column-points">{column.points} pts</div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="table-body">
              {gradebookData.rows.map((row, rowIndex) => (
                <div key={rowIndex} className="table-row">
                  <div className="student-cell">
                    <div className="student-info">
                      <div className="student-name">{row.student.name}</div>
                      <div className="student-email">{row.student.email}</div>
                    </div>
                  </div>
                  
                  {row.grades.map((grade, gradeIndex) => (
                    <div 
                      key={gradeIndex} 
                      className={`grade-cell ${getGradeColor(grade, gradebookData.columns[gradeIndex + 1]?.points)}`}
                    >
                      <div className="grade-value">{grade}</div>
                      {grade.includes('/') && (
                        <div className="grade-percentage">
                          {Math.round((parseInt(grade.split('/')[0]) / parseInt(grade.split('/')[1])) * 100)}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Analytics' && (
        <div className="analytics-content">
          <div className="analytics-placeholder">
            <h3>Grade Analytics</h3>
            <p>Analytics dashboard coming soon...</p>
          </div>
        </div>
      )}

      {activeTab === 'Reports' && (
        <div className="reports-content">
          <div className="reports-placeholder">
            <h3>Grade Reports</h3>
            <p>Reports dashboard coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Student Reports Component
function StudentReports() {
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [reportContent, setReportContent] = useState('');

  const metricsSummary = [
    { label: 'Total Reports', value: 47 },
    { label: 'Scheduled', value: 12 },
    { label: 'This Month', value: 8 },
    { label: 'Shared', value: 23 }
  ];

  const reportTemplates = [
    {
      title: 'Academic Performance',
      description: 'Student grades, test scores, and academic progress analysis',
      actions: ['Generate', 'Preview']
    },
    {
      title: 'Attendance Analysis',
      description: 'Attendance patterns, trends, and at-risk student identification',
      actions: ['Generate', 'Preview']
    },
    {
      title: 'Teacher Performance',
      description: 'Teaching effectiveness, student outcomes, and professional development',
      actions: ['Generate', 'Preview']
    },
    {
      title: 'Financial Summary',
      description: 'Budget analysis, expense tracking, and financial performance metrics',
      actions: ['Generate', 'Preview']
    },
    {
      title: 'Parent Engagement',
      description: 'Communication metrics, meeting participation, and feedback analysis',
      actions: ['Generate', 'Preview']
    },
    {
      title: 'Curriculum Analysis',
      description: 'Course effectiveness, learning outcomes, and curriculum optimization',
      actions: ['Generate', 'Preview']
    }
  ];

  const recentReports = [
    {
      title: 'Q4 Academic Performance Report',
      category: 'academic',
      date: 'Jul 28, 2025',
      size: '2.1 MB',
      downloads: 15,
      shared: true,
      description: 'Comprehensive analysis of student academic performance for Q4 2024, including grade trends and subject-specific insights.',
      actions: ['Download', 'Preview', 'Share', 'Delete']
    },
    {
      title: 'Monthly Attendance Analysis',
      category: 'attendance',
      date: 'Jul 25, 2025',
      size: '1.8 MB',
      downloads: 8,
      shared: true,
      description: 'Detailed attendance patterns and chronic absenteeism analysis for December 2024.',
      actions: ['Download', 'Preview', 'Share', 'Delete']
    },
    {
      title: 'Teacher Effectiveness Review',
      category: 'teacher',
      date: 'Jul 23, 2025',
      size: '3.4 MB',
      downloads: 12,
      shared: true,
      description: 'Comprehensive teacher performance evaluation and professional development recommendations.',
      actions: ['Download', 'Preview', 'Share', 'Delete']
    },
    {
      title: 'Financial Summary Report',
      category: 'financial',
      date: 'Jul 22, 2025',
      size: '1.9 MB',
      downloads: 22,
      shared: true,
      description: 'Annual financial performance analysis including budget allocation and expense tracking.',
      actions: ['Download', 'Preview', 'Share', 'Delete']
    },
    {
      title: 'Parent Engagement Metrics',
      category: 'parent',
      date: 'Jul 19, 2025',
      size: '965 KB',
      downloads: 6,
      shared: true,
      description: 'Parent feedback, meeting attendance, and engagement metrics breakdown.',
      actions: ['Download', 'Preview', 'Share', 'Delete']
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '📚';
      case 'attendance': return '📅';
      case 'teacher': return '👨‍🏫';
      case 'financial': return '💰';
      case 'parent': return '👨‍👩‍👧‍👦';
      default: return '📄';
    }
  };

  // Function to generate the academic performance report content
  const generateAcademicReport = () => {
    return `Academic Performance Report for Student

Overall Performance Summary:

Based on comprehensive analysis of your recent academic activities, you've shown commendable progress in several key areas. Your dedication to learning is evident through consistent participation and the quality of work submitted. In mathematics, you've demonstrated strong analytical skills, particularly in algebraic problem-solving. Your approach to complex problems shows logical reasoning and persistence.

Subject-Specific Feedback:

In science classes, your curiosity and inquisitiveness have been notable. Your lab reports show attention to detail and a genuine interest in understanding scientific concepts. However, there's room for improvement in organizing your thoughts more clearly in written explanations. In English literature, your creative writing has shown significant growth. Your ability to analyze character development and themes in novels has improved substantially. Continue to work on supporting your arguments with more textual evidence.

Teacher Comments:

Your homeroom teacher notes that you're a respectful and engaged student who contributes positively to classroom discussions. They've observed that you sometimes hesitate to ask questions when concepts aren't clear. Remember, seeking clarification is a sign of intellectual curiosity, not weakness. Your art teacher has praised your creativity and originality in projects. They encourage you to experiment with different mediums to further develop your artistic expression.

Recommendations for Continued Growth:

To enhance your academic journey, consider forming study groups with classmates to deepen your understanding of challenging topics. Regular review of class materials and seeking extra help when needed will support your continued success. Set specific, measurable goals for each subject and track your progress. This will help you stay motivated and focused on continuous improvement.`;
  };

  // Function to handle generating the academic report
  const handleGenerateReport = () => {
    setShowReportPopup(true);
    setReportContent(''); // Reset content
    
    // Generate the full report content
    const fullReport = generateAcademicReport();
    
    // Animate the text character by character
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullReport.length) {
        setReportContent(prev => prev + fullReport.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10); // Adjust speed as needed (lower = faster)
  };

  return (
    <div className="student-reports">
      <div className="reports-header">
        <div className="header-content">
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Comprehensive reporting and analytics dashboard</p>
        </div>
        <div className="header-actions">
          <Button className="action-btn secondary">
            <span className="btn-icon">📅</span>
            Schedule Report
          </Button>
          <Button className="action-btn primary">
            <span className="btn-icon">+</span>
            Create Report
          </Button>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="metrics-summary">
        {metricsSummary.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Report Templates */}
      <div className="report-templates-section">
        <div className="section-header">
          <h2 className="section-title">Report Templates</h2>
          <p className="section-subtitle">Generate reports from pre-built templates</p>
        </div>
        <div className="templates-grid">
          {reportTemplates.map((template, index) => (
            <div key={index} className="template-card">
              <div className="template-content">
                <h3 className="template-title">{template.title}</h3>
                <p className="template-description">{template.description}</p>
              </div>
              <div className="template-actions">
                {template.actions.map((action, actionIndex) => (
                  <Button 
                    key={actionIndex} 
                    className={`template-btn ${action.toLowerCase() === 'generate' ? 'primary' : 'secondary'}`}
                    onClick={() => {
                      if (action.toLowerCase() === 'generate' && template.title === 'Academic Performance') {
                        handleGenerateReport();
                      }
                    }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="recent-reports-section">
        <div className="section-header">
          <h2 className="section-title">Recent Reports</h2>
          <div className="filters-section">
            <div className="search-section">
              <Input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-controls">
              <select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All Types">All Types</option>
                <option value="Academic">Academic</option>
                <option value="Attendance">Attendance</option>
                <option value="Financial">Financial</option>
                <option value="Teacher">Teacher</option>
                <option value="Parent">Parent</option>
              </select>
              <select 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All Time">All Time</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="reports-list">
          {recentReports.map((report, index) => (
            <div key={index} className="report-card">
              <div className="report-icon">
                {getCategoryIcon(report.category)}
              </div>
              <div className="report-content">
                <div className="report-header">
                  <h3 className="report-title">{report.title}</h3>
                  <div className="report-meta">
                    <span className="report-date">{report.date}</span>
                    <span className="report-size">{report.size}</span>
                    {report.shared && <span className="shared-badge">Shared</span>}
                  </div>
                </div>
                <p className="report-description">{report.description}</p>
                <div className="report-stats">
                  <span className="download-count">📥 {report.downloads} downloads</span>
                </div>
              </div>
              <div className="report-actions">
                {report.actions.map((action, actionIndex) => (
                  <Button 
                    key={actionIndex} 
                    className={`report-action-btn ${action.toLowerCase()}`}
                    size="sm"
                  >
                    {action === 'Download' && '⬇️'}
                    {action === 'Preview' && '👁️'}
                    {action === 'Share' && '🔗'}
                    {action === 'Delete' && '🗑️'}
                    <span className="btn-text">{action}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <AcademicReportPopup 
        show={showReportPopup}
        onClose={() => setShowReportPopup(false)}
        content={reportContent}
      />
    </div>
  );
}

// Student Assignments Component
function StudentAssignments() {
  const [activeTab, setActiveTab] = useState('All Assignments');
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const assignmentTabs = ['All Assignments', 'Active', 'Upcoming', 'Past Due'];
  
  const assignments = [
    {
      title: "Chapter 5: Cellular Respiration",
      type: "Homework",
      status: "Active",
      due: "Tomorrow, 11:59 PM",
      subject: "Biology 1 - Period 3",
      points: 50,
      submitted: 23,
      graded: 18,
      total: 28,
      progress: "82%"
    },
    {
      title: "Midterm Exam: Units 1-3",
      type: "Test",
      status: "Upcoming",
      due: "Friday, 2:00 PM",
      subject: "Biology 1 - Period 3",
      points: 100,
      submitted: 0,
      graded: 0,
      total: 28,
      progress: "0%"
    },
    {
      title: "Microscopy Lab Report",
      type: "Lab",
      status: "Completed",
      due: "Last Monday, 11:59 PM",
      subject: "Biology 1 - Period 3",
      points: 75,
      submitted: 28,
      graded: 28,
      total: 28,
      progress: "100%"
    },
    {
      title: "Quadratic Functions Problem Set",
      type: "Homework",
      status: "Past Due",
      due: "Last Friday, 3:00 PM",
      subject: "Algebra II - Period 2",
      points: 40,
      submitted: 25,
      graded: 20,
      total: 28,
      progress: "89%"
    },
    {
      title: "American Revolution Essay",
      type: "Essay",
      status: "Active",
      due: "Next Monday, 11:59 PM",
      subject: "US History - Period 4",
      points: 100,
      submitted: 12,
      graded: 5,
      total: 28,
      progress: "43%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Upcoming': return 'orange';
      case 'Past Due': return 'red';
      case 'Completed': return 'blue';
      default: return 'gray';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Homework': return '📝';
      case 'Test': return '📋';
      case 'Lab': return '🧪';
      case 'Essay': return '✍️';
      default: return '📜';
    }
  };

  return (
    <div className="student-assignments">
      {/* Header */}
      <div className="assignments-header">
        <div className="header-content">
          <h1 className="page-title">Assignments</h1>
          <p className="page-subtitle">Manage assignments and track student progress</p>
        </div>
        <Button className="create-assignment-btn">
          <span className="btn-icon">+</span>
          Create Assignment
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-card blue">
          <div className="stat-value">24</div>
          <div className="stat-label">Total Assignments</div>
        </div>
        <div className="stat-card green">
          <div className="stat-value">8</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-value">5</div>
          <div className="stat-label">Upcoming</div>
        </div>
        <div className="stat-card red">
          <div className="stat-value">3</div>
          <div className="stat-label">Past Due</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-filter">
          <Input
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="dropdown-filters">
          <select 
            value={classFilter} 
            onChange={(e) => setClassFilter(e.target.value)}
            className="filter-select"
          >
            <option>All Classes</option>
            <option>Biology 1 - Period 3</option>
            <option>Algebra II - Period 2</option>
            <option>US History - Period 4</option>
          </select>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option>All Types</option>
            <option>Homework</option>
            <option>Test</option>
            <option>Lab</option>
            <option>Essay</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Upcoming</option>
            <option>Past Due</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Assignment Tabs */}
      <div className="assignment-tabs">
        {assignmentTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="assignments-list">
        {assignments.map((assignment, index) => (
          <Card key={index} className="assignment-card">
            <CardContent className="assignment-content">
              <div className="assignment-main">
                <div className="assignment-header">
                  <div className="assignment-title-section">
                    <span className="assignment-icon">{getTypeIcon(assignment.type)}</span>
                    <div className="title-info">
                      <h3 className="assignment-title">{assignment.title}</h3>
                      <div className="assignment-meta">
                        <span className="assignment-type">{assignment.type}</span>
                        <span className="assignment-subject">{assignment.subject}</span>
                      </div>
                    </div>
                  </div>
                  <div className="assignment-status-section">
                    <span className={`status-badge ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                    <div className="assignment-points">{assignment.points} pts</div>
                  </div>
                </div>
                
                <div className="assignment-details">
                  <div className="due-date">
                    <span className="due-label">Due:</span>
                    <span className="due-time">{assignment.due}</span>
                  </div>
                  
                  <div className="progress-section">
                    <div className="progress-stats">
                      <span>Submitted: {assignment.submitted}/{assignment.total}</span>
                      <span>Graded: {assignment.graded}/{assignment.total}</span>
                      <span className="progress-percentage">{assignment.progress}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: assignment.progress }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="assignment-actions">
                <Button size="sm" variant="outline" className="action-btn">
                  View Details
                </Button>
                <Button size="sm" className="action-btn primary">
                  {assignment.status === 'Completed' ? 'View Submission' : 'Start Work'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Student Home Base Component
function StudentHomeBase() {
  return (
    <div className="student-home-base">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="page-title">Welcome back, Jeffrey!</h1>
        <p className="page-subtitle">Ready to continue your learning journey?</p>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-label">Current GPA</div>
          <div className="stat-value">87%</div>
          <div className="stat-delta positive">+2% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Attendance</div>
          <div className="stat-value">96%</div>
          <div className="stat-status excellent">Excellent</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Due This Week</div>
          <div className="stat-value">3</div>
          <div className="stat-completed">2 completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Confidence Level</div>
          <div className="stat-value">82%</div>
          <div className="stat-delta positive">+5% this week</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Personalized Learning */}
          <Card className="learning-card">
            <CardHeader>
              <CardTitle className="section-title">🎯 Personalized Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="recommended-practice">
                <div className="practice-header">
                  <h4>Recommended Practice</h4>
                  <span className="priority high">High Priority</span>
                </div>
                <div className="practice-subject">Biology: Cell Division</div>
                <div className="practice-note">Focus on mitosis and meiosis differences</div>
                <div className="mastery-level">86% mastered</div>
              </div>
              
              <div className="spaced-repetition">
                <h4>Spaced Repetition</h4>
                <div className="review-items">
                  <div className="review-item urgent">
                    <span className="topic">Quadratic Equations</span>
                    <span className="due">Review Due Today</span>
                  </div>
                  <div className="review-item">
                    <span className="topic">Photosynthesis</span>
                    <span className="due">Review Due Tomorrow</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Generated Quizzes */}
          <Card className="quiz-card">
            <CardHeader>
              <CardTitle className="section-title">🤖 AI Generated Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="quiz-grid">
                <div className="quiz-item">
                  <div className="quiz-header">
                    <h4>Biology Quiz</h4>
                    <span className="difficulty easy">Easy</span>
                  </div>
                  <div className="quiz-details">
                    <span>5 questions • 10 min</span>
                  </div>
                  <div className="quiz-tags">
                    <span className="tag">Cell Structure</span>
                    <span className="tag">Organelles</span>
                  </div>
                  <Button size="sm" className="start-quiz">Start Quiz</Button>
                </div>
                
                <div className="quiz-item">
                  <div className="quiz-header">
                    <h4>Math Practice</h4>
                    <span className="difficulty medium">Medium</span>
                  </div>
                  <div className="quiz-details">
                    <span>8 questions • 15 min</span>
                  </div>
                  <div className="quiz-tags">
                    <span className="tag">Algebra</span>
                    <span className="tag">Functions</span>
                  </div>
                  <Button size="sm" className="start-quiz">Start Quiz</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Upcoming Assignments */}
          <Card className="assignments-card">
            <CardHeader>
              <CardTitle className="section-title">📋 Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="assignment-list">
                <div className="assignment-item urgent">
                  <div className="assignment-header">
                    <h4>Biology Lab Report</h4>
                    <span className="urgency-badge urgent">Urgent</span>
                  </div>
                  <div className="assignment-subject">AP Biology</div>
                  <div className="assignment-due">Tomorrow, 11:59 PM</div>
                </div>
                
                <div className="assignment-item">
                  <div className="assignment-header">
                    <h4>Chapter 12 Problems</h4>
                  </div>
                  <div className="assignment-subject">Algebra II</div>
                  <div className="assignment-due">Friday, 3:00 PM</div>
                </div>
                
                <div className="assignment-item">
                  <div className="assignment-header">
                    <h4>Essay: American Revolution</h4>
                  </div>
                  <div className="assignment-subject">US History</div>
                  <div className="assignment-due">Next Monday, 11:59 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card className="insights-card">
            <CardHeader>
              <CardTitle className="section-title">📈 Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="insight-item positive">
                <div className="insight-icon">✅</div>
                <div className="insight-text">Excelling in Mathematics with consistent A grades</div>
              </div>
              <div className="insight-item attention">
                <div className="insight-icon">⚠️</div>
                <div className="insight-text">Biology test scores show room for improvement</div>
              </div>
              <div className="insight-item recommendation">
                <div className="insight-icon">💡</div>
                <div className="insight-text">Join the study group for Biology</div>
              </div>
            </CardContent>
          </Card>

          {/* Teacher Notes */}
          <Card className="notes-card">
            <CardHeader>
              <CardTitle className="section-title">📝 Teacher Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="teacher-note">
                <div className="note-header">
                  <span className="teacher-name">Mr. Harp</span>
                  <span className="subject">Biology</span>
                  <span className="timestamp">2 days ago</span>
                </div>
                <div className="note-content">
                  Excellent understanding of light-dependent reactions. Consider exploring the Calvin cycle.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Student Dashboard Component (kept for fallback)
function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Student Dashboard</h1>
        <p className="page-subtitle">Welcome to your learning space</p>
      </div>
      <div className="empty-state">
        <div className="empty-content">
          <div className="empty-icon">📚</div>
          <h3 className="empty-title">Your dashboard is ready</h3>
          <p className="empty-description">
            This is your student workspace. New features and tabs will be added here soon.
          </p>
        </div>
      </div>
    </div>
  );
}

// Home Base View Component
function HomeBaseView() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerSpringProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <div className="home-base">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="page-title">Home Base</h1>
        <div className="header-actions">
          <Input 
            placeholder="Search classes, students, assignments..." 
            className="search-input"
          />
          <Button className="create-class-btn">Create Class</Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <animated.div style={containerSpringProps} className="metrics-grid">
        <MetricCard 
          title="Total Students" 
          value="127" 
          change="+12 this week"
          type="line"
        />
        <MetricCard 
          title="New Assignments" 
          value="8" 
          change=""
          type="bar"
        />
        <MetricCard 
          title="Assignments Due" 
          value="15" 
          change="Due this week"
          type="progress"
        />
        <MetricCard 
          title="Average Grade" 
          value="87%" 
          change="+3% improvement"
          type="line"
        />
      </animated.div>

      <div className="dashboard-content">
        <div className="main-content">
          {/* Today's Schedule */}
          <Card className="schedule-card">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="schedule-list">
                <ScheduleItem time="9:00 AM" class="Biology 1 - 1st Period" topic="Cell Structure & Function" />
                <ScheduleItem time="10:30 AM" class="AP Biology - 2nd Period" topic="Ecology & Evolution" />
                <ScheduleItem time="1:00 PM" class="Biology 2 - 3rd Period" topic="Genetics & Heredity" />
                <ScheduleItem time="2:30 PM" class="Faculty Meeting" topic="Curriculum Planning" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="activity-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="activity-list">
                <ActivityItem 
                  user="Emily Smith" 
                  action="submitted assignment" 
                  item="Cell Division Lab Report" 
                  time="1 hour ago"
                />
                <ActivityItem 
                  user="Michael Johnson" 
                  action="posted quiz" 
                  item="AP Biology - 2nd Period" 
                  time="2 hours ago"
                />
                <ActivityItem 
                  user="Alex Green" 
                  action="completed quiz" 
                  item="Photosynthesis Basics" 
                  time="3 hours ago"
                />
                <ActivityItem 
                  user="Sarah Wilson" 
                  action="asked a question in" 
                  item="Biology 1 - 1st Period" 
                  time="4 hours ago"
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Teaching Assistant */}
          <Card className="ai-assistant-card">
            <CardHeader>
              <CardTitle>AI Teaching Assistant</CardTitle>
              <p className="card-subtitle">Get help with lesson plans, grading, and more</p>
            </CardHeader>
            <CardContent>
              <div className="ai-prompts">
                <p className="prompt-label">Try asking:</p>
                <div className="prompt-buttons">
                  <Button variant="outline" size="sm">Create a quiz about photosynthesis</Button>
                  <Button variant="outline" size="sm">Generate discussion questions for Romeo and Juliet</Button>
                  <Button variant="outline" size="sm">Help me plan a lesson on fractions</Button>
                  <Button variant="outline" size="sm">Give me performance data for Sarah Johnson</Button>
                  <Button variant="outline" size="sm">Create personalized feedback for my Biology class</Button>
                  <Button variant="outline" size="sm">Suggest activities for remote learning</Button>
                </div>
                <Input 
                  placeholder="Ask your AI assistant anything" 
                  className="ai-input"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="quick-actions">
            <div className="action-grid">
              <Button className="action-btn large">Create Class</Button>
              <Button className="action-btn large">New Assignment</Button>
              <Button className="action-btn large">Add Students</Button>
              <Button className="action-btn large">View Reports</Button>
              <Button className="action-btn">Send Reminders</Button>
              <Button className="action-btn">Auto-align Tutoring</Button>
            </div>
            <Button className="action-btn full-width">Generate Reports</Button>
          </div>

          {/* Your Classes */}
          <Card className="classes-card">
            <CardHeader>
              <CardTitle>Your Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="classes-grid">
                <ClassCard name="Biology 1" students={23} color="green" />
                <ClassCard name="Biology 2" students={25} color="blue" />
                <ClassCard name="AP Biology 5" students={20} color="purple" />
                <ClassCard name="AP Biology 7" students={20} color="orange" />
              </div>
            </CardContent>
          </Card>

          {/* Student Progress */}
          <Card className="progress-card">
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
              <div className="progress-tabs">
                <button className="tab active">This Week</button>
                <button className="tab">This Month</button>
                <button className="tab">This Semester</button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="progress-graph">
                <div className="graph-placeholder">
                  <div className="graph-line"></div>
                  <div className="graph-labels">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="sidebar-content">
          {/* Upcoming Assignments */}
          <Card className="assignments-card">
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="assignment-list">
                <AssignmentItem 
                  title="Cell Division Lab Report" 
                  due="Due Today" 
                  status="UPCOMING"
                />
                <AssignmentItem 
                  title="Photosynthesis Lab Report" 
                  due="Due Fri, 1:00 PM" 
                  status="DRAFT"
                />
                <AssignmentItem 
                  title="Genetics Problem Set" 
                  due="Due Wed, 1:00 PM" 
                  status="PUBLISHED"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity (Sidebar) */}
          <Card className="sidebar-activity-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="sidebar-activity-list">
                <ActivityItem 
                  user="Sarah Johnson" 
                  action="submitted her lab report" 
                  item="" 
                  time="1 hour ago"
                />
                <ActivityItem 
                  user="Mae Chen" 
                  action="asked a question in" 
                  item="Biology 2" 
                  time="2 hours ago"
                />
                <ActivityItem 
                  user="New student" 
                  action="enrolled in" 
                  item="AP Biology 5" 
                  time="1 hour ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Reports View Component
function ReportsView() {
  const [reportTypeFilter, setReportTypeFilter] = useState('All Types');
  const [timeFilter, setTimeFilter] = useState('All Time');

  return (
    <div className="reports-view">
      {/* Header */}
      <div className="reports-header">
        <div className="header-content">
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Comprehensive reporting and analytics dashboard</p>
        </div>
        <div className="header-actions">
          <Button className="create-report-btn">+ Create Report</Button>
          <Button className="schedule-report-btn">
            <span>📅</span>
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-value">47</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Scheduled</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8</div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">23</div>
          <div className="stat-label">Shared</div>
        </div>
      </div>

      {/* Report Templates */}
      <Card className="templates-card">
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="templates-grid">
            <TemplateCard 
              title="Academic Performance"
              description="Student grades, test scores, and academic progress analysis."
              icon="🎓"
            />
            <TemplateCard 
              title="Attendance Analysis"
              description="Attendance patterns, trends, and at-risk student identification."
              icon="📅"
            />
            <TemplateCard 
              title="Teacher Performance"
              description="Teaching effectiveness, student outcomes, and professional development."
              icon="👥"
            />
            <TemplateCard 
              title="Financial Summary"
              description="Budget analysis, expense tracking, and financial performance metrics."
              icon="💰"
            />
            <TemplateCard 
              title="Parent Engagement"
              description="Communication metrics, meeting participation, and feedback analysis."
              icon="👨‍👩‍👧‍👦"
            />
            <TemplateCard 
              title="Curriculum Analysis"
              description="Course effectiveness, learning outcomes, and curriculum optimization."
              icon="📋"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="recent-reports-card">
        <CardHeader>
          <div className="reports-header-row">
            <CardTitle>Recent Reports</CardTitle>
            <div className="reports-filters">
              <select 
                value={reportTypeFilter} 
                onChange={(e) => setReportTypeFilter(e.target.value)}
                className="filter-dropdown"
              >
                <option>All Types</option>
                <option>Academic</option>
                <option>Attendance</option>
                <option>Teacher</option>
                <option>Financial</option>
                <option>Parent</option>
                <option>Curriculum</option>
              </select>
              <select 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
                className="filter-dropdown"
              >
                <option>All Time</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="reports-list">
            <ReportItem 
              title="Q4 Academic Performance Report"
              category="academic"
              date="Jul 27, 2025"
              size="2.1 MB"
              downloads={15}
              status="Shared"
              description="Comprehensive analysis of student academic performance for Q4 2024, including grade trends and subject-specific insights."
            />
            <ReportItem 
              title="Monthly Attendance Analysis"
              category="attendance"
              date="Jul 24, 2025"
              size="1.8 MB"
              downloads={8}
              description="Detailed attendance patterns and chronic absenteeism analysis for December 2024."
            />
            <ReportItem 
              title="Teacher Effectiveness Review"
              category="teacher"
              date="Jul 22, 2025"
              size="3.4 MB"
              downloads={12}
              status="Shared"
              description="Comprehensive teacher performance evaluation and professional development recommendations."
            />
            <ReportItem 
              title="Financial Summary Report"
              category="financial"
              date="Jul 19, 2025"
              size="1.9 MB"
              downloads={22}
              status="Shared"
              description="Annual financial performance analysis including budget allocation and expense tracking."
            />
            <ReportItem 
              title="Parent Engagement Metrics"
              category="parent"
              date="Jul 17, 2025"
              size="956 KB"
              downloads={6}
              description="Analysis of parent communication patterns and event participation rates."
            />
            <ReportItem 
              title="Curriculum Effectiveness Analysis"
              category="curriculum"
              date="Jul 14, 2025"
              size="2.7 MB"
              downloads={18}
              status="Shared"
              description="Comprehensive evaluation of curriculum effectiveness and learning outcomes."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AIMonitoringView() {
  const [severityFilter, setSeverityFilter] = useState('All Severities');
  const [classroomFilter, setClassroomFilter] = useState('All Classrooms');
  const [showAddAgentPopup, setShowAddAgentPopup] = useState(false);
  const [agents, setAgents] = useState<Array<{
    id: string;
    name: string;
    description: string;
    status: 'running' | 'stopped';
  }>>([]);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: ''
  });

  const handleAddAgent = () => {
    if (newAgent.name.trim() && newAgent.description.trim()) {
      const agent = {
        id: Date.now().toString(),
        name: newAgent.name,
        description: newAgent.description,
        status: 'running' as const
      };
      setAgents([...agents, agent]);
      setNewAgent({ name: '', description: '' });
      setShowAddAgentPopup(false);
    }
  };

  const handleCancelAddAgent = () => {
    setNewAgent({ name: '', description: '' });
    setShowAddAgentPopup(false);
  };

  return (
    <div className="ai-monitoring-view">
      {/* Header */}
      <div className="monitoring-header">
        <div className="header-content">
          <h1 className="page-title">AI Monitoring</h1>
          <p className="page-subtitle">Configure AI agents to monitor student performance and engagement.</p>
        </div>
        <div className="header-actions">
          <Button className="add-agent-btn" onClick={() => setShowAddAgentPopup(true)}>
            <span>+</span>
            Add Agent
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="monitoring-stats">
        <div className="stat-card">
          <div className="stat-value">{agents.length}</div>
          <div className="stat-label">Active Agents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Alerts Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Critical Alerts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Never</div>
          <div className="stat-label">Last Run</div>
        </div>
      </div>

      {/* Recent Alerts */}
      <Card className="alerts-card">
        <CardHeader>
          <div className="alerts-header-row">
            <CardTitle>Recent Alerts</CardTitle>
            <div className="alerts-filters">
              <select 
                value={severityFilter} 
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="filter-dropdown"
              >
                <option>All Severities</option>
                <option>Critical</option>
                <option>Warning</option>
                <option>Info</option>
              </select>
              <select 
                value={classroomFilter} 
                onChange={(e) => setClassroomFilter(e.target.value)}
                className="filter-dropdown"
              >
                <option>All Classrooms</option>
                <option>Biology 1</option>
                <option>Biology 2</option>
                <option>AP Biology 5</option>
                <option>AP Biology 7</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="empty-alerts">
            <div className="empty-icon">🔔</div>
            <div className="empty-message">No alerts yet. Your agents will display notifications here.</div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Agents */}
      <Card className="agents-card">
        <CardHeader>
          <CardTitle>Monitoring Agents</CardTitle>
        </CardHeader>
        <CardContent>
          {agents.length === 0 ? (
            <div className="empty-agents">
              <div className="empty-icon">🤖</div>
              <div className="empty-message">No monitoring agents configured yet.</div>
              <Button className="create-agent-btn" onClick={() => setShowAddAgentPopup(true)}>Create Your First Agent</Button>
            </div>
          ) : (
            <div className="agents-grid">
              {agents.map((agent) => (
                <div key={agent.id} className="agent-card">
                  <div className="agent-header">
                    <div className="agent-name">{agent.name}</div>
                    <div className={`agent-status ${agent.status}`}>
                      {agent.status === 'running' ? 'Running...' : 'Stopped'}
                    </div>
                  </div>
                  <div className="agent-description">{agent.description}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Agent Popup */}
      {showAddAgentPopup && (
        <div className="popup-overlay" onClick={handleCancelAddAgent}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2 className="popup-title">Add AI Agent</h2>
              <button className="popup-close" onClick={handleCancelAddAgent}>×</button>
            </div>
            <div className="popup-body">
              <div className="form-group">
                <label className="form-label">Agent Name</label>
                <Input
                  type="text"
                  placeholder="e.g., Grade Drop Alert"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Function Description</label>
                <textarea
                  placeholder="e.g., Notify me when a student's grade drops below an 80 average and send an email to the parents"
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                  className="form-textarea"
                  rows={4}
                />
              </div>
            </div>
            <div className="popup-footer">
              <Button variant="outline" onClick={handleCancelAddAgent} className="cancel-btn">
                Cancel
              </Button>
              <Button onClick={handleAddAgent} className="start-agent-btn" disabled={!newAgent.name.trim() || !newAgent.description.trim()}>
                Start Agent
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AIAssistantView() {
  const [message, setMessage] = useState('');
  const [selectedCapability, setSelectedCapability] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="ai-assistant-view">
      {/* Header */}
      <div className="assistant-header">
        <div className="header-content">
          <h1 className="page-title">AI Assistant</h1>
          <p className="page-subtitle">Intelligent support for educational management and insights.</p>
        </div>
        <div className="header-actions">
          <Button className="new-chat-btn">+ New Chat</Button>
          <Button className="export-chat-btn">Export Chat</Button>
        </div>
      </div>

      <div className="assistant-content">
        {/* AI Capabilities Panel */}
        <div className="capabilities-panel">
          <h2 className="capabilities-title">AI Capabilities</h2>
          <div className="capabilities-list">
            <CapabilityCard 
              icon="📊"
              title="Data Analytics"
              description="Analyze student performance, attendance patterns, and academic trends."
              onClick={() => setSelectedCapability('data-analytics')}
              isSelected={selectedCapability === 'data-analytics'}
            />
            <CapabilityCard 
              icon="💡"
              title="Smart Recommendations"
              description="Get personalized suggestions for curriculum, resources, and interventions."
              onClick={() => setSelectedCapability('recommendations')}
              isSelected={selectedCapability === 'recommendations'}
            />
            <CapabilityCard 
              icon="📄"
              title="Automated Reports"
              description="Generate comprehensive reports on school performance and metrics."
              onClick={() => setSelectedCapability('reports')}
              isSelected={selectedCapability === 'reports'}
            />
            <CapabilityCard 
              icon="🎓"
              title="Educational Support"
              description="Get help with curriculum planning, assessment strategies, and best practices."
              onClick={() => setSelectedCapability('support')}
              isSelected={selectedCapability === 'support'}
            />
          </div>
        </div>

        {/* AI Chat Interface */}
        <div className="chat-interface">
          <div className="chat-header">
            <div className="ai-info">
              <div className="ai-title">
                Polaris AI Assistant
                <span className="status-dot"></span>
              </div>
              <div className="ai-version">v2.4.1</div>
            </div>
          </div>

          <div className="chat-messages">
            <div className="welcome-message">
              <div className="message-content">
                Welcome to Polaris AI Assistant! I'm here to help you with educational analytics, student insights, curriculum planning, and much more. How can I assist you today?
              </div>
              <div className="message-time">Just now</div>
            </div>
          </div>

          <div className="example-queries">
            <div className="queries-title">Try asking me about:</div>
            <div className="queries-grid">
              <QueryButton icon="👤" text="Attendance Trends" />
              <QueryButton icon="📈" text="Performance Report" />
              <QueryButton icon="⭐" text="Best Practices" />
              <QueryButton icon="⚠️" text="AI-Risk Students" />
              <QueryButton icon="📝" text="Lesson Planning" />
              <QueryButton icon="📚" text="Teacher Resources" />
            </div>
          </div>

          <div className="chat-input-container">
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <Input
                type="text"
                placeholder="Ask me anything about your school's performance, curriculum, or educational strategies..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
              />
              <Button type="submit" className="send-button">
                <span>→</span>
              </Button>
            </form>
            <div className="input-instructions">
              Press Enter to send, Shift-Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsView() {
  return (
    <div className="notifications-view">
      {/* Header */}
      <div className="notifications-header">
        <h1 className="page-title">Notification Center</h1>
        <h2 className="page-subtitle">Notifications</h2>
      </div>

      {/* Empty State */}
      <div className="empty-state">
        <div className="empty-message">
          No new notifications at this time.
        </div>
      </div>
    </div>
  );
}

function AlertsView() {
  return <div className="view-placeholder">Alerts View</div>;
}

function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    weekly: true,
    daily: false
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');

  return (
    <div className="settings-view">
      {/* Header */}
      <div className="settings-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account preferences and system settings</p>
      </div>

      <div className="settings-content">
        {/* Settings Navigation */}
        <div className="settings-nav">
          <button 
            className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="nav-icon">👤</span>
            Profile
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <span className="nav-icon">🔔</span>
            Notifications
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <span className="nav-icon">🎨</span>
            Appearance
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <span className="nav-icon">🔒</span>
            Security
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <span className="nav-icon">🛡️</span>
            Privacy
          </button>
        </div>

        {/* Settings Content */}
        <div className="settings-panel">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2 className="section-title">Profile Settings</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <Input type="text" defaultValue="Mr. Harp" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <Input type="email" defaultValue="teacher@demo.com" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select className="form-select">
                    <option>Teacher</option>
                    <option>Administrator</option>
                    <option>Principal</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>School</label>
                  <Input type="text" defaultValue="Polaris Academy" />
                </div>
                <Button className="save-btn">Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2 className="section-title">Notification Preferences</h2>
              <div className="notification-settings">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Email Notifications</h3>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Push Notifications</h3>
                    <p>Receive push notifications on your device</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={notifications.push}
                      onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>SMS Notifications</h3>
                    <p>Receive notifications via SMS</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={notifications.sms}
                      onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Weekly Reports</h3>
                    <p>Receive weekly summary reports</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={notifications.weekly}
                      onChange={(e) => setNotifications({...notifications, weekly: e.target.checked})}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Daily Updates</h3>
                    <p>Receive daily activity updates</p>
                  </div>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={notifications.daily}
                      onChange={(e) => setNotifications({...notifications, daily: e.target.checked})}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2 className="section-title">Appearance Settings</h2>
              <div className="appearance-settings">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Theme</h3>
                    <p>Choose your preferred theme</p>
                  </div>
                  <select 
                    className="form-select"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Language</h3>
                    <p>Select your preferred language</p>
                  </div>
                  <select 
                    className="form-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Font Size</h3>
                    <p>Adjust the text size</p>
                  </div>
                  <select className="form-select">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h2 className="section-title">Security Settings</h2>
              <div className="security-settings">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Change Password</h3>
                    <p>Update your account password</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Login History</h3>
                    <p>View recent login activity</p>
                  </div>
                  <Button variant="outline">View History</Button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Active Sessions</h3>
                    <p>Manage your active sessions</p>
                  </div>
                  <Button variant="outline">Manage Sessions</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2 className="section-title">Privacy Settings</h2>
              <div className="privacy-settings">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Data Collection</h3>
                    <p>Allow us to collect usage data to improve the service</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Analytics</h3>
                    <p>Share anonymous analytics data</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Profile Visibility</h3>
                    <p>Make your profile visible to other users</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Export Data</h3>
                    <p>Download a copy of your data</p>
                  </div>
                  <Button variant="outline">Export Data</Button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Delete Account</h3>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <Button variant="outline" className="delete-btn">Delete Account</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminDashboardView() {
  return <div className="view-placeholder">Admin Dashboard View</div>;
}

// Helper Components
function MetricCard({ title, value, change, type }: { title: string; value: string; change: string; type: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const springProps = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered 
      ? '0 20px 40px rgba(0, 0, 0, 0.15)' 
      : '0 4px 6px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 20 }
  });

  const barSpringProps = useSpring({
    width: isHovered ? '100%' : '80%',
    config: { tension: 400, friction: 25 }
  });

  const valueSpringProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 200,
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div 
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="metric-card">
        <CardContent>
          <h3 className="metric-title">{title}</h3>
          <animated.div style={valueSpringProps} className="metric-value">
            {value}
          </animated.div>
          {change && <div className="metric-change">{change}</div>}
          <animated.div 
            className={`metric-chart ${type}`}
            style={barSpringProps}
          ></animated.div>
        </CardContent>
      </Card>
    </animated.div>
  );
}

function ScheduleItem({ time, class: className, topic }: { time: string; class: string; topic: string }) {
  return (
    <div className="schedule-item">
      <div className="schedule-time">{time}</div>
      <div className="schedule-details">
        <div className="schedule-class">{className}</div>
        <div className="schedule-topic">{topic}</div>
      </div>
    </div>
  );
}

function ActivityItem({ user, action, item, time }: { user: string; action: string; item: string; time: string }) {
  return (
    <div className="activity-item">
      <Avatar className="activity-avatar">
        <AvatarFallback className="text-xs">
          {user.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className="activity-content">
        <div className="activity-text">
          <strong>{user}</strong> {action} {item && <strong>"{item}"</strong>}
        </div>
        <div className="activity-time">{time}</div>
      </div>
    </div>
  );
}

function ClassCard({ name, students, color }: { name: string; students: number; color: string }) {
  return (
    <div className={`class-card ${color}`}>
      <div className="class-name">{name}</div>
      <div className="class-students">{students} students</div>
    </div>
  );
}

function AssignmentItem({ title, due, status }: { title: string; due: string; status: string }) {
  return (
    <div className="assignment-item">
      <div className="assignment-title">{title}</div>
      <div className="assignment-due">{due}</div>
      <div className={`assignment-status ${status.toLowerCase()}`}>{status}</div>
    </div>
  );
}

// AI Assistant Components
function CapabilityCard({ 
  icon, 
  title, 
  description, 
  onClick, 
  isSelected 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  onClick: () => void; 
  isSelected: boolean; 
}) {
  return (
    <div 
      className={`capability-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="capability-icon">{icon}</div>
      <div className="capability-content">
        <h3 className="capability-title">{title}</h3>
        <p className="capability-description">{description}</p>
      </div>
    </div>
  );
}

function QueryButton({ icon, text }: { icon: string; text: string }) {
  return (
    <button className="query-button">
      <span className="query-icon">{icon}</span>
      <span className="query-text">{text}</span>
    </button>
  );
}

// Report Template Card Component
function TemplateCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="template-card">
      <div className="template-icon">{icon}</div>
      <div className="template-content">
        <h3 className="template-title">{title}</h3>
        <p className="template-description">{description}</p>
        <div className="template-actions">
          <Button size="sm" className="generate-btn">Generate</Button>
          <Button size="sm" variant="outline" className="preview-btn">Preview</Button>
        </div>
      </div>
    </div>
  );
}

// Report Item Component
function ReportItem({ 
  title, 
  category, 
  date, 
  size, 
  downloads, 
  status, 
  description 
}: { 
  title: string; 
  category: string; 
  date: string; 
  size: string; 
  downloads: number; 
  status?: string; 
  description: string; 
}) {
  return (
    <div className="report-item">
      <div className="report-info">
        <div className="report-title">{title}</div>
        <div className="report-meta">
          <span className="report-category">{category}</span>
          <span className="report-date">{date}</span>
          <span className="report-size">{size}</span>
          <span className="report-downloads">{downloads} downloads</span>
          {status && <span className="report-status shared">{status}</span>}
        </div>
        <div className="report-description">{description}</div>
      </div>
      <div className="report-actions">
        <Button size="sm" variant="outline">Download</Button>
        <Button size="sm" variant="outline">Preview</Button>
        <Button size="sm" variant="outline">Share</Button>
        <Button size="sm" variant="outline" className="delete-btn">Delete</Button>
      </div>
    </div>
  );
} 
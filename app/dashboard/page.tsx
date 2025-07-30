'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import '@/styles/dashboard.scss';

type DashboardView = 'home' | 'reports' | 'ai-monitoring' | 'ai-assistant' | 'notifications' | 'admin';

export default function DashboardPage() {
  const { session, isAuthenticated, status, signOut, isLoading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<DashboardView>('home');

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

  const navItems = [
    { id: 'home', label: 'Home Base', icon: '🏠' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'ai-monitoring', label: 'AI Monitoring', icon: '🤖' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: '💬' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'admin', label: 'Admin Dashboard', icon: '⚙️' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Polaris</h2>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
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
          <div className="user-info">
            <Avatar className="user-avatar">
              <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
              <AvatarFallback className="text-sm">
                {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'T'}
              </AvatarFallback>
            </Avatar>
            <div className="user-details">
              <span className="user-name">Mr. Johnson</span>
              <span className="user-role">Teacher</span>
            </div>
            <button className="dropdown-arrow">▼</button>
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
        {activeView === 'home' && <HomeBaseView />}
        {activeView === 'reports' && <ReportsView />}
        {activeView === 'ai-monitoring' && <AIMonitoringView />}
        {activeView === 'ai-assistant' && <AIAssistantView />}
        {activeView === 'notifications' && <NotificationsView />}
        {activeView === 'admin' && <AdminDashboardView />}
      </main>
    </div>
  );
}

// Home Base View Component
function HomeBaseView() {
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
      <div className="metrics-grid">
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
      </div>

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
  return <div className="view-placeholder">AI Monitoring View</div>;
}

function AIAssistantView() {
  return <div className="view-placeholder">AI Assistant View</div>;
}

function NotificationsView() {
  return <div className="view-placeholder">Notifications View</div>;
}

function AdminDashboardView() {
  return <div className="view-placeholder">Admin Dashboard View</div>;
}

// Helper Components
function MetricCard({ title, value, change, type }: { title: string; value: string; change: string; type: string }) {
  return (
    <Card className="metric-card">
      <CardContent>
        <h3 className="metric-title">{title}</h3>
        <div className="metric-value">{value}</div>
        {change && <div className="metric-change">{change}</div>}
        <div className={`metric-chart ${type}`}></div>
      </CardContent>
    </Card>
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
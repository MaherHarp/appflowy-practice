'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import '@/styles/dashboard.scss';

type DashboardView = 'home' | 'reports' | 'ai-monitoring' | 'ai-assistant' | 'notifications' | 'alerts' | 'settings';

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
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  // Filter navigation items based on active view
  const getFilteredNavItems = () => {
    return navItems;
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
        {activeView === 'alerts' && <AlertsView />}
        {activeView === 'settings' && <SettingsView />}
      </main>
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
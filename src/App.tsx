import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, CssBaseline, Typography, Box } from '@mui/material';
import { WorkoutForm } from './components/WorkoutForm';
import { WorkoutStats } from './components/WorkoutStats';
import { Auth } from './components/Auth';
import { User } from './types/auth';
import { WorkoutRecord } from './types/workout';
import { api } from './services/api';

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [records, setRecords] = useState<WorkoutRecord[]>([]);

  useEffect(() => {
    if (user) {
      api.getWorkouts(user.token)
        .then(setRecords)
        .catch(console.error);
    }
  }, [user]);

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    setRecords([]);
    localStorage.removeItem('user');
  };

  const handleWorkoutSubmit = async (type: string, subtype: string) => {
    if (!user) return;

    const newRecord = {
      date: new Date().toISOString(),
      type: type as any,
      subtype: subtype as any,
    };
    
    try {
      await api.addWorkout(newRecord, user.token);
      const updatedRecords = await api.getWorkouts(user.token);
      setRecords(updatedRecords);
    } catch (error) {
      console.error('Failed to save workout:', error);
    }
  };

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <Router>
      <CssBaseline />
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {user.username} 的运动记录
            </Typography>
            <Button color="inherit" component={Link} to="/">
              记录运动
            </Button>
            <Button color="inherit" component={Link} to="/stats">
              查看统计
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              退出登录
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<WorkoutForm onSubmit={handleWorkoutSubmit} />} />
          <Route path="/stats" element={<WorkoutStats records={records} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

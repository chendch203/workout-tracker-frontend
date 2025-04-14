import { LoginForm, RegisterForm, User } from '../types/auth';
import { WorkoutRecord } from '../types/workout';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export const api = {
    async register(data: RegisterForm): Promise<{ token: string }> {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(response.statusText || 'Registration failed');
        }

        return response.json();
    },

    async login(data: LoginForm): Promise<{ token: string }> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(response.statusText || 'Login failed');
        }

        return response.json();
    },

    async addWorkout(workout: Omit<WorkoutRecord, 'id'>, token: string): Promise<{ id: number }> {
        const response = await fetch(`${API_URL}/workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(workout),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(response.statusText || 'Failed to add workout');
        }

        return response.json();
    },

    async getWorkouts(token: string): Promise<WorkoutRecord[]> {
        const response = await fetch(`${API_URL}/workouts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(response.statusText || 'Failed to fetch workouts');
        }

        return response.json();
    },
};

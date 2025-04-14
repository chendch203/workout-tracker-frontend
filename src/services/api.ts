import { LoginForm, RegisterForm, User } from '../types/auth';
import { WorkoutRecord } from '../types/workout';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const api = {
    async register(data: RegisterForm): Promise<void> {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
    },

    async login(data: LoginForm): Promise<User> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        return response.json();
    },

    async addWorkout(workout: Omit<WorkoutRecord, 'id'>, token: string): Promise<void> {
        const response = await fetch(`${API_URL}/workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(workout),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
    },

    async getWorkouts(token: string): Promise<WorkoutRecord[]> {
        const response = await fetch(`${API_URL}/workouts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        return response.json();
    },
};

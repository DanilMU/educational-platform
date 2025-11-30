export interface DashboardData {
    totalUsers: number;
    activeUsers: number;
    totalCourses: number;
    totalLessons: number;
    completionRate: number;
    averageTimeSpent: number;
    popularCourses: {
        id: string;
        title: string;
        enrollments: number;
        completions: number;
    }[];
    recentActivity: {
        userId: string;
        action: string;
        timestamp: string;
    }[];
}

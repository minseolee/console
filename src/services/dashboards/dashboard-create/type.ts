import type {
    DASHBOARD_SCOPE, DASHBOARD_VIEWER,
} from '@/services/dashboards/config';

// SCOPE
export type DashboardScope = typeof DASHBOARD_SCOPE.ENTIRE | typeof DASHBOARD_SCOPE.SINGLE;

// VIEWER
export type DashboardViewerType = typeof DASHBOARD_VIEWER.PUBLIC | typeof DASHBOARD_VIEWER.PRIVATE;

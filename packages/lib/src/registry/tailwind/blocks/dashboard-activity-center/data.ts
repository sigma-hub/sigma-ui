import type { Component } from 'vue';
import { DownloadIcon, FileInputIcon, RefreshCwIcon, UploadIcon } from '@lucide/vue';

export type ActivityKind = 'upload' | 'export' | 'sync' | 'import';
export type ActivityStatus = 'running' | 'success' | 'error' | 'cancelled';

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  subtitle: string;
  status: ActivityStatus;
  /** 0-100, or null while the job is still preparing and has no measurable progress. */
  progress: number | null;
  /** Result text shown once the job is no longer running. */
  message?: string;
}

export const kindIcons: Record<ActivityKind, Component> = {
  upload: UploadIcon,
  export: DownloadIcon,
  sync: RefreshCwIcon,
  import: FileInputIcon,
};

export const sampleJobs: Record<ActivityKind, Pick<ActivityItem, 'kind' | 'title' | 'subtitle'> & { successMessage: string; label: string }> = {
  upload: {
    kind: 'upload',
    label: 'Start upload',
    title: 'Uploading brand-assets.zip',
    subtitle: '48 files to Marketing / Assets',
    successMessage: 'Uploaded 48 files',
  },
  export: {
    kind: 'export',
    label: 'Start export',
    title: 'Exporting orders report',
    subtitle: 'CSV, last 90 days',
    successMessage: 'Report is ready to download',
  },
  sync: {
    kind: 'sync',
    label: 'Start sync',
    title: 'Syncing contacts',
    subtitle: 'Connecting to CRM',
    successMessage: 'Synced 2,418 contacts',
  },
  import: {
    kind: 'import',
    label: 'Start import',
    title: 'Importing customers.csv',
    subtitle: '1,248 rows',
    successMessage: 'Added 1,248 customers',
  },
};

export const initialItems: ActivityItem[] = [
  {
    id: 'job-a',
    kind: 'upload',
    title: 'Uploading design-files.zip',
    subtitle: '12.4 MB of 19.4 MB',
    status: 'running',
    progress: 64,
  },
  {
    id: 'job-b',
    kind: 'export',
    title: 'Exporting invoices',
    subtitle: 'PDF, March 2026',
    status: 'running',
    progress: 32,
  },
  {
    id: 'job-c',
    kind: 'sync',
    title: 'Syncing contacts',
    subtitle: 'Connecting to CRM',
    status: 'running',
    progress: null,
  },
  {
    id: 'job-d',
    kind: 'import',
    title: 'Importing customers.csv',
    subtitle: '1,248 rows',
    status: 'success',
    progress: 100,
    message: 'Added 1,248 customers',
  },
  {
    id: 'job-e',
    kind: 'sync',
    title: 'Backing up to cloud storage',
    subtitle: 'Nightly backup',
    status: 'error',
    progress: 41,
    message: 'Connection timed out',
  },
];

export const pageTitle = 'Workspace';
export const pageDescription = 'Long-running tasks keep going in the background. Follow them from the activity center.';
export const demoTitle = 'Background jobs';
export const demoDescription = 'Start a sample job and watch it move through the activity center.';
export const activityLabel = 'Activity';
export const emptyLabel = 'No background activity';
export const emptyHint = 'Uploads, exports and syncs will show up here.';

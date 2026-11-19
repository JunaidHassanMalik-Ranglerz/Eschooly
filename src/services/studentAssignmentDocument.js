import {API_BASE_URL} from '../api/apiBaseUrl';

export const studentAssignmentAttachmentDownloadUrl = (assignmentId, fileId) =>
  `${API_BASE_URL}/student/assignments/${assignmentId}/attachments/${fileId}/download`;

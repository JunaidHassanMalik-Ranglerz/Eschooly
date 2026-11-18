import {Strings} from '../src/Constants/Strings';
import {
  mapStudentOnlineClass,
  mapStudentOnlineClassDetail,
  mapStudentOnlineClassJoin,
  mapStudentOnlineClassRecording,
  readOnlineClassPage,
} from '../src/services/studentService';

describe('Student online class mapping', () => {
  it('reads Laravel data-array envelopes with the requested status', () => {
    const page = readOnlineClassPage(
      {
        success: true,
        data: [
          {
            id: 12,
            title: 'Science Lab',
            subject: {name: 'Science'},
            teacher: {name: 'Ayesha'},
            class_name: '7B',
            scheduled_at: '2026-11-18T09:00:00+05:00',
            duration_minutes: 45,
            meeting_provider: 'zoom',
            status: 'upcoming',
          },
        ],
      },
      'upcoming',
    );

    expect(page).toHaveLength(1);
    expect(page[0].id).toBe(12);
    expect(page[0].title).toBe('Science Lab');
    expect(page[0].classInfo).toContain('Science');
    expect(page[0].classInfo).toContain('Ayesha');
    expect(page[0].duration).toBe('45 min');
    expect(page[0].providerLabel).toBe(Strings.zoomMeeting);
    expect(page[0].isZoom).toBe(true);
    expect(page[0].status).toBe('');
  });

  it('reads nested sessions and labels live or ended from the list status', () => {
    const live = readOnlineClassPage(
      {data: {sessions: [{id: 'live-1', title: 'Now', status: 'live'}]}},
      'live',
    );
    const ended = readOnlineClassPage(
      {data: {data: [{id: 'end-1', name: 'Replay', has_recording: 1}]}},
      'ended',
    );

    expect(live[0].status).toBe(Strings.liveBadge);
    expect(ended[0].title).toBe('Replay');
    expect(ended[0].status).toBe(Strings.endedLabel);
    expect(ended[0].hasRecording).toBe(true);
    expect(ended[0].canWatch).toBe(true);
    expect(ended[0].canDownload).toBe(true);
  });

  it('does not fabricate an ended badge for unknown statuses', () => {
    const mapped = mapStudentOnlineClass({id: 3, title: 'Open'});
    expect(mapped.status).toBe('');
    expect(mapped.hasRecording).toBe(false);
    expect(mapped.canWatch).toBe(false);
  });

  it('maps join and recording payloads from data or session objects', () => {
    expect(
      mapStudentOnlineClassJoin({
        success: true,
        data: {session: {meeting_url: 'https://zoom.example/j/1', joined_at: 'now'}},
      }),
    ).toEqual({
      meetingUrl: 'https://zoom.example/j/1',
      joinedAt: 'now',
    });

    expect(
      mapStudentOnlineClassRecording({
        data: {recording_url: 'https://cdn.example/rec.mp4', allow_download: true},
      }),
    ).toMatchObject({
      recordingUrl: 'https://cdn.example/rec.mp4',
      allowDownload: true,
    });
  });

  it('maps detail through the session object without inventing titles', () => {
    const detail = mapStudentOnlineClassDetail({
      data: {session: {id: 9, title: 'Detail Class', meeting_url: 'https://zoom.example/j/9'}},
    });
    expect(detail.id).toBe(9);
    expect(detail.title).toBe('Detail Class');
    expect(detail.meetingUrl).toBe('https://zoom.example/j/9');
  });

  it('drops rows without an id or title', () => {
    expect(readOnlineClassPage({data: [{title: 'No id'}]})).toEqual([]);
    expect(readOnlineClassPage({data: [{id: 4}]})).toEqual([]);
  });
});

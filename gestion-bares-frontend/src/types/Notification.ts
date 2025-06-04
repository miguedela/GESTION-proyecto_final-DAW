export enum StatusNotification {
    READ = 'READ',
    UNREAD = 'UNREAD',
    IGNORED = 'ARCHIVED',
}

export interface INotification {
    id: string | null;
    senderId: string;
    receiverId: string;
    reservationId: string | null;
    status: StatusNotification;
}
export enum Status {
    READ = 'READ',
    UNREAD = 'UNREAD',
    IGNORED = 'ARCHIVED',
}

export interface INotification {
    id: string;
    senderId: string;
    receiverId: string;
    reservationId: string | null;
}
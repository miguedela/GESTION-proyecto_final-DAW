export interface IEmail {
    to: string,
    subject: string,
    templateName: string,
    variables: Map<string, object>
}
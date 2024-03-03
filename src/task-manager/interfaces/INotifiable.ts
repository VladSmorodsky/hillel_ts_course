export interface INotifiable {
    name: string,
    notify: (message: string) => string | void
}
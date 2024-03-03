export interface ILogger<T> {
    log: (logData: T) => void
}
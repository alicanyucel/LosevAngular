export class ResultModel<T> {
    data?: T;
    isSuccessful: boolean = false;
    errorMessages: string[] = [];
    successMessage: string = "";
}

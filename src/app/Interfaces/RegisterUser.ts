export interface RegisterUser {
  IdentificationType: number;
  IdentificationNumber: string;
  CompanyName: string;
  FirstName: string;
  SecondName: string;
  FirstLastname: string;
  SecondLastname: string;
  Email: string;
  AuthorizationToSendMobileMessages: boolean;
  AuthorizationToSendEmailMessages: boolean;
};

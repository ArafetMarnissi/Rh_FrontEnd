export class GlobalConstants{

    //Message
    public static genericError: string ="Something went wrong. Please try again later";

    public static unauthorized:string ="your are not authorized to access this page";

    //Regex

    public static nameRegex:string ="[a-zA-Z]*";

    public static emailRegex:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static contactNumberRegex:string ="^[e0-9]{10,10}$";
    public static passwordRegex:string ="/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/"
    ;

    //variable
    public static error:string ="error";

}
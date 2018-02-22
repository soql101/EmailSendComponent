public class EmailSendCtrl {
    private static  boolean IS_SUCCESS = false;

    @AuraEnabled
    public static boolean sendEmail(String fname,String lname,string email){
system.debug('email id>'+email);
        List<string> emaillst =new List<string>();
        emaillst.add(email);
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = emaillst;
        message.optOutPolicy = 'FILTER';
        message.subject = 'Salesforce lightning component for email send';
        message.plainTextBody = 'Dear '+fname+ ' '+lname+' ,This is the message body.';
        Messaging.SingleEmailMessage[] messages = 
            new List<Messaging.SingleEmailMessage> {message};
                Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
        if (results[0].success) {
            IS_SUCCESS=true;           
        } else {
            IS_SUCCESS=false;
            System.debug('The email failed to send: '
                         + results[0].errors[0].message);
        }
        
        return IS_SUCCESS;
        
    }
    
}
({
    handleClick: function (cmp, event) {
        var name = cmp.find("myname");
        var emailInput = cmp.find("emailInput");
       var emailValue = emailInput.get("v.value");

        var isValid = name.checkValidity();
        if(isValid) {
            var action = cmp.get('c.sendEmail');
            action.setParams({
                'fname': name.get("v.firstName"),
                'lname': name.get("v.lastName"),
                'email': emailValue
                
            });
            action.setCallback(this, $A.getCallback(function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue());
                    if(response.getReturnValue()){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"success",
                            "title": "Success!",
                            "message": "The Email has been sent successfully."
                        });
                        toastEvent.fire();
                    }
                    
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type":"error",
                        "title": "Error!",
                        "message": "Error while sending email"
                    });
                    toastEvent.fire();
                }
            }));
            $A.enqueueAction(action);
        }
        else {
            name.showHelpMessageIfInvalid();
        }
    }
})
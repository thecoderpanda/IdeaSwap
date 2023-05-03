const SibApiV3Sdk = require('sib-api-v3-sdk');
const fs = require('fs'); //Filesystem    
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

let emaildomain = 'shantanu@thecoderpanda.com';
//
const signupemailcontent = fs.readFileSync("./controllers/emails/welcome2.html","utf-8");
//var courseemailcontent = fs.readFileSync("./controllers/emails/course.html","utf-8");
const resetpassword = fs.readFileSync("./controllers/emails/resetpassword.html","utf-8");
const resetpasswordsuccess = fs.readFileSync("./controllers/emails/resetpasswordsuccess.html","utf-8");


 async function sendsignupemail(username, emailid) {
       new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
        {
          'subject':'Welcome to IdeaSwap!',
           'sender' : {'email': emaildomain, 'name':'IdeaSwap'},
           'replyTo' : {'email':'shantanu@thecoderpanda.com', 'name':'IdeaSwap'},
           'to' : [{'name': username, 'email':emailid}],
           'htmlContent' : signupemailcontent,
           'params' : {
             'username': username,
             'emailid': emailid
         }, //replace {{username}} with the username in the email content

         }
       ).then(function(data) {
         console.log('Registration Email for Quest successfully',data);
       }
         ).catch(function(error) {
         console.error(error);
         });
    
 }

 async function sendtokenemail(username, emailid, link) {
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
      'subject':'Reset your Password for IdeaSwap!',
       'sender' : {'email': emaildomain, 'name':'IdeaSwap'},
       'replyTo' : {'email':'shantanu@thecoderpanda.com', 'name':'IdeaSawp'},
       'to' : [{'name': username, 'email':emailid}],
       'htmlContent' : resetpassword,
       'params' : {
         'username': username,
          'link': link
     }, //replace {{username}} with the username in the email content

     }
   ).then(function(data) {
     console.log('Password Reset token sent',data);
   }
     ).catch(function(error) {
     console.error(error);
     });
  
 }

 async function sendsuccesspassword(username, emailid) {
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
      'subject':'Your Password has been Successfully Changed',
       'sender' : {'email': emaildomain, 'name':'Ideaswap'},
       'replyTo' : {'email':'shantanu@thecoderpanda.com', 'name':'IdeaSwap'},
       'to' : [{'name': username, 'email':emailid}],
       'htmlContent' : resetpasswordsuccess,
       'params' : {
         'username': username,
     }, //replace {{username}} with the username in the email content

     }
   ).then(function(data) {
     console.log('Password reset success email sent',data);
   }
     ).catch(function(error) {
     console.error(error);
     });
  
 }
module.exports = {sendsignupemail,sendtokenemail,sendsuccesspassword};




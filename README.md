# MockMailPass - Your solution for those pesky one-time login credentials!

MockMailPass is a comprehensive tool that allows you to generate mock credentials for websites that you require to log in once/want a disposable credential.

Not just that, it also provides you with a disposable inbox, valid for the next hour, that helps you fetch OTPs and verification links. 

MockMailPass provides storage for your already generated credentials, which automatically pops up once you're on the webpage!

## Features at a glance

* Generates mock e-mail IDs
* Generates mock passwords - 12 characters strong, with a mix of uppercase, lowercase, numbers and special characters
* Generates disposable inboxes with automated queries for fetching verification e-mails
* Access to the disposable mailbox until 10 minutes from the moment of creation
* Storage for past generated credentials according to URL

### Some Snapshots of the extension, up and running


#### The autofill feature in action - automatically detects relevant fields and populates the data
![Screenshot 2024-08-31 at 1 59 04 PM](https://github.com/user-attachments/assets/574ffe47-c5cf-47b9-9836-82dcf26d5bb6)




#### The verification link has been successfully sent to the disposable e-mail ID
![Screenshot 2024-08-31 at 1 59 43 PM](https://github.com/user-attachments/assets/ea3645df-e5c8-46b2-a809-66856b96fac0)



#### Our disposable inbox has successfully detected the new verification e-mail
![Screenshot 2024-08-31 at 2 00 14 PM](https://github.com/user-attachments/assets/114e4f32-527f-4b58-8734-0ff331067ee7)



#### Voila! We're in!
![Screenshot 2024-08-31 at 1 57 02 PM](https://github.com/user-attachments/assets/0791e8a4-e0db-4897-955f-1ebcdcc660c4)


#### Hey, now you can even retrieve your past credentials that you had generated on this URL!
![Screenshot 2024-09-10 at 9 09 33 PM](https://github.com/user-attachments/assets/5362f271-0160-42ee-b42c-8662191ce6b8)



## TODO

* Website-aware data storage - the extension automatically detects your current website and lists all your past credentials pertaining to that particular URL ✅
* Subtle toast messages to inform the user about the execution/completion/failure of an action or an event ✅
* More foolproof ways to detect e-mail & password fields, since some websites have non-generic IDs for those fields   
* Ability to retrieve pre-existing inbox if you already have a credential


def validate(username, password):
    

    if len(password) < 8:
        return False

    elif password == username:
        return False
    
    elif not any(x.islower() for x in password):
        return False
    elif not any(x.isupper() for x in password):
        return False
    elif not any(x.isdigit() for x in password):
        return False
    else:
        return True
        
        


def signup(user_accounts, log_in, username, password):
    if username  in user_accounts.keys():
        
        print('user already in')
        return False
    else:

        if validate(username, password):
            user_accounts[username] = password
            log_in[username] = False
            return True
        else:
            return False


user_accounts = {}
log_in = {}

f = open('user.txt', 'r')
lines = f.readlines()
for line in lines:

    lst = line.strip().split("-")
    
    if len(lst) >= 2:
        print(lst)
        username = lst[0].strip()
        password = lst[1].strip()

        if username == "":

            continue
        elif password == "":
            continue
        else:
            signup(user_accounts, log_in, username, password)



print(user_accounts, log_in)
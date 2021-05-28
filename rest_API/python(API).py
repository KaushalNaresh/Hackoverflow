from flask import Flask
from tkinter import messagebox
import mysql.connector
import json
import math
import random
import smtplib
import os, sys
import time
import threading

from datetime import datetime

app = Flask(__name__)

email_otp = {}

@app.route('/generateOTP')
def generateOTP(data):

    """Generate the OTP
       input : {email: ""}
       output : bool 
    """

    email = data['email']

    digits="0123456789"
    OTP = ""
    for _ in range(6):
        OTP += digits[math.floor(random.random()*10)]

    global email_otp
    email_otp[email] = OTP
    
    global start
    start = time.time()

    ## Sending OTP on email

    msg= 'Dear User,\nOTP Verification code is {} Note..  Please enter otp within 2 minutes, otherwise it becomes invalid'.format(OTP)
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("naresh.kaushal.17003@iitgoa.ac.in", "kbvzrbrvxgdaypfg")
    s.sendmail('naresh.kaushal.17003@iitgoa.ac.in', email, msg)

    ## from here we will move to the window where we have to enter the otp
    return True

@app.route('/verifyOTP')
def verifyOTP(data):

    """Verify the OTP
       input : {email : "", otp : ""}
       output : bool
    """

    email = data['email']
    otp = data['otp']

    global email_otp

    end=time.time()          # timers ends when the user clicks verfiy
    t = format(end - start)

    if float(t) >= 120:      # Check it the user enters above 2 minutes. So i set as >=120
        del email_otp[email] # delete the email id since otp is expired
        return False

    else:
        otpStored = email_otp[email]

        del email_otp[email]

        if(otp == otpStored):
            return True
        else:
            return False


@app.route('/addComplaint')
def addComplaint(data):
    """
        Insert the record into form table
        input :{
                    'firstName': "",
                    'lastName' : "",
                    'email' : "",
                    'phone' : "",
                    'location' : "",
                    'pincode' : "",
                    'numberOfPotholes' : "",
                    'description' : ""
                }
        output : bool
    """

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabase')

    mycursor = mydb.cursor()

    firstName = data['first name']
    lastName = data['last name']
    email = data['email']
    phone = data['phone']
    location = data['location']  # location of potholes
    pincode = data['pincode']
    numOfPotholes = data['numOfPotholes']
    description = data['description']

    query = "select * from mydatabase.formtable where pincode = '%s'" %pincode
    mycursor.execute(query)

    complaint_no = len(mycursor.fetchall()) + 1
    complaintId = pincode + '/' + str(complaint_no)

    sql = "INSERT INTO mydatabase.formtable (firstName, lastName, email, phone, location, pincode, numOfPotholes, description, complaintId) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')"

    values = (firstName, lastName, email, phone, location, pincode, numOfPotholes, description, complaintId)

    mycursor.execute(sql, values)

    mydb.commit()
    # print(mycursor.rowcount, "record inserted.")

    mydb.close()

    return True


@app.route('/showReplies')
def addReply(data):

    """
        Function for admin to add the reply to a complaint
        input : {complaintId: "", reply: ""}
        output: bool
    """

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabase')

    mycursor = mydb.cursor()

    reply = data['reply']
    complaintId = data['complaintId']

    replyDate = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    new_sql = "INSERT INTO mydatabase.replies (reply, complaintId, replyDate) VALUES ( '%s', '%s', '%s')" % (reply, complaintId, replyDate)

    mycursor.execute(new_sql)

    mydb.commit()

    mydb.close()

    return True


@app.route('/displayComplaintsToUser')
def displayComplaintsToUser(data): 

    """ Displays replies to a particular user
        input: {email: ""}
        output: {complaintId:
                    {
                        'firstName': "",
                        'lastName' : "",
                        'email' : "",
                        'phone' : "",
                        'location' : "",
                        'pincode' : "",
                        'numberOfPotholes' : "",
                        'description' : ""
                        'reply' : [
                            {
                                "date": date
                                "reply": reply
                            }
                            {
                                "date": date
                                "reply": reply
                            }
                        ]
                    },
                complaintId:
                    {
                        ...
                    }
                }
    """

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabase')

    mycursor = mydb.cursor()

    email = data['email']

    sql = "SELECT * FROM mydatabase.formtable WHERE emailId = '%s'" %(email)

    mycursor.execute(sql)

    ans = mycursor.fetchall()

    finalAns = {}
    for entry in ans:

        cid = entry[-1]
        finalAns[cid] = {}

        finalAns[cid]['email'] = entry[2]
        finalAns[cid]['firstName'] = entry[0]
        finalAns[cid]['lastName'] = entry[1]
        finalAns[cid]['phone'] = entry[3]
        finalAns[cid]['location'] = entry[4]
        finalAns[cid]['pincode'] = entry[5]
        finalAns[cid]['numberOfPotholes'] = entry[6]
        finalAns[cid]['description'] = entry[7]

        sql_1 = "SELECT * FROM replies WHERE complaintId = '%s'" % (cid)

        mycursor.execute(sql_1)

        ans_2 = mycursor.fetchall()

        replyList = []

        for row in ans_2:
            replyList.append({"date": row[-1], "reply": row[1]})

        finalAns[cid]['reply'] = replyList

    mydb.close()

    return finalAns


@app.route('/authAdmin')
def authAdmin(data):

    """To authenticate admin credentials
       input: {id: "", password: ""}
       output: bool
    """

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabase')

    mycursor = mydb.cursor()

    id_1 = data['id']
    password = data['password']

    sql = "SELECT password FROM admintable WHERE id = '%s'" %(id_1)

    mycursor.execute(sql)

    ans = mycursor.fetchall()

    mydb.close()

    if(len(ans) == 0):
        return False

    else:
        if(ans[0][0] == password):
            return True
        else:
            return False


@app.route('/registerAdmin')
def registerAdmin(data):
    # not being used
    """ To register the admin
        input: {id: "", password: ""}
        output: bool 
    """

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabase')

    mycursor = mydb.cursor()

    id_1 = data['id']
    password = data['password']

    sql = "INSERT INTO admintable VALUES ('%s', '%s')" %(id_1, password)

    mycursor.execute(sql)

    mydb.commit()

    mydb.close()

    return True


@app.route('/displayComplaintsToAdmin')
def displayComplaintsToAdmin(data = None):

    """ Display all complaints for the admin
        input: None
        output: {complaintId:
                        {
                            'firstName': "",
                            'lastName' : "",
                            'email' : "",
                            'phone' : "",
                            'location' : "",
                            'pincode' : "",
                            'numberOfPotholes' : "",
                            'description' : ""
                            'reply' : [
                                {
                                    "date": date
                                    "reply": reply1
                                }
                                {
                                    "date": date
                                    "reply": reply2
                                }
                            ]
                        }
                }
    """

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabase')

    mycursor = mydb.cursor()

    sql = "SELECT * from formtable"

    mycursor.execute(sql)

    ans = mycursor.fetchall()

    finalAns = {}

    for entry in ans:

        cid = entry[-1]
        finalAns[cid] = {}

        finalAns[cid]['email'] = entry[2]
        finalAns[cid]['firstName'] = entry[0]
        finalAns[cid]['lastName'] = entry[1]
        finalAns[cid]['phone'] = entry[3]
        finalAns[cid]['location'] = entry[4]
        finalAns[cid]['pincode'] = entry[5]
        finalAns[cid]['numberOfPotholes'] = entry[6]
        finalAns[cid]['description'] = entry[7]

        sql_1 = "SELECT * FROM replies WHERE complaintId = '%s'" % (cid)

        mycursor.execute(sql_1)

        ans_2 = mycursor.fetchall()

        replyList = []

        for row in ans_2:
            replyList.append({"date": row[-1], "reply": row[1]})

        finalAns[cid]['reply'] = replyList

    mydb.close()

    return finalAns


    






